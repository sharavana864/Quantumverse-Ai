import { CareerPaper } from "../types";

export const CAREER_PAPERS: CareerPaper[] = [
  {
    id: "p-1",
    title: "Fault-Tolerant Quantum Computation with Surface Codes",
    authors: ["Austin G. Fowler", "Matteo Mariantoni", "John M. Martinis", "Andrew N. Cleland"],
    journal: "Physical Review A / arXiv:1208.0928",
    year: 2024,
    category: "Quantum Error Correction",
    abstract:
      "A detailed roadmap for implementing 2D surface codes on nearest-neighbor coupled qubit arrays, demonstrating fault tolerance thresholds of ~1% per gate.",
    paperUrl: "https://arxiv.org/abs/1208.0928",
  },
  {
    id: "p-2",
    title: "Quantum Computational Advantage Using Photonic Qubits",
    authors: ["Han-Sen Zhong", "Hui Wang", "Y. H. Deng", "Chao-Yang Lu", "Jian-Wei Pan"],
    journal: "Science / arXiv:2012.01616",
    year: 2025,
    category: "Hardware & Hardware Engineering",
    abstract:
      "Gaussian boson sampling experiment with up to 76 detected photons establishing quantum computational advantage over classical supercomputers.",
    paperUrl: "https://arxiv.org/abs/2012.01616",
  },
  {
    id: "p-3",
    title: "Quantum Machine Learning in High Energy Physics",
    authors: ["Sofia Vallecorsa", "Federico Carminati", "Michele Grossi"],
    journal: "Nature Reviews Physics / arXiv:2104.11588",
    year: 2025,
    category: "Quantum Machine Learning",
    abstract:
      "Review of quantum neural networks and kernel methods applied to LHC particle track reconstruction and dark matter detection algorithms.",
    paperUrl: "https://arxiv.org/abs/2104.11588",
  },
  {
    id: "p-4",
    title: "Resource Estimates for Quantum Chemistry Simulations",
    authors: ["Ryan Babbush", "Craig Gidney", "Dominic W. Berry", "Jarrod R. McClean"],
    journal: "PRX Quantum / arXiv:1805.11598",
    year: 2026,
    category: "Quantum Algorithms",
    abstract:
      "Calculates physical qubit requirements for simulating FeMoco nitrogenase catalytic nitrogen fixation on fault-tolerant quantum hardware.",
    paperUrl: "https://arxiv.org/abs/1805.11598",
  },
];

export const CERTIFICATIONS_LIST = [
  {
    id: "cert-ibm-qiskit",
    title: "IBM Quantum Developer Certification (C1000-112)",
    issuer: "IBM Quantum",
    skills: ["Qiskit SDK", "Quantum Circuits", "Aer Simulator", "Transpilation", "Pulse Control"],
    difficulty: "Intermediate",
    recommendedPrep: "Complete Modules 1-6 + Solve 4 Coding Challenges in QuantumVerse AI",
    link: "https://www.ibm.com/training/certification/C1000-112",
  },
  {
    id: "cert-mit-x",
    title: "MIT xPro Professional Certificate in Quantum Computing",
    issuer: "MIT xPro",
    skills: ["Quantum Algorithms", "Hardware Implementations", "Quantum Business Applications"],
    difficulty: "Advanced",
    recommendedPrep: "Complete Module 7 Algorithms + Research Papers Reading",
    link: "https://xpro.mit.edu/courses/quantum-computing/",
  },
  {
    id: "cert-pennylane",
    title: "Xanadu PennyLane Certified QML Developer",
    issuer: "Xanadu AI",
    skills: ["PennyLane", "Quantum Neural Networks", "VQE", "Variational Circuits"],
    difficulty: "Intermediate",
    recommendedPrep: "Complete Coding Challenge 3 & QML Workshop",
    link: "https://pennylane.ai/certificates",
  },
];

export const INTERNSHIP_OPPORTUNITIES = [
  {
    id: "int-ibm",
    company: "IBM Quantum",
    role: "Quantum Research & Developer Intern (Summer 2027)",
    location: "Yorktown Heights, NY / Remote",
    stipend: "$52 - $68 / hr",
    requirements: "Python proficiency, Qiskit experience, background in Physics/CS/Math.",
    applyUrl: "https://www.ibm.com/quantum/careers",
  },
  {
    id: "int-google",
    company: "Google Quantum AI",
    role: "Quantum Software Engineering Intern",
    location: "Santa Barbara, CA",
    stipend: "$55 - $72 / hr",
    requirements: "Cirq experience, Linear Algebra, Python/C++, Quantum error mitigation.",
    applyUrl: "https://quantumai.google/careers",
  },
  {
    id: "int-rigetti",
    company: "Rigetti Computing",
    role: "Quantum Algorithm Engineer Intern",
    location: "Berkeley, CA / Hybrid",
    stipend: "$48 - $60 / hr",
    requirements: "PyQuil / Qiskit, OpenQASM, Optimization algorithms.",
    applyUrl: "https://www.rigetti.com/careers",
  },
];
