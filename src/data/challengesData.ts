import { CodingChallenge } from "../types";

export const CODING_CHALLENGES: CodingChallenge[] = [
  {
    id: "ch-1",
    title: "1. Create a Bell State Pair",
    difficulty: "Beginner",
    points: 100,
    category: "Bell State",
    description:
      "Write a Qiskit circuit that prepares the maximally entangled Bell state |Φ+⟩ = (|00⟩ + |11⟩)/√2 on a 2-qubit register and measures both qubits.",
    qiskitTemplate: `from qiskit import QuantumCircuit, transpile
from qiskit_aer import AerSimulator

# Step 1: Initialize 2-qubit circuit with 2 classical bits
qc = QuantumCircuit(2, 2)

# TODO: Apply Hadamard gate to qubit 0
# qc.h(0)

# TODO: Apply CNOT gate with control=0 and target=1
# qc.cx(0, 1)

# TODO: Measure qubits [0, 1] into classical bits [0, 1]
qc.measure([0, 1], [0, 1])

simulator = AerSimulator()
job = simulator.run(transpile(qc, simulator), shots=1024)
counts = job.result().get_counts()
print("Results:", counts)
`,
    cirqTemplate: `import cirq

# Define 2 qubits
q0, q1 = cirq.LineQubit.range(2)
circuit = cirq.Circuit()

# TODO: Append Hadamard on q0
# circuit.append(cirq.H(q0))

# TODO: Append CNOT with control q0 and target q1
# circuit.append(cirq.CNOT(q0, q1))

# TODO: Measure both qubits
circuit.append(cirq.measure(q0, q1, key='result'))

simulator = cirq.Simulator()
result = simulator.run(circuit, repetitions=1024)
print(result)
`,
    expectedCounts: { "00": 512, "11": 512 },
    hints: [
      "Use `qc.h(0)` to put Qubit 0 into equal superposition.",
      "Use `qc.cx(0, 1)` to entangle Qubit 1 with Qubit 0.",
      "Running 1024 shots should yield roughly ~50% '00' and ~50% '11'."
    ],
    solved: false
  },
  {
    id: "ch-2",
    title: "2. Quantum Phase Flip (Z Gate)",
    difficulty: "Beginner",
    points: 120,
    category: "Gates",
    description:
      "Construct a circuit that takes |0⟩, applies Hadamard to create |+⟩, applies Pauli-Z to create |-⟩, and then applies Hadamard again. Verify that the final measured state is |1⟩.",
    qiskitTemplate: `from qiskit import QuantumCircuit, transpile
from qiskit_aer import AerSimulator

qc = QuantumCircuit(1, 1)

# 1. Hadamard on q0 -> state |+>
qc.h(0)

# TODO 2: Apply Pauli Z gate to q0 -> state |->
# qc.z(0)

# TODO 3: Apply Hadamard on q0 again
# qc.h(0)

qc.measure(0, 0)

simulator = AerSimulator()
counts = simulator.run(transpile(qc, simulator), shots=1024).result().get_counts()
print("Counts:", counts)
`,
    cirqTemplate: `import cirq

q0 = cirq.LineQubit(0)
circuit = cirq.Circuit(
    cirq.H(q0),
    cirq.Z(q0),
    cirq.H(q0),
    cirq.measure(q0, key='m')
)
simulator = cirq.Simulator()
print(simulator.run(circuit, repetitions=1024))
`,
    expectedCounts: { "1": 1024 },
    hints: [
      "H|0⟩ = |+⟩, Z|+⟩ = |-⟩, and H|-⟩ = |1⟩.",
      "The result should be 100% '1' output!"
    ],
    solved: false
  },
  {
    id: "ch-3",
    title: "3. Deutsch-Jozsa Oracle Test",
    difficulty: "Intermediate",
    points: 250,
    category: "Algorithms",
    description:
      "Implement a 2-qubit Deutsch-Jozsa algorithm for a balanced oracle f(x) = x. Verify that measurement of the input qubit yields |1⟩ with 100% probability.",
    qiskitTemplate: `from qiskit import QuantumCircuit, transpile
from qiskit_aer import AerSimulator

# 2 qubits: q0 (input), q1 (ancilla)
qc = QuantumCircuit(2, 1)

# Initialize ancilla q1 into |1> then apply H to both
qc.x(1)
qc.h(0)
qc.h(1)

# Balanced Oracle: f(x) = x -> CNOT(control=0, target=1)
qc.cx(0, 1)

# Apply Hadamard to input qubit 0
qc.h(0)

# Measure input qubit 0
qc.measure(0, 0)

simulator = AerSimulator()
counts = simulator.run(transpile(qc, simulator), shots=1024).result().get_counts()
print("DJ Result:", counts)
`,
    cirqTemplate: `import cirq

q0, q1 = cirq.LineQubit.range(2)
circuit = cirq.Circuit(
    cirq.X(q1),
    cirq.H(q0),
    cirq.H(q1),
    cirq.CNOT(q0, q1),
    cirq.H(q0),
    cirq.measure(q0, key='result')
)
simulator = cirq.Simulator()
print(simulator.run(circuit, repetitions=1024))
`,
    expectedCounts: { "1": 1024 },
    hints: [
      "An input result of '1' proves the oracle function is balanced!",
      "If the oracle were constant, measuring q0 would yield '0'."
    ],
    solved: false
  },
  {
    id: "ch-4",
    title: "4. Grover's 2-Qubit Search for |11⟩",
    difficulty: "Advanced",
    points: 400,
    category: "Algorithms",
    description:
      "Construct Grover's algorithm on 2 qubits to search for marked item |11⟩ using a CZ oracle and a 2-qubit diffuser. Verify that measurement yields '11' with 100% probability.",
    qiskitTemplate: `from qiskit import QuantumCircuit, transpile
from qiskit_aer import AerSimulator

qc = QuantumCircuit(2, 2)

# Step 1: Uniform Superposition
qc.h([0, 1])

# Step 2: Oracle for state |11> (Controlled-Z)
qc.cz(0, 1)

# Step 3: Grover Diffuser Operator (H -> X -> CZ -> X -> H)
qc.h([0, 1])
qc.x([0, 1])
qc.cz(0, 1)
qc.x([0, 1])
qc.h([0, 1])

qc.measure([0, 1], [0, 1])

simulator = AerSimulator()
counts = simulator.run(transpile(qc, simulator), shots=1024).result().get_counts()
print("Grover Result:", counts)
`,
    cirqTemplate: `import cirq

q0, q1 = cirq.LineQubit.range(2)
circuit = cirq.Circuit(
    cirq.H.on_each(q0, q1),
    cirq.CZ(q0, q1), # Oracle
    cirq.H.on_each(q0, q1),
    cirq.X.on_each(q0, q1),
    cirq.CZ(q0, q1),
    cirq.X.on_each(q0, q1),
    cirq.H.on_each(q0, q1),
    cirq.measure(q0, q1, key='m')
)
simulator = cirq.Simulator()
print(simulator.run(circuit, repetitions=1024))
`,
    expectedCounts: { "11": 1024 },
    hints: [
      "On 2 qubits, exactly 1 Grover iteration amplifies state |11⟩ to 100% probability!",
      "Notice the CZ gate flips the phase of |11⟩."
    ],
    solved: false
  }
];
