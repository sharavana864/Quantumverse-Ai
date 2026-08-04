# QuantumVerse AI ⚛️🤖

An interactive, AI-powered learning platform designed to make **Quantum Computing** intuitive, practical, and engaging. QuantumVerse AI combines interactive quantum circuit builders, 3D Bloch sphere state visualizers, adaptive learning roadmaps, hands-on Qiskit code playgrounds, real-time AI tutoring powered by Gemini, and progress tracking with Firebase.

---

## 🌟 Key Features

### ⚛️ 1. Interactive Bloch Sphere Visualizer
- Dynamic 3D geometric visualization of single qubit states $|ψ⟩ = \cos(\theta/2)|0⟩ + e^{i\phi}\sin(\theta/2)|1⟩$.
- Apply core quantum gates ($H, X, Y, Z, S, T$) and witness instant state vector rotations on the sphere.
- Real-time probability amplitude and phase calculations.

### 🔌 2. Drag & Drop Quantum Circuit Builder
- Design multi-qubit quantum circuits visually.
- Support for Single-Qubit Gates ($H, X, Y, Z, S, T$) and Multi-Qubit Control Gates ($CNOT, CZ, SWAP$).
- Interactive measurement simulation showing probability distribution histograms ($|00⟩, |01⟩, |10⟩, |11⟩$).

### 🎓 3. Adaptive Learning Paths & Skill Modules
- Structured modules covering Quantum Fundamentals, Superposition, Entanglement, Quantum Algorithms (Grover's, Shor's, VQE), and Hardware Implementations.
- Interactive quizzes and progress tracking.

### 🤖 4. AI Quantum Tutor (Gemini Powered)
- Instant step-by-step mathematical breakdowns and conceptual explanations tailored to your skill level.
- Context-aware answers with Dirac notation ($|0⟩, |1⟩, |ψ⟩$) and Qiskit code examples.
- Smart fallback engine ensuring uninterrupted learning even offline.

### 💻 5. Python & Qiskit Coding Playground
- Write and execute Python scripts using Qiskit syntax directly in the browser.
- Run simulations for Bell state entanglement, Grover's search, and Quantum Teleportation.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS, Lucide Icons, Motion (Framer Motion)
- **Backend**: Node.js, Express, ESBuild
- **AI Integration**: Google Gemini API (`@google/genai`)
- **Database & Auth**: Firebase Firestore & Firebase Auth
- **Analytics**: Vercel Analytics
- **Build Tool**: Vite, TSX

---

## 🚀 Getting Started

### 1. Prerequisites
Ensure you have Node.js (v18+ or higher) installed on your system.

### 2. Installation
Clone the repository and install dependencies:

```bash
git clone https://github.com/your-username/quantumverse-ai.git
cd quantumverse-ai
npm install
```

### 3. Environment Setup
Copy `.env.example` to `.env` or configure your environment variables:

```env
# Server-side Gemini API Key
GEMINI_API_KEY=your_gemini_api_key_here

# Firebase Configuration (If using Firebase integration)
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
```

### 4. Running the Application locally

Start the Express + Vite server in development mode:

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:3000`.

---

## 📦 Scripts Overview

- `npm run dev`: Starts the development server using `tsx` and Express with Vite middleware.
- `npm run build`: Bundles client-side assets via Vite and compiles `server.ts` into a production-ready CJS bundle (`dist/server.cjs`) using `esbuild`.
- `npm run start`: Launches the compiled production server (`node dist/server.cjs`).
- `npm run lint`: Runs TypeScript type checks.

---

## 📁 Project Structure

```text
├── src/
│   ├── components/         # UI Components (BlochSphere, CircuitBuilder, AITutorModal, etc.)
│   ├── lib/                # Utility helpers & Firebase integration
│   ├── types/              # TypeScript type definitions
│   ├── App.tsx             # Main Application routing and view state
│   └── main.tsx            # App entry point
├── server.ts               # Express backend & Gemini AI API proxy routes
├── metadata.json           # Application capabilities and permissions metadata
├── firebase-applet-config.json # Firebase configuration setup
├── package.json            # Dependencies and npm scripts
└── README.md               # Project documentation
```

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
