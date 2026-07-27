import { Module } from "../types";

export const MODULES_DATA: Module[] = [
  {
    id: "bits",
    title: "1. Classical Bits vs. Quantum",
    subtitle: "Understanding Information Fundamentals",
    icon: "Binary",
    difficulty: "Beginner",
    description:
      "Explore the core transition from classical binary transistors (0 or 1) to quantum two-level systems.",
    lessons: [
      {
        id: "bits-1",
        title: "Transistors & Classical Logic Gates",
        duration: "8 mins",
        videoUrl: "https://www.youtube.com/embed/gI-qXk7XojA",
        summary:
          "Classical computing encodes data using electrical voltage levels representing binary 0s and 1s. Logic gates (AND, OR, NOT, NAND) process these bits deterministically.",
        keyConcepts: [
          "Binary digits (0 or 1)",
          "Deterministic state transitions",
          "NAND completeness",
          "Limits of classical miniaturization",
        ],
        flashcards: [
          {
            id: "fc-1",
            front: "What is a classical bit?",
            back: "The basic unit of classical information, which can exist in strictly one of two states: 0 or 1.",
          },
          {
            id: "fc-2",
            front: "Why do classical computers face physical limits?",
            back: "As silicon transistors shrink down to nanoscale dimensions, quantum tunneling allows electrons to leak across barriers, breaking classical logic.",
          },
        ],
        quizQuestions: [
          {
            id: "q-bits-1",
            question: "Unlike classical bits, what allows qubits to process vast parallel state spaces?",
            options: [
              "Faster clock speeds in gigahertz",
              "Superposition and quantum interference",
              "Infinite disk storage capacity",
              "Higher voltage levels"
            ],
            correctIndex: 1,
            explanation: "Superposition allows qubits to exist in a linear combination of |0⟩ and |1⟩ simultaneously, while interference shapes the probability distribution towards the correct answer.",
            recommendedTopic: "Qubits & Superposition"
          }
        ],
      },
      {
        id: "bits-2",
        title: "Dirac Notation & Quantum State Vectors",
        duration: "12 mins",
        summary:
          "Dirac bra-ket notation represents quantum states as column vectors in a complex Hilbert space. The state |ψ⟩ = α|0⟩ + β|1⟩ specifies state amplitudes.",
        keyConcepts: [
          "Ket vector |ψ⟩ and Bra vector ⟨ψ|",
          "Basis vectors |0⟩ = [1, 0]^T and |1⟩ = [0, 1]^T",
          "Complex probability amplitudes α and β",
          "Normalization condition |α|^2 + |β|^2 = 1",
        ],
        flashcards: [
          {
            id: "fc-3",
            front: "What does |α|^2 represent in |ψ⟩ = α|0⟩ + β|1⟩?",
            back: "The probability of measuring the qubit in state |0⟩ upon wavefunction collapse.",
          },
        ],
        quizQuestions: [
          {
            id: "q-bits-2",
            question: "If a qubit has state vector |ψ⟩ = (1/√2)|0⟩ + (i/√2)|1⟩, what is the probability of measuring |1⟩?",
            options: ["25%", "50%", "75%", "100%"],
            correctIndex: 1,
            explanation: "The probability is |β|^2 = |i/√2|^2 = (1/√2)^2 = 1/2 or 50%.",
            recommendedTopic: "Dirac Notation"
          }
        ]
      },
    ],
  },
  {
    id: "qubits",
    title: "2. The Quantum Bit (Qubit)",
    subtitle: "Physical Realizations & The Bloch Sphere",
    icon: "Atom",
    difficulty: "Beginner",
    description:
      "Deep dive into hardware qubits (superconducting transmons, trapped ions, photonics) and 3D Bloch sphere vector geometry.",
    lessons: [
      {
        id: "qubits-1",
        title: "The Bloch Sphere Visual Geometry",
        duration: "15 mins",
        summary:
          "The Bloch sphere maps any pure qubit state to a point on a unit 3D sphere using polar angle θ (theta) and azimuthal angle φ (phi).",
        keyConcepts: [
          "North pole = |0⟩, South pole = |1⟩",
          "Equator states: (|0⟩ ± |1⟩)/√2 and (|0⟩ ± i|1⟩)/√2",
          "State vector: |ψ⟩ = cos(θ/2)|0⟩ + e^(iφ)sin(θ/2)|1⟩",
          "Unit sphere radius |r| = 1",
        ],
        flashcards: [
          {
            id: "fc-4",
            front: "Where is the state (|0⟩ + |1⟩)/√2 located on the Bloch sphere?",
            back: "On the equator along the positive X-axis (θ = π/2, φ = 0).",
          },
        ],
        quizQuestions: [
          {
            id: "q-qub-1",
            question: "What parameter controls the quantum phase relative to state |1⟩ on the Bloch sphere?",
            options: ["The polar angle θ", "The azimuthal angle φ", "The radius r", "The qubit frequency in GHz"],
            correctIndex: 1,
            explanation: "The azimuthal angle φ (phi) represents the relative phase e^(iφ) between the superposition states.",
            recommendedTopic: "Bloch Sphere Geometry"
          }
        ]
      },
      {
        id: "qubits-2",
        title: "Physical Qubit Architectures",
        duration: "14 mins",
        summary:
          "Compare leading quantum hardware technologies: Superconducting transmon circuits (IBM, Google), Trapped Ions (IonQ), and Silicon Spin Qubits.",
        keyConcepts: [
          "Superconducting transmon Josephson junctions",
          "Trapped ion laser manipulations",
          "Coherence times T1 (energy relaxation) & T2 (dephasing)",
          "Cryogenic diluting refrigerators (15 milliKelvin)",
        ],
        flashcards: [
          {
            id: "fc-5",
            front: "What is T1 coherence time?",
            back: "The relaxation time for an excited qubit state |1⟩ to decay back into ground state |0⟩.",
          },
        ],
        quizQuestions: [
          {
            id: "q-qub-2",
            question: "Why are superconducting qubits cooled to near absolute zero (15 mK)?",
            options: [
              "To prevent superconducting metals from melting",
              "To suppress thermal noise fluctuations that destroy quantum coherence",
              "To increase electrical resistance",
              "To slow down light propagation speed"
            ],
            correctIndex: 1,
            explanation: "Thermal energy (kT) at room temperature vastly exceeds the microwave energy transitions of qubits, causing rapid decoherence unless ultra-cooled.",
            recommendedTopic: "Quantum Hardware"
          }
        ]
      }
    ],
  },
  {
    id: "superposition",
    title: "3. Quantum Superposition",
    subtitle: "Simultaneous States & Wavefunction Collapse",
    icon: "Sparkles",
    difficulty: "Beginner",
    description:
      "Master the principle of superposition, linear combinations, measurement postulate, and Born's rule.",
    lessons: [
      {
        id: "sup-1",
        title: "Creating Superposition with the Hadamard Gate",
        duration: "10 mins",
        summary:
          "The Hadamard (H) gate transforms standard computational basis states into equal superposition states, enabling quantum parallelism.",
        keyConcepts: [
          "H|0⟩ = |+⟩ = (|0⟩ + |1⟩)/√2",
          "H|1⟩ = |-⟩ = (|0⟩ - |1⟩)/√2",
          "Self-inverse matrix property: H * H = I",
          "Constructive and destructive interference",
        ],
        flashcards: [
          {
            id: "fc-sup-1",
            front: "What happens when you apply two consecutive H gates to |0⟩?",
            back: "H(H|0⟩) = I|0⟩ = |0⟩. The second H gate cleanly reverts the superposition back to the original state via quantum interference.",
          },
        ],
        quizQuestions: [
          {
            id: "q-sup-1",
            question: "What is the probability of measuring state |0⟩ for state |-⟩ = (|0⟩ - |1⟩)/√2?",
            options: ["0%", "50%", "100%", "-50%"],
            correctIndex: 1,
            explanation: "The magnitude squared of the amplitude |1/√2|^2 = 1/2 or 50%. The negative sign affects phase interference, not probability magnitude.",
            recommendedTopic: "Hadamard & Born Rule"
          }
        ]
      },
    ],
  },
  {
    id: "entanglement",
    title: "4. Quantum Entanglement",
    subtitle: "EPR Paradox, Bell States & Teleportation",
    icon: "Network",
    difficulty: "Intermediate",
    description:
      "Explore non-local quantum correlations, Bell states, quantum teleportation, and superdense coding.",
    lessons: [
      {
        id: "ent-1",
        title: "Generating Bell States (|Φ+⟩, |Φ-⟩, |Ψ+⟩, |Ψ-⟩)",
        duration: "18 mins",
        summary:
          "Combining a Hadamard gate on Qubit 0 with a CNOT gate controlled by Qubit 0 on Qubit 1 creates maximally entangled Bell states.",
        keyConcepts: [
          "|Φ+⟩ = (|00⟩ + |11⟩)/√2",
          "Maximal entanglement",
          "No-cloning theorem",
          "Einstein-Podolsky-Rosen (EPR) paradox",
        ],
        flashcards: [
          {
            id: "fc-ent-1",
            front: "Can quantum entanglement be used to transmit faster-than-light messages?",
            back: "No. Classical information (via classical communication channels) is always required to decode measurement outcomes (consistent with Special Relativity).",
          },
        ],
        quizQuestions: [
          {
            id: "q-ent-1",
            question: "Which sequence of gates creates the Bell state (|00⟩ + |11⟩)/√2 from initial state |00⟩?",
            options: [
              "Hadamard on q0, then CNOT(control=q0, target=q1)",
              "X gate on q0, then X gate on q1",
              "CNOT(control=q0, target=q1), then Hadamard on q0",
              "Z gate on q0, then Z gate on q1"
            ],
            correctIndex: 0,
            explanation: "Hadamard turns |00⟩ into (|0⟩+|1⟩)|0⟩/√2 = (|00⟩+|10⟩)/√2. The CNOT flips q1 when q0 is 1, yielding (|00⟩+|11⟩)/√2.",
            recommendedTopic: "Bell State Generation"
          }
        ]
      },
      {
        id: "ent-2",
        title: "The Quantum Teleportation Protocol",
        duration: "20 mins",
        summary:
          "Transfer an unknown quantum state |ψ⟩ from Alice to Bob using an entangled Bell pair and 2 classical bits without physically transporting the particle.",
        keyConcepts: [
          "3-qubit circuit protocol",
          "Bell measurement by Alice",
          "Classical feed-forward correction (Pauli X / Z gates at Bob's end)",
          "Destruction of Alice's original state (respecting No-Cloning)",
        ],
        flashcards: [
          {
            id: "fc-tele-1",
            front: "How many classical bits must Alice send to Bob in Quantum Teleportation?",
            back: "2 classical bits, indicating her Bell measurement result (00, 01, 10, or 11).",
          },
        ],
        quizQuestions: [
          {
            id: "q-tele-1",
            question: "In quantum teleportation, what corrections does Bob apply if Alice's classical measurement bits are '11'?",
            options: [
              "No gates required",
              "Only Pauli-X gate",
              "Both Pauli-X and Pauli-Z gates",
              "Only Hadamard gate"
            ],
            correctIndex: 2,
            explanation: "Bit 1 requires a Pauli-Z flip and Bit 2 requires a Pauli-X bit flip to align Bob's qubit with Alice's original state |ψ⟩.",
            recommendedTopic: "Quantum Teleportation"
          }
        ]
      }
    ],
  },
  {
    id: "gates",
    title: "5. Quantum Gates & Operations",
    subtitle: "Unitary Matrices & Single/Multi-Qubit Operators",
    icon: "Cpu",
    difficulty: "Intermediate",
    description:
      "Master unitary transformations (Pauli X, Y, Z, S, T, CNOT, SWAP, Toffoli) and reversible computing matrix algebra.",
    lessons: [
      {
        id: "gates-1",
        title: "Single-Qubit Unitary Rotations",
        duration: "15 mins",
        summary:
          "All quantum operations correspond to unitary matrices U (U† U = I), preserving vector length and probability sum = 1.",
        keyConcepts: [
          "Pauli X (Bit flip), Pauli Y (Bit & Phase flip), Pauli Z (Phase flip)",
          "Phase S (π/2 phase) & T (π/4 phase) gates",
          "Arbitrary rotation operators Rx(θ), Ry(θ), Rz(θ)",
        ],
        flashcards: [
          {
            id: "fc-gate-1",
            front: "Why must quantum logic gates be represented by unitary matrices?",
            back: "Unitary matrices preserve state normalization (sum of probabilities = 1) and guarantee that quantum operations are reversible.",
          },
        ],
        quizQuestions: [
          {
            id: "q-gate-1",
            question: "Which gate is equivalent to the square root of the Pauli-Z gate (S^2 = Z)?",
            options: ["S Gate", "T Gate", "Hadamard Gate", "Pauli-X Gate"],
            correctIndex: 0,
            explanation: "The S gate applies a π/2 phase shift. Applying S twice gives a π shift, which is the Pauli-Z gate.",
            recommendedTopic: "Phase & Unitary Gates"
          }
        ]
      }
    ],
  },
  {
    id: "circuits",
    title: "6. Quantum Circuit Architecture",
    subtitle: "Composing Multiqubit Registers & Transpilation",
    icon: "Workflow",
    difficulty: "Intermediate",
    description:
      "Design multi-qubit circuits, schedule gate depth, optimize fidelity, and perform transpilation for target hardware topologies.",
    lessons: [
      {
        id: "circ-1",
        title: "Circuit Depth & Gate Scheduling",
        duration: "16 mins",
        summary:
          "Circuit depth determines execution latency on hardware. Minimizing multi-qubit gate count reduces decoherence errors.",
        keyConcepts: [
          "Circuit depth vs total gate count",
          "SWAP gate overhead on heavy-hex hardware graphs",
          "Error rates of 2-qubit gates vs 1-qubit gates",
        ],
        flashcards: [
          {
            id: "fc-circ-1",
            front: "What is circuit transpilation?",
            back: "The process of rewriting a high-level quantum circuit into native hardware gate sets matching the device's qubit coupling topology.",
          },
        ],
        quizQuestions: [
          {
            id: "q-circ-1",
            question: "Why do quantum algorithm designers strive to minimize 2-qubit CNOT gate counts?",
            options: [
              "2-qubit gates are typically 10x-100x noisier than 1-qubit gates on real hardware",
              "CNOT gates consume more electricity",
              "CNOT gates destroy quantum superposition",
              "Qiskit does not support CNOT gates"
            ],
            correctIndex: 0,
            explanation: "Two-qubit gate operations involve complex microwave or laser interactions, making them the primary source of error on NISQ hardware.",
            recommendedTopic: "Hardware Topology & Transpilation"
          }
        ]
      }
    ],
  },
  {
    id: "algorithms",
    title: "7. Quantum Algorithms & Advantage",
    subtitle: "Deutsch-Jozsa, Grover's Search & Shor's Factorization",
    icon: "Zap",
    difficulty: "Advanced",
    description:
      "Study quantum speedup benchmarks: Deutsch-Jozsa (exponential speedup), Grover's Search (O(√N)), and Shor's Algorithm (RSA encryption factoring).",
    lessons: [
      {
        id: "algo-1",
        title: "Deutsch-Jozsa Algorithm",
        duration: "20 mins",
        summary:
          "Determines whether a black-box oracle function f(x) is constant or balanced in a single evaluation query compared to 2^(N-1)+1 classical queries.",
        keyConcepts: [
          "Quantum Oracle evaluation",
          "Phase kickback trick",
          "Constructive interference at state |00...0⟩ for constant functions",
        ],
        flashcards: [
          {
            id: "fc-algo-1",
            front: "What is Phase Kickback?",
            back: "An effect where an eigenvalue of an oracle's target qubit is kicked back to alter the phase of the control qubit.",
          },
        ],
        quizQuestions: [
          {
            id: "q-algo-1",
            question: "How many oracle queries does the Deutsch-Jozsa algorithm require to evaluate a function on N qubits?",
            options: ["1 query", "N queries", "2^N queries", "2^(N-1) + 1 queries"],
            correctIndex: 0,
            explanation: "Deutsch-Jozsa evaluates the entire domain simultaneously in a single quantum query using superposition and phase interference.",
            recommendedTopic: "Quantum Oracles & Speedup"
          }
        ]
      },
      {
        id: "algo-2",
        title: "Grover's Search & Amplitude Amplification",
        duration: "25 mins",
        summary:
          "Amplifies the probability amplitude of target marked items in an unsorted database of N items in O(√N) iterations.",
        keyConcepts: [
          "Oracle phase inversion (-1 factor on target)",
          "Diffuser operator (inversion about the mean)",
          "Optimal iteration count ≈ (π/4)√N",
        ],
        flashcards: [
          {
            id: "fc-algo-2",
            front: "What happens if you run Grover's diffuser operator too many times?",
            back: "Over-rotation! The target state amplitude begins to decrease as the state vector rotates past the marked state.",
          },
        ],
        quizQuestions: [
          {
            id: "q-algo-2",
            question: "If searching a database of N = 1,000,000 items, roughly how many quantum queries does Grover's algorithm need?",
            options: ["1,000,000", "500,000", "~785 queries", "10 queries"],
            correctIndex: 2,
            explanation: "(π/4) * √1,000,000 = 0.785 * 1000 ≈ 785 queries, compared to 500,000 classical average checks.",
            recommendedTopic: "Grover's Search Algorithm"
          }
        ]
      }
    ],
  },
];
