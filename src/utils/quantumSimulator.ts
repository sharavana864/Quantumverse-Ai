import {
  PlacedGate,
  CircuitSimulationResult,
  StateVectorAmplitude,
  BlochCoordinate,
} from "../types";

export interface Complex {
  re: number;
  im: number;
}

export function complexAdd(a: Complex, b: Complex): Complex {
  return { re: a.re + b.re, im: a.im + b.im };
}

export function complexMul(a: Complex, b: Complex): Complex {
  return {
    re: a.re * b.re - a.im * b.im,
    im: a.re * b.im + a.im * b.re,
  };
}

export function complexMagnitudeSq(a: Complex): number {
  return a.re * a.re + a.im * a.im;
}

const INV_SQRT2 = 1 / Math.sqrt(2);

/**
 * Simulates a circuit with up to 3 qubits (8 state amplitudes: |000⟩ to |111⟩).
 */
export function simulateCircuit(
  gates: PlacedGate[],
  numQubits: number = 3
): CircuitSimulationResult {
  const numStates = 1 << numQubits; // 2^N
  let state: Complex[] = Array.from({ length: numStates }, (_, i) => ({
    re: i === 0 ? 1 : 0,
    im: 0,
  }));

  // Sort gates by column (time step 0, 1, 2...)
  const sortedGates = [...gates].sort((a, b) => a.column - b.column);

  for (const gate of sortedGates) {
    const q = gate.qubit;
    const nextState: Complex[] = Array.from({ length: numStates }, () => ({
      re: 0,
      im: 0,
    }));

    for (let i = 0; i < numStates; i++) {
      const bitVal = (i >> (numQubits - 1 - q)) & 1;

      switch (gate.type) {
        case "H": {
          // H|0> = (|0>+|1>)/√2, H|1> = (|0>-|1>)/√2
          const pairedIdx = i ^ (1 << (numQubits - 1 - q));
          if (bitVal === 0) {
            nextState[i] = complexAdd(
              nextState[i],
              complexMul(state[i], { re: INV_SQRT2, im: 0 })
            );
            nextState[pairedIdx] = complexAdd(
              nextState[pairedIdx],
              complexMul(state[i], { re: INV_SQRT2, im: 0 })
            );
          } else {
            nextState[pairedIdx] = complexAdd(
              nextState[pairedIdx],
              complexMul(state[i], { re: INV_SQRT2, im: 0 })
            );
            nextState[i] = complexAdd(
              nextState[i],
              complexMul(state[i], { re: -INV_SQRT2, im: 0 })
            );
          }
          break;
        }

        case "X": {
          // Bit flip
          const flipped = i ^ (1 << (numQubits - 1 - q));
          nextState[flipped] = complexAdd(nextState[flipped], state[i]);
          break;
        }

        case "Y": {
          // Y|0> = i|1>, Y|1> = -i|0>
          const flipped = i ^ (1 << (numQubits - 1 - q));
          if (bitVal === 0) {
            nextState[flipped] = complexAdd(
              nextState[flipped],
              complexMul(state[i], { re: 0, im: 1 })
            );
          } else {
            nextState[flipped] = complexAdd(
              nextState[flipped],
              complexMul(state[i], { re: 0, im: -1 })
            );
          }
          break;
        }

        case "Z": {
          // Phase flip: Z|0> = |0>, Z|1> = -|1>
          if (bitVal === 0) {
            nextState[i] = complexAdd(nextState[i], state[i]);
          } else {
            nextState[i] = complexAdd(
              nextState[i],
              complexMul(state[i], { re: -1, im: 0 })
            );
          }
          break;
        }

        case "S": {
          // Phase gate: S|1> = i|1>
          if (bitVal === 0) {
            nextState[i] = complexAdd(nextState[i], state[i]);
          } else {
            nextState[i] = complexAdd(
              nextState[i],
              complexMul(state[i], { re: 0, im: 1 })
            );
          }
          break;
        }

        case "T": {
          // T gate: e^(i*pi/4) = cos(pi/4) + i*sin(pi/4)
          if (bitVal === 0) {
            nextState[i] = complexAdd(nextState[i], state[i]);
          } else {
            nextState[i] = complexAdd(
              nextState[i],
              complexMul(state[i], { re: INV_SQRT2, im: INV_SQRT2 })
            );
          }
          break;
        }

        case "CNOT": {
          const ctrl = gate.controlQubit ?? (q === 0 ? 1 : 0);
          const ctrlBit = (i >> (numQubits - 1 - ctrl)) & 1;
          if (ctrlBit === 1) {
            // Flip target qubit
            const flipped = i ^ (1 << (numQubits - 1 - q));
            nextState[flipped] = complexAdd(nextState[flipped], state[i]);
          } else {
            nextState[i] = complexAdd(nextState[i], state[i]);
          }
          break;
        }

        case "SWAP": {
          const targetQ = gate.controlQubit ?? (q === 0 ? 1 : 0);
          const bitQ = (i >> (numQubits - 1 - q)) & 1;
          const bitTarget = (i >> (numQubits - 1 - targetQ)) & 1;
          if (bitQ !== bitTarget) {
            let swapped = i;
            swapped ^= 1 << (numQubits - 1 - q);
            swapped ^= 1 << (numQubits - 1 - targetQ);
            nextState[swapped] = complexAdd(nextState[swapped], state[i]);
          } else {
            nextState[i] = complexAdd(nextState[i], state[i]);
          }
          break;
        }

        case "MEASURE":
        default: {
          nextState[i] = complexAdd(nextState[i], state[i]);
          break;
        }
      }
    }

    state = nextState;
  }

  // Calculate amplitudes & probabilities
  const stateVector: StateVectorAmplitude[] = [];
  const probabilities: { [binaryState: string]: number } = {};

  for (let i = 0; i < numStates; i++) {
    const binaryStr = i.toString(2).padStart(numQubits, "0");
    const label = `|${binaryStr}⟩`;
    const magSq = complexMagnitudeSq(state[i]);
    const probPct = Math.round(magSq * 1000) / 10;
    const mag = Math.sqrt(magSq);
    const phaseDeg =
      mag > 0.001
        ? Math.round((Math.atan2(state[i].im, state[i].re) * 180) / Math.PI)
        : 0;

    const normalizedPhase = phaseDeg < 0 ? phaseDeg + 360 : phaseDeg;

    stateVector.push({
      label,
      real: Math.round(state[i].re * 1000) / 1000,
      imag: Math.round(state[i].im * 1000) / 1000,
      magnitude: Math.round(mag * 1000) / 1000,
      probability: probPct,
      phaseDeg: normalizedPhase,
    });

    probabilities[binaryStr] = Math.round(magSq * 1024); // Shots out of 1024
  }

  // Calculate Bloch Sphere coordinates for each qubit
  const blochCoordinates: BlochCoordinate[] = [];

  for (let q = 0; q < numQubits; q++) {
    // Reduced density matrix elements for qubit q: rho_00, rho_11, rho_01
    let rho00 = 0;
    let rho11 = 0;
    let rho01: Complex = { re: 0, im: 0 };

    for (let i = 0; i < numStates; i++) {
      const bitVal = (i >> (numQubits - 1 - q)) & 1;
      const magSq = complexMagnitudeSq(state[i]);
      if (bitVal === 0) {
        rho00 += magSq;
        // find index with bit flipped to 1
        const flipIdx = i | (1 << (numQubits - 1 - q));
        const c1 = state[i];
        const c2 = state[flipIdx];
        // c1 * conj(c2)
        const prod = complexMul(c1, { re: c2.re, im: -c2.im });
        rho01 = complexAdd(rho01, prod);
      } else {
        rho11 += magSq;
      }
    }

    // Bloch vector components:
    // x = 2 * Re(rho01)
    // y = -2 * Im(rho01)
    // z = rho00 - rho11
    const x = Math.round(2 * rho01.re * 1000) / 1000;
    const y = Math.round(-2 * rho01.im * 1000) / 1000;
    const z = Math.round((rho00 - rho11) * 1000) / 1000;

    const theta = Math.acos(Math.max(-1, Math.min(1, z)));
    const phi = Math.atan2(y, x);

    blochCoordinates.push({
      qubit: q,
      theta,
      phi: phi < 0 ? phi + 2 * Math.PI : phi,
      x,
      y,
      z,
    });
  }

  // Generate Qiskit Code String
  let qiskitCode = `from qiskit import QuantumCircuit, transpile\nfrom qiskit_aer import AerSimulator\n\n# Initialize ${numQubits}-qubit circuit\nqc = QuantumCircuit(${numQubits}, ${numQubits})\n`;

  sortedGates.forEach((g) => {
    switch (g.type) {
      case "H":
        qiskitCode += `qc.h(${g.qubit})\n`;
        break;
      case "X":
        qiskitCode += `qc.x(${g.qubit})\n`;
        break;
      case "Y":
        qiskitCode += `qc.y(${g.qubit})\n`;
        break;
      case "Z":
        qiskitCode += `qc.z(${g.qubit})\n`;
        break;
      case "S":
        qiskitCode += `qc.s(${g.qubit})\n`;
        break;
      case "T":
        qiskitCode += `qc.t(${g.qubit})\n`;
        break;
      case "CNOT":
        qiskitCode += `qc.cx(${g.controlQubit ?? 0}, ${g.qubit})\n`;
        break;
      case "SWAP":
        qiskitCode += `qc.swap(${g.qubit}, ${g.controlQubit ?? 1})\n`;
        break;
      case "MEASURE":
        qiskitCode += `qc.measure(${g.qubit}, ${g.qubit})\n`;
        break;
    }
  });

  qiskitCode += `\n# Run on Aer Simulator\nsimulator = AerSimulator()\njob = simulator.run(transpile(qc, simulator), shots=1024)\nresult = job.result()\nprint("Counts:", result.get_counts())\n`;

  // Generate Cirq Code String
  let cirqCode = `import cirq\n\n# Define ${numQubits} qubits\nqubits = [cirq.LineQubit(i) for i in range(${numQubits})]\ncircuit = cirq.Circuit()\n`;

  sortedGates.forEach((g) => {
    switch (g.type) {
      case "H":
        cirqCode += `circuit.append(cirq.H(qubits[${g.qubit}]))\n`;
        break;
      case "X":
        cirqCode += `circuit.append(cirq.X(qubits[${g.qubit}]))\n`;
        break;
      case "Y":
        cirqCode += `circuit.append(cirq.Y(qubits[${g.qubit}]))\n`;
        break;
      case "Z":
        cirqCode += `circuit.append(cirq.Z(qubits[${g.qubit}]))\n`;
        break;
      case "S":
        cirqCode += `circuit.append(cirq.S(qubits[${g.qubit}]))\n`;
        break;
      case "T":
        cirqCode += `circuit.append(cirq.T(qubits[${g.qubit}]))\n`;
        break;
      case "CNOT":
        cirqCode += `circuit.append(cirq.CNOT(qubits[${g.controlQubit ?? 0}], qubits[${g.qubit}]))\n`;
        break;
      case "SWAP":
        cirqCode += `circuit.append(cirq.SWAP(qubits[${g.qubit}], qubits[${g.controlQubit ?? 1}]))\n`;
        break;
      case "MEASURE":
        cirqCode += `circuit.append(cirq.measure(qubits[${g.qubit}], key='m${g.qubit}'))\n`;
        break;
    }
  });

  cirqCode += `\n# Simulate circuit\nsimulator = cirq.Simulator()\nresult = simulator.run(circuit, repetitions=1024)\nprint(result)\n`;

  return {
    stateVector,
    blochCoordinates,
    probabilities,
    qiskitCode,
    cirqCode,
  };
}
