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
        videoUrl: "https://www.youtube-nocookie.com/embed/gI-qXk7XojA",
        videoTitle: "How Transistors and Binary Logic Gates Work",
        videoChapters: [
          { time: "0:00", title: "Introduction to Binary Data" },
          { time: "2:15", title: "Transistor Switches & Voltage Levels" },
          { time: "5:10", title: "Building AND, OR, and NOT Gates" },
          { time: "7:00", title: "NAND Gate Universal Computation" },
        ],
        videoTranscript:
          "In classical computing, information is represented using binary digits or bits. Each bit takes a value of either 0 (low voltage ~0V) or 1 (high voltage ~3.3V). Millions of silicon MOSFET transistors act as physical switches processing these states. Logical gates like AND, OR, and NOT combine these electrical signals deterministically.",
        imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
        imageCaption: "Microchip silicon substrate hosting billions of nanoscale classical MOSFET transistors.",
        diagramType: "matrix",
        formulaLatex: "\\text{Bit state} \\in \\{0, 1\\}, \\quad \\text{NAND}(A, B) = \\neg(A \\wedge B)",
        matrixNotation: "\\text{NOT Gate} = \\begin{pmatrix} 0 & 1 \\\\ 1 & 0 \\end{pmatrix}, \\quad |0\\rangle \\mapsto |1\\rangle, \\quad |1\\rangle \\mapsto |0\\rangle",
        fullTextContent:
          "Classical information relies on macroscopically distinguishable physical states, typically electrical voltage levels in silicon transistors. A transistor conducts current when switched ON (representing 1) and blocks current when OFF (representing 0). Combining transistors forms logic gates like AND, OR, NOT, and NAND.\n\nUniversal classical computation can be built entirely from NAND gates. However, as transistor gate oxides shrink below 3 nanometers, electrons begin to quantum-tunnel through insulating barriers, causing leakage currents and heat dissipation. This physical barrier necessitates the transition to quantum computing architecture.",
        summary:
          "Classical computing encodes data using electrical voltage levels representing binary 0s and 1s. Logic gates process these bits deterministically, but nanoscale silicon faces severe thermal and tunneling limits.",
        keyConcepts: [
          "Binary digits (strictly 0 or 1)",
          "Deterministic state transitions",
          "NAND logic completeness",
          "Quantum tunneling limits of silicon miniaturization",
        ],
        starterCode: `# Classical Logic Gate Simulation in Python
def nand_gate(a: int, b: int) -> int:
    return 0 if (a == 1 and b == 1) else 1

print("NAND(1, 1) =", nand_gate(1, 1)) # Outputs 0
print("NAND(1, 0) =", nand_gate(1, 0)) # Outputs 1`,
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
        videoUrl: "https://www.youtube-nocookie.com/embed/F_Riqjdh2oM",
        videoTitle: "Linear Algebra & Dirac Bra-Ket Notation for Quantum Mechanics",
        videoChapters: [
          { time: "0:00", title: "Ket Vectors |ψ⟩ in Hilbert Space" },
          { time: "3:30", title: "Basis Vectors |0⟩ and |1⟩" },
          { time: "6:45", title: "Complex Probability Amplitudes α & β" },
          { time: "9:50", title: "Normalization & Born's Rule" },
        ],
        videoTranscript:
          "In 1930, Paul Dirac introduced bra-ket notation to simplify quantum mechanics. A ket vector |ψ⟩ denotes a column vector in complex Hilbert space, while a bra vector ⟨ψ| represents the complex conjugate transpose row vector. The inner product ⟨φ|ψ⟩ measures state overlap.",
        imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80",
        imageCaption: "Mathematical representation of state vectors residing in complex Hilbert vector space.",
        diagramType: "superposition",
        formulaLatex: "|\\psi\\rangle = \\alpha |0\\rangle + \\beta |1\\rangle, \\quad \\text{where } \\alpha, \\beta \\in \\mathbb{C} \\text{ and } |\\alpha|^2 + |\\beta|^2 = 1",
        matrixNotation: "|0\\rangle = \\begin{pmatrix} 1 \\\\ 0 \\end{pmatrix}, \\quad |1\\rangle = \\begin{pmatrix} 0 \\\\ 1 \\end{pmatrix}, \\quad |\\psi\\rangle = \\begin{pmatrix} \\alpha \\\\ \\beta \\end{pmatrix}",
        fullTextContent:
          "Dirac bra-ket notation provides an elegant mathematical language for quantum mechanics:\n\n1. Ket Vector |ψ⟩: Column vector representing the state of a quantum system.\n2. Basis States: The computational basis consists of orthonormal states |0⟩ = [1, 0]ᵀ and |1⟩ = [0, 1]ᵀ.\n3. State Vector: Any qubit state is expressed as |ψ⟩ = α|0⟩ + β|1⟩, where α and β are complex numbers.\n4. Born Rule: The probability of measuring state |0⟩ is P(0) = |α|², and measuring state |1⟩ is P(1) = |β|².\n5. Normalization: Total probability must sum to 1: |α|² + |β|² = 1.",
        summary:
          "Dirac bra-ket notation represents quantum states as column vectors in a complex Hilbert space. The state |ψ⟩ = α|0⟩ + β|1⟩ specifies state amplitudes with normalization |α|² + |β|² = 1.",
        keyConcepts: [
          "Ket vector |ψ⟩ and Bra vector ⟨ψ|",
          "Basis vectors |0⟩ = [1, 0]^T and |1⟩ = [0, 1]^T",
          "Complex probability amplitudes α and β",
          "Normalization condition |α|^2 + |β|^2 = 1",
        ],
        starterCode: `# Qiskit State Vector Declaration in Python
from qiskit.quantum_info import Statevector
import numpy as np

# Define qubit state |ψ⟩ = (1/√2)|0⟩ + (i/√2)|1⟩
alpha = 1 / np.sqrt(2)
beta = 1j / np.sqrt(2)
psi = Statevector([alpha, beta])

print("State Vector:", psi)
print("Is Valid Normalized State?", psi.is_valid())`,
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
            explanation: "The probability is |β|^2 = |i/√2|^2 = (1/2) or 50%.",
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
        videoUrl: "https://www.youtube-nocookie.com/embed/a1NZC5rqI80",
        videoTitle: "Understanding the Bloch Sphere Geometry & Qubit Rotations",
        videoChapters: [
          { time: "0:00", title: "North & South Poles (|0⟩ and |1⟩)" },
          { time: "3:40", title: "The Equator States (|+⟩ and |-⟩)" },
          { time: "7:15", title: "Polar Angle θ and Azimuthal Angle φ" },
          { time: "11:20", title: "Unit Vector Rotations on 3D Sphere" },
        ],
        videoTranscript:
          "The Bloch sphere provides a geometric visualization of a single qubit state. The North pole corresponds to state |0⟩, while the South pole corresponds to state |1⟩. Points along the equator represent equal superposition states with varying relative phase φ.",
        imageUrl: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&q=80",
        imageCaption: "3D Bloch sphere vector representation mapping quantum state rotations across X, Y, and Z axes.",
        diagramType: "bloch",
        formulaLatex: "|\\psi\\rangle = \\cos\\left(\\frac{\\theta}{2}\\right)|0\\rangle + e^{i\\phi}\\sin\\left(\\frac{\\theta}{2}\\right)|1\\rangle, \\quad 0 \\le \\theta \\le \\pi, \\; 0 \\le \\phi < 2\\pi",
        matrixNotation: "x = \\sin\\theta \\cos\\phi, \\quad y = \\sin\\theta \\sin\\phi, \\quad z = \\cos\\theta",
        fullTextContent:
          "The Bloch sphere maps pure single-qubit state vectors to points on a 3D unit sphere:\n\n1. Polar Angle θ (0 to π): Controls the relative probability magnitude between |0⟩ and |1⟩. θ = 0 is North Pole (|0⟩), θ = π is South Pole (|1⟩), and θ = π/2 is the Equator.\n2. Azimuthal Angle φ (0 to 2π): Controls the relative phase factor e^(iφ).\n3. Computational States:\n   - North Pole: |0⟩\n   - South Pole: |1⟩\n   - +X Axis: |+⟩ = (|0⟩ + |1⟩)/√2\n   - -X Axis: |-⟩ = (|0⟩ - |1⟩)/√2\n   - +Y Axis: |+i⟩ = (|0⟩ + i|1⟩)/√2\n   - -Y Axis: |-i⟩ = (|0⟩ - i|1⟩)/√2",
        summary:
          "The Bloch sphere maps any pure qubit state to a point on a unit 3D sphere using polar angle θ and azimuthal angle φ.",
        keyConcepts: [
          "North pole = |0⟩, South pole = |1⟩",
          "Equator states: (|0⟩ ± |1⟩)/√2 and (|0⟩ ± i|1⟩)/√2",
          "State vector: |ψ⟩ = cos(θ/2)|0⟩ + e^(iφ)sin(θ/2)|1⟩",
          "Unit sphere radius |r| = 1",
        ],
        starterCode: `# Bloch Sphere Visualizer in Qiskit
from qiskit.visualization import plot_bloch_multivector
from qiskit.quantum_info import Statevector
import numpy as np

# Create state vector on equator |+⟩
state = Statevector([1/np.sqrt(2), 1/np.sqrt(2)])
print("Bloch State Vector:", state)`,
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
        videoUrl: "https://www.youtube-nocookie.com/embed/QuR969uMICM",
        videoTitle: "Superconducting vs Trapped Ion Quantum Hardware",
        videoChapters: [
          { time: "0:00", title: "Superconducting Transmon Qubits" },
          { time: "4:15", title: "Josephson Junction Non-linear Inductors" },
          { time: "8:00", title: "Trapped Ion Laser Manipulations" },
          { time: "11:30", title: "Cryogenic Dilution Refrigerators (15 mK)" },
        ],
        videoTranscript:
          "Quantum hardware physical implementations require isolating two-level quantum systems from environmental thermal noise. Superconducting circuits use LC oscillators with non-linear Josephson junctions. Trapped ion systems suspend individual Ytterbium ions in electromagnetic traps.",
        imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
        imageCaption: "Cryogenic dilution refrigerator cooling superconducting quantum chips down to 15 millikelvin.",
        diagramType: "hardware",
        formulaLatex: "H_{\\text{transmon}} = 4E_C(n - n_g)^2 - E_J \\cos\\phi, \\quad T_1 \\text{ (relaxation)}, \\quad T_2 \\text{ (dephasing)}",
        matrixNotation: "T_{\\text{cryo}} \\approx 15 \\text{ mK} \\ll \\frac{\\hbar \\omega_0}{k_B} \\approx 200 \\text{ mK}",
        fullTextContent:
          "A comparison of leading physical qubit technologies:\n\n1. Superconducting Transmon Qubits (IBM, Google, Rigetti):\n   - Microscopic superconducting aluminum circuits printed on silicon chips.\n   - Josephson junctions create an anharmonic oscillator with distinct |0⟩ to |1⟩ microwave transition frequency (~5 GHz).\n   - Operates at 15 mK in dilution fridges to eliminate thermal photon noise.\n\n2. Trapped Ion Qubits (IonQ, Quantinuum):\n   - Individual charged atoms (e.g. 𝟣𝟩𝟣Yb⁺) suspended in vacuum traps using RF electric fields.\n   - Quantum states manipulated using highly stabilized laser beams.\n   - Extremely long coherence times (T1 > seconds) and ultra-high gate fidelities (>99.9%).",
        summary:
          "Compare leading quantum hardware technologies: Superconducting transmon circuits, Trapped Ions, and Silicon Spin Qubits.",
        keyConcepts: [
          "Superconducting transmon Josephson junctions",
          "Trapped ion laser manipulations",
          "Coherence times T1 (energy relaxation) & T2 (dephasing)",
          "Cryogenic dilution refrigerators (15 milliKelvin)",
        ],
        starterCode: `# Checking Hardware Backend Specs in Qiskit
# Example hardware qubit parameters
t1_microseconds = 120.5
t2_microseconds = 95.2
gate_fidelity_cnot = 0.992

print(f"Hardware T1: {t1_microseconds} μs | T2: {t2_microseconds} μs")
print(f"2-Qubit Gate Error: {(1 - gate_fidelity_cnot)*100:.2f}%")`,
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
        videoUrl: "https://www.youtube-nocookie.com/embed/OWJCfOvochA",
        videoTitle: "The Hadamard Gate & Quantum Superposition Explained",
        videoChapters: [
          { time: "0:00", title: "What is Quantum Superposition?" },
          { time: "2:30", title: "The Hadamard Matrix Transformation" },
          { time: "5:15", title: "Mapping |0⟩ to |+⟩ and |1⟩ to |-⟩" },
          { time: "8:00", title: "Quantum Interference Reversibility" },
        ],
        videoTranscript:
          "The Hadamard gate (H) is the fundamental gateway to quantum parallelism. Applying H to a basis state |0⟩ yields state |+⟩ = (|0⟩ + |1⟩)/√2. Measuring this state collapses the wavefunction to either |0⟩ or |1⟩ with equal 50% probability.",
        imageUrl: "https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=800&q=80",
        imageCaption: "Interference pattern generated when quantum state amplitudes constructively and destructively combine.",
        diagramType: "circuit",
        formulaLatex: "H = \\frac{1}{\\sqrt{2}}\\begin{pmatrix} 1 & 1 \\\\ 1 & -1 \\end{pmatrix}, \\quad H|0\\rangle = \\frac{|0\\rangle + |1\\rangle}{\\sqrt{2}} = |+\\rangle, \\quad H|1\\rangle = \\frac{|0\\rangle - |1\\rangle}{\\sqrt{2}} = |-\\rangle",
        matrixNotation: "H^2 = H \\cdot H = \\begin{pmatrix} 1 & 0 \\\\ 0 & 1 \\end{pmatrix} = I",
        fullTextContent:
          "The Hadamard gate is a single-qubit operation that acts as a 90° rotation around the Y-axis followed by a 180° rotation around the X-axis on the Bloch sphere:\n\n1. Action on Basis States:\n   - H|0⟩ = |+⟩ = (|0⟩ + |1⟩)/√2 (Equal superposition with positive phase)\n   - H|1⟩ = |-⟩ = (|0⟩ - |1⟩)/√2 (Equal superposition with negative phase)\n\n2. Reversibility & Self-Inverseness:\n   - Because H is unitary and Hermitian (H = H† = H⁻¹), applying H twice yields the identity: H(H|0⟩) = H(|+⟩) = |0⟩.\n\n3. Interference:\n   - Superposition amplitudes combine linearly. The negative sign in |-⟩ allows destructive interference to eliminate incorrect computational paths in algorithms like Grover's and Deutsch-Jozsa.",
        summary:
          "The Hadamard (H) gate transforms standard computational basis states into equal superposition states, enabling quantum parallelism.",
        keyConcepts: [
          "H|0⟩ = |+⟩ = (|0⟩ + |1⟩)/√2",
          "H|1⟩ = |-⟩ = (|0⟩ - |1⟩)/√2",
          "Self-inverse matrix property: H * H = I",
          "Constructive and destructive interference",
        ],
        starterCode: `# Creating Superposition in Qiskit
from qiskit import QuantumCircuit
from qiskit.quantum_info import Statevector

# Build 1-qubit circuit with Hadamard gate
qc = QuantumCircuit(1)
qc.h(0)

# Extract statevector
state = Statevector.from_instruction(qc)
print("State Vector after H gate:", state)
print("Probabilities:", state.probabilities_dict())`,
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
        videoUrl: "https://www.youtube-nocookie.com/embed/zNzzGgr2mhk",
        videoTitle: "Quantum Entanglement & Generating Bell States",
        videoChapters: [
          { time: "0:00", title: "What is Quantum Entanglement?" },
          { time: "4:00", title: "Building the Bell State Circuit (H + CNOT)" },
          { time: "8:30", title: "The 4 Maximally Entangled Bell Basis States" },
          { time: "13:00", title: "Einstein's Spooky Action & Bell's Theorem" },
        ],
        videoTranscript:
          "Quantum entanglement is a physical phenomenon where two or more qubits become inextricably interconnected such that the quantum state of each particle cannot be described independently of the others, regardless of distance.",
        imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
        imageCaption: "Conceptual diagram of entangled photon pair correlations across spatial distances.",
        diagramType: "entanglement",
        formulaLatex: "|\\Phi^+\\rangle = \\frac{|00\\rangle + |11\\rangle}{\\sqrt{2}}, \\quad |\\Phi^-\\rangle = \\frac{|00\\rangle - |11\\rangle}{\\sqrt{2}}, \\quad |\\Psi^+\\rangle = \\frac{|01\\rangle + |10\\rangle}{\\sqrt{2}}, \\quad |\\Psi^-\\rangle = \\frac{|01\\rangle - |10\\rangle}{\\sqrt{2}}",
        matrixNotation: "\\text{Bell Circuit} = \\text{CNOT}_{0,1} \\cdot (H_0 \\otimes I_1)",
        fullTextContent:
          "Generating the maximally entangled Bell state |Φ⁺⟩:\n\n1. Circuit Steps:\n   - Start with 2 qubits in ground state |00⟩.\n   - Apply Hadamard gate to q0: (|0⟩ + |1⟩)|0⟩ / √2 = (|00⟩ + |10⟩) / √2.\n   - Apply CNOT gate with q0 as control and q1 as target.\n   - When q0 is 0, q1 remains 0 → |00⟩.\n   - When q0 is 1, q1 flips to 1 → |11⟩.\n   - Resulting State: |Φ⁺⟩ = (|00⟩ + |11⟩) / √2.\n\n2. Key Properties:\n   - Non-separability: |Φ⁺⟩ cannot be factored into |ψ₁⟩ ⊗ |ψ₂⟩.\n   - Instant Correlation: Measuring q0 as 0 immediately guarantees q1 will measure as 0, even light-years apart.",
        summary:
          "Combining a Hadamard gate on Qubit 0 with a CNOT gate controlled by Qubit 0 on Qubit 1 creates maximally entangled Bell states.",
        keyConcepts: [
          "|Φ+⟩ = (|00⟩ + |11⟩)/√2",
          "Maximal entanglement",
          "No-cloning theorem",
          "Einstein-Podolsky-Rosen (EPR) paradox",
        ],
        starterCode: `# Generating Bell State |Φ+⟩ in Qiskit
from qiskit import QuantumCircuit
from qiskit.quantum_info import Statevector

qc = QuantumCircuit(2)
qc.h(0)         # Put qubit 0 in superposition
qc.cx(0, 1)      # Entangle qubit 0 and qubit 1

bell_state = Statevector.from_instruction(qc)
print("Bell State Vector |Φ+⟩:", bell_state)`,
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
        videoUrl: "https://www.youtube-nocookie.com/embed/3m4U660SgX0",
        videoTitle: "Quantum Teleportation Explained Step-by-Step",
        videoChapters: [
          { time: "0:00", title: "The Teleportation Problem" },
          { time: "4:15", title: "Distributing the Entangled Bell Pair" },
          { time: "9:00", title: "Alice's Bell State Measurement" },
          { time: "14:30", title: "Transmitting 2 Classical Bits" },
          { time: "17:00", title: "Bob's Pauli Gate Reconstruction" },
        ],
        videoTranscript:
          "Quantum teleportation uses entanglement and classical communication to transfer an unknown quantum state |ψ⟩ from Alice to Bob without physically transmitting the qubit itself. Alice performs a Bell measurement on her qubit and the unknown state, sending 2 classical bits to Bob.",
        imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
        imageCaption: "3-qubit circuit timeline showing state teleportation from Alice's node to Bob's node.",
        diagramType: "circuit",
        formulaLatex: "|\\text{Initial}\\rangle = (\\alpha|0\\rangle + \\beta|1\\rangle)_A \\otimes \\frac{|00\\rangle_{BC} + |11\\rangle_{BC}}{\\sqrt{2}}",
        matrixNotation: "\\text{Classical Bits } m_1 m_2 \\in \\{00, 01, 10, 11\\} \\implies \\text{Bob applies } Z^{m_1} X^{m_2}",
        fullTextContent:
          "The Quantum Teleportation Protocol involves 3 qubits:\n- Qubit 0 (Alice): Holds unknown state |ψ⟩ = α|0⟩ + β|1⟩.\n- Qubit 1 (Alice) & Qubit 2 (Bob): Shared entangled pair (|00⟩ + |11⟩)/√2.\n\nProtocol Steps:\n1. Alice entangles her unknown qubit with her half of the Bell pair using CNOT and Hadamard gates.\n2. Alice measures her two qubits in the computational basis, obtaining 2 classical bits (m₁, m₂).\n3. Alice transmits these 2 classical bits to Bob over a classical channel (phone, internet, light).\n4. Bob applies conditional Pauli corrections based on the bits received:\n   - 00 → Apply Identity I\n   - 01 → Apply Pauli-X (Bit flip)\n   - 10 → Apply Pauli-Z (Phase flip)\n   - 11 → Apply Pauli-Z then Pauli-X\n5. Result: Bob's qubit now perfectly matches Alice's original state |ψ⟩, while Alice's original state was destroyed upon measurement (satisfying No-Cloning).",
        summary:
          "Transfer an unknown quantum state |ψ⟩ from Alice to Bob using an entangled Bell pair and 2 classical bits without physically transporting the particle.",
        keyConcepts: [
          "3-qubit circuit protocol",
          "Bell measurement by Alice",
          "Classical feed-forward correction (Pauli X / Z gates at Bob's end)",
          "Destruction of Alice's original state (respecting No-Cloning)",
        ],
        starterCode: `# 3-Qubit Teleportation Protocol in Qiskit
from qiskit import QuantumCircuit

qc = QuantumCircuit(3, 2)
# 1. Prepare unknown state |ψ⟩ on q0
qc.rx(0.8, 0)

# 2. Shared Bell pair between q1 and q2
qc.h(1)
qc.cx(1, 2)

# 3. Alice's Bell Measurement
qc.cx(0, 1)
qc.h(0)
qc.measure([0, 1], [0, 1])

print(qc.draw())`,
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
        videoUrl: "https://www.youtube-nocookie.com/embed/j1uS18yAasQ",
        videoTitle: "Quantum Logic Gates: Pauli X, Y, Z, S, and T Gates",
        videoChapters: [
          { time: "0:00", title: "Unitary Matrix Rules (U† U = I)" },
          { time: "3:15", title: "Pauli X (Bit Flip) & Pauli Z (Phase Flip)" },
          { time: "7:00", title: "Pauli Y Gate Combination" },
          { time: "10:30", title: "S and T Phase Shift Gates" },
        ],
        videoTranscript:
          "All quantum operations are represented by unitary matrices U. Unitary operations preserve the inner product and ensure that probability sums remain equal to 1. The Pauli matrices X, Y, and Z form a basis for all single-qubit Hermitian operators.",
        imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
        imageCaption: "Matrix transformation grid showing unitary operator maps on quantum computational vectors.",
        diagramType: "matrix",
        formulaLatex: "X = \\begin{pmatrix} 0 & 1 \\\\ 1 & 0 \\end{pmatrix}, \\quad Y = \\begin{pmatrix} 0 & -i \\\\ i & 0 \\end{pmatrix}, \\quad Z = \\begin{pmatrix} 1 & 0 \\\\ 0 & -1 \\end{pmatrix}, \\quad S = \\begin{pmatrix} 1 & 0 \\\\ 0 & i \\end{pmatrix}, \\quad T = \\begin{pmatrix} 1 & 0 \\\\ 0 & e^{i\\pi/4} \\end{pmatrix}",
        matrixNotation: "R_z(\\theta) = e^{-i\\theta Z/2} = \\begin{pmatrix} e^{-i\\theta/2} & 0 \\\\ 0 & e^{i\\theta/2} \\end{pmatrix}",
        fullTextContent:
          "Single-Qubit Unitary Operators:\n\n1. Pauli-X (Bit Flip): Swaps |0⟩ and |1⟩ amplitudes.\n2. Pauli-Z (Phase Flip): Leaves |0⟩ unchanged, flips sign of |1⟩ to -|1⟩.\n3. Pauli-Y (Bit & Phase Flip): Combines bit flip and phase flip with imaginary factor i.\n4. Phase S Gate: Applies a π/2 (90°) phase shift to |1⟩. Note that S = √Z.\n5. Phase T Gate: Applies a π/4 (45°) phase shift to |1⟩. Note that T = √S = ⁴√Z.",
        summary:
          "All quantum operations correspond to unitary matrices U (U† U = I), preserving vector length and probability sum = 1.",
        keyConcepts: [
          "Pauli X (Bit flip), Pauli Y (Bit & Phase flip), Pauli Z (Phase flip)",
          "Phase S (π/2 phase) & T (π/4 phase) gates",
          "Arbitrary rotation operators Rx(θ), Ry(θ), Rz(θ)",
        ],
        starterCode: `# Pauli Gate Rotations in Qiskit
from qiskit import QuantumCircuit
import numpy as np

qc = QuantumCircuit(1)
qc.x(0)      # Flip |0⟩ to |1⟩
qc.s(0)      # Apply π/2 phase
qc.rz(np.pi/4, 0) # Rotate around Z axis by 45°

print(qc.draw())`,
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
        videoUrl: "https://www.youtube-nocookie.com/embed/e211x0A36jA",
        videoTitle: "Quantum Circuit Optimization, Depth & Transpilation",
        videoChapters: [
          { time: "0:00", title: "Understanding Circuit Depth vs Gate Count" },
          { time: "3:30", title: "Coupling Graphs & Heavy-Hex Hardware" },
          { time: "8:15", title: "Inserting SWAP Gates for Connectivity" },
          { time: "12:00", title: "Error Rates & Decoherence Budgeting" },
        ],
        videoTranscript:
          "Circuit depth represents the maximum number of sequential gate layers executed from input to output. Lower circuit depth reduces execution time, minimizing cumulative environmental decoherence noise.",
        imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
        imageCaption: "Network topology graph showing physical qubit coupling constraints on quantum processing units.",
        diagramType: "circuit",
        formulaLatex: "\\text{Fidelity} \\approx \\prod_{i=1}^{D} (1 - \\epsilon_i), \\quad \\text{Depth } D = \\max \\text{path length}",
        matrixNotation: "\\text{SWAP}_{0,1} = \\text{CNOT}_{0,1} \\cdot \\text{CNOT}_{1,0} \\cdot \\text{CNOT}_{0,1}",
        fullTextContent:
          "Circuit Depth and Optimization Rules:\n\n1. Circuit Depth: The minimum number of time steps required to execute all gates in parallel layers.\n2. Transpilation: High-level circuits must be rewritten into native target hardware gate sets (e.g. {RZ, SX, X, ECR}).\n3. Qubit Mapping: Physical devices have limited nearest-neighbor connectivity. When a 2-qubit gate is required between non-adjacent qubits, transpilers insert SWAP gates (each requiring 3 CNOTs).\n4. Error Budget: Because 2-qubit gates typically have error rates around 0.5% - 1%, keeping circuit depth shallow is critical for NISQ applications.",
        summary:
          "Circuit depth determines execution latency on hardware. Minimizing multi-qubit gate count reduces decoherence errors.",
        keyConcepts: [
          "Circuit depth vs total gate count",
          "SWAP gate overhead on heavy-hex hardware graphs",
          "Error rates of 2-qubit gates vs 1-qubit gates",
        ],
        starterCode: `# Transpiling Circuit in Qiskit
from qiskit import QuantumCircuit
from qiskit.compiler import transpile

qc = QuantumCircuit(3)
qc.h(0)
qc.cx(0, 2) # Non-adjacent qubits

print("Original Circuit Depth:", qc.depth())`,
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
        videoUrl: "https://www.youtube-nocookie.com/embed/5x3f35xR9Q8",
        videoTitle: "The Deutsch-Jozsa Algorithm & Quantum Speedup",
        videoChapters: [
          { time: "0:00", title: "Constant vs Balanced Functions" },
          { time: "4:00", title: "Classical Query Complexity O(2^N)" },
          { time: "8:15", title: "The Quantum Oracle & Phase Kickback" },
          { time: "14:00", title: "Exponential Speedup in 1 Query" },
        ],
        videoTranscript:
          "The Deutsch-Jozsa algorithm demonstrates exponential speedup over classical algorithms. Given a black-box function f(x) guaranteed to be either constant (same output for all inputs) or balanced (output 0 for half, 1 for half), Deutsch-Jozsa determines the property in a single quantum query.",
        imageUrl: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&q=80",
        imageCaption: "Quantum oracle phase kickback mechanism routing query interference.",
        diagramType: "oracle",
        formulaLatex: "U_f |x\\rangle |y\\rangle = |x\\rangle |y \\oplus f(x)\\rangle, \\quad \\text{Phase Kickback: } U_f |x\\rangle |-\\rangle = (-1)^{f(x)} |x\\rangle |-\\rangle",
        matrixNotation: "\\text{Queries: } Q_{\\text{quantum}} = 1 \\quad \\text{vs} \\quad Q_{\\text{classical}} = 2^{N-1} + 1",
        fullTextContent:
          "Deutsch-Jozsa Algorithm Walkthrough:\n\n1. Problem Statement: Given a function f: {0,1}ⁿ → {0,1}, determine if f is Constant (always 0 or always 1) or Balanced (returns 0 for half of domain and 1 for half).\n2. Classical Complexity: Requires evaluating 2^(N-1) + 1 inputs in the worst-case for 100% certainty.\n3. Quantum Protocol:\n   - Initialize N input qubits to |0⟩ and 1 target qubit to |1⟩.\n   - Apply Hadamard gates to all qubits: Input becomes equal superposition, target becomes |-⟩.\n   - Evaluate Quantum Oracle U_f: Phase kickback converts output f(x) into phase factor (-1)^(f(x)).\n   - Apply Hadamard gates to input qubits and measure.\n   - Measurement Result: If f is Constant, input measures strictly as |00...0⟩ due to constructive interference. If f is Balanced, input measures as non-zero state due to destructive interference.",
        summary:
          "Determines whether a black-box oracle function f(x) is constant or balanced in a single evaluation query compared to 2^(N-1)+1 classical queries.",
        keyConcepts: [
          "Quantum Oracle evaluation",
          "Phase kickback trick",
          "Constructive interference at state |00...0⟩ for constant functions",
        ],
        starterCode: `# Deutsch-Jozsa 2-Qubit Algorithm in Qiskit
from qiskit import QuantumCircuit

dj_circuit = QuantumCircuit(3, 2)
# Prepare target qubit in |-⟩
dj_circuit.x(2)
dj_circuit.h(2)

# Apply Hadamards to input qubits
dj_circuit.h([0, 1])

# Oracle execution & Hadamards
dj_circuit.h([0, 1])
dj_circuit.measure([0, 1], [0, 1])

print(dj_circuit.draw())`,
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
        videoUrl: "https://www.youtube-nocookie.com/embed/e10O8I3e87I",
        videoTitle: "Grover's Search Algorithm & Geometric Amplitude Amplification",
        videoChapters: [
          { time: "0:00", title: "Unsorted Database Search Problem" },
          { time: "4:30", title: "Oracle Phase Inversion (-1 Factor)" },
          { time: "9:15", title: "Grover Diffuser Operator (Inversion About Mean)" },
          { time: "16:00", title: "Quadratic Speedup O(√N)" },
        ],
        videoTranscript:
          "Grover's algorithm searches an unsorted database of N items for a target item in O(√N) time steps, providing quadratic speedup over classical brute-force search O(N). It uses amplitude amplification to repeatedly flip and amplify target amplitudes.",
        imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80",
        imageCaption: "Geometric rotation of state vector towards target state w in Hilbert space.",
        diagramType: "superposition",
        formulaLatex: "D = 2|s\\rangle\\langle s| - I, \\quad k_{\\text{optimal}} \\approx \\frac{\\pi}{4}\\sqrt{N}",
        matrixNotation: "O(N) \\xrightarrow{\\text{Grover}} O(\\sqrt{N}) \\quad (N=10^6 \\implies 1,000,000 \\to 785 \\text{ steps})",
        fullTextContent:
          "Grover's Search Algorithm Core Steps:\n\n1. State Initialization: Apply Hadamard gates to create uniform superposition over all N = 2ⁿ computational states |s⟩.\n2. Oracle Phase Inversion: The oracle negates the amplitude of the target state |w⟩: O|x⟩ = -|x⟩ if x=w, else |x⟩.\n3. Diffuser Operator (Inversion About Mean): Reflects state amplitudes across the mean amplitude: D = 2|s⟩⟨s| - I.\n4. Iteration: Repeating the (Oracle + Diffuser) combination rotates the state vector by angle 2θ per step towards target state |w⟩.\n5. Measurement: After approximately (π/4)√N iterations, measuring the qubits yields target item |w⟩ with near 100% probability.",
        summary:
          "Amplifies the probability amplitude of target marked items in an unsorted database of N items in O(√N) iterations.",
        keyConcepts: [
          "Oracle phase inversion (-1 factor on target)",
          "Diffuser operator (inversion about the mean)",
          "Optimal iteration count ≈ (π/4)√N",
        ],
        starterCode: `# Grover's Algorithm 2-Qubit Search in Qiskit
from qiskit import QuantumCircuit

grover_circuit = QuantumCircuit(2, 2)
# Step 1: Equal superposition
grover_circuit.h([0, 1])

# Step 2: Oracle (Mark state |11⟩)
grover_circuit.cz(0, 1)

# Step 3: Diffuser
grover_circuit.h([0, 1])
grover_circuit.z([0, 1])
grover_circuit.cz(0, 1)
grover_circuit.h([0, 1])

grover_circuit.measure([0, 1], [0, 1])
print(grover_circuit.draw())`,
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
