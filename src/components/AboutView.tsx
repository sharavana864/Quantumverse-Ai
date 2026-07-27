import React from "react";
import {
  Atom,
  Flame,
  Zap,
  Bot,
  Code2,
  Workflow,
  Sparkles,
  BookOpen,
  CheckCircle2,
  Calendar,
  Layers,
  Cpu,
  Info,
  ShieldCheck,
  User
} from "lucide-react";
import { Link } from "react-router-dom";

interface AboutViewProps {
  theme?: "dark" | "light";
}

export const AboutView: React.FC<AboutViewProps> = ({ theme = "dark" }) => {
  const isDark = theme === "dark";

  return (
    <div className={`max-w-5xl mx-auto space-y-8 pb-12 transition-colors ${isDark ? "text-white" : "text-slate-800"}`}>
      {/* Hero Title Section */}
      <div className={`rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden text-center sm:text-left border transition-all ${
        isDark
          ? "bg-[#1C1C1C] border-[#7F00FF]/40"
          : "bg-slate-900 border-slate-700 text-white"
      }`}>
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#7F00FF]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-[#A3FF00]/10 text-[#A3FF00] border border-[#A3FF00]/30 text-xs font-mono font-black uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#A3FF00]" />
            <span>Interactive Quantum Ecosystem • Version 1.0</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight text-white uppercase">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A3FF00] via-[#FF66CC] to-[#7F00FF]">QuantumVerse AI</span>
          </h1>

          <p className="text-sm sm:text-base text-[#C0C0C0] leading-relaxed">
            QuantumVerse AI is an interactive, gamified learning platform designed to make quantum computing intuitive, hands-on, and accessible to everyone. From fundamental qubit superposition to real Qiskit circuit execution and 3D Bloch sphere vector rotations, learn at your own pace.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link
              to="/learn"
              className="px-6 py-3 rounded-2xl bg-[#A3FF00] text-[#121212] hover:bg-[#8ee600] font-black text-xs sm:text-sm uppercase tracking-wider shadow-xl glow-lime transition-all flex items-center space-x-2 active:scale-95"
            >
              <Zap className="w-4 h-4 fill-[#121212]" />
              <span>Explore Quantum Path</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Mission & Key Pillars */}
      <div className="space-y-6">
        <h2 className={`text-2xl font-extrabold uppercase tracking-wider border-b pb-3 ${isDark ? "border-white/10 text-white" : "border-slate-200 text-slate-900"}`}>
          Core Platform Pillars
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className={`rounded-3xl p-6 space-y-3 border transition-all ${
            isDark ? "bg-[#1C1C1C] border-[#7F00FF]/30" : "bg-white border-slate-200 shadow-md"
          }`}>
            <div className="w-10 h-10 rounded-2xl bg-[#7F00FF]/20 border border-[#7F00FF]/40 flex items-center justify-center text-[#A3FF00]">
              <Flame className="w-5 h-5 text-[#FFC312] fill-[#FFC312]" />
            </div>
            <h3 className={`text-base font-extrabold uppercase tracking-wider ${isDark ? "text-white" : "text-slate-900"}`}>
              Gamified Duolingo-Style Tree
            </h3>
            <p className={`text-xs leading-relaxed ${isDark ? "text-[#C0C0C0]" : "text-slate-600"}`}>
              Progress node-by-node through structured quantum modules. Track daily coherence streaks, earn XP, unlock achievements, and practice interactive gate puzzles.
            </p>
          </div>

          <div className={`rounded-3xl p-6 space-y-3 border transition-all ${
            isDark ? "bg-[#1C1C1C] border-[#7F00FF]/30" : "bg-white border-slate-200 shadow-md"
          }`}>
            <div className="w-10 h-10 rounded-2xl bg-[#A3FF00]/20 border border-[#A3FF00]/40 flex items-center justify-center text-[#A3FF00]">
              <Atom className="w-5 h-5 text-[#A3FF00]" />
            </div>
            <h3 className={`text-base font-extrabold uppercase tracking-wider ${isDark ? "text-white" : "text-slate-900"}`}>
              3D Bloch Sphere Vector Rotator
            </h3>
            <p className={`text-xs leading-relaxed ${isDark ? "text-[#C0C0C0]" : "text-slate-600"}`}>
              Observe state vector transformations on the unit sphere in real time. Apply Pauli X, Y, Z, Hadamard, and Phase gates to visualize quantum state amplitudes.
            </p>
          </div>

          <div className={`rounded-3xl p-6 space-y-3 border transition-all ${
            isDark ? "bg-[#1C1C1C] border-[#7F00FF]/30" : "bg-white border-slate-200 shadow-md"
          }`}>
            <div className="w-10 h-10 rounded-2xl bg-[#FF66CC]/20 border border-[#FF66CC]/40 flex items-center justify-center text-[#FF66CC]">
              <Code2 className="w-5 h-5 text-[#FF66CC]" />
            </div>
            <h3 className={`text-base font-extrabold uppercase tracking-wider ${isDark ? "text-white" : "text-slate-900"}`}>
              Qiskit & Cirq Playground
            </h3>
            <p className={`text-xs leading-relaxed ${isDark ? "text-[#C0C0C0]" : "text-slate-600"}`}>
              Write, debug, and simulate Python Qiskit code directly in your browser. Inspect state vectors and probability distributions with simulated quantum measurement shots.
            </p>
          </div>

          <div className={`rounded-3xl p-6 space-y-3 border transition-all ${
            isDark ? "bg-[#1C1C1C] border-[#7F00FF]/30" : "bg-white border-slate-200 shadow-md"
          }`}>
            <div className="w-10 h-10 rounded-2xl bg-[#7F00FF]/20 border border-[#7F00FF]/40 flex items-center justify-center text-purple-300">
              <Bot className="w-5 h-5 text-[#A3FF00]" />
            </div>
            <h3 className={`text-base font-extrabold uppercase tracking-wider ${isDark ? "text-white" : "text-slate-900"}`}>
              AI Voice & Text Quantum Tutor
            </h3>
            <p className={`text-xs leading-relaxed ${isDark ? "text-[#C0C0C0]" : "text-slate-600"}`}>
              Get immediate conceptual clarification on Dirac bra-ket notation, quantum entanglement, Shor's algorithm, and quantum error correction from Google Gemini AI.
            </p>
          </div>
        </div>
      </div>

      {/* Curriculum Architecture */}
      <div className={`rounded-3xl p-6 sm:p-8 space-y-6 border transition-all ${
        isDark ? "bg-[#1C1C1C] border-[#7F00FF]/30" : "bg-white border-slate-200 shadow-lg"
      }`}>
        <h2 className={`text-xl font-extrabold uppercase tracking-wider flex items-center space-x-2 ${isDark ? "text-white" : "text-slate-900"}`}>
          <BookOpen className={`w-5 h-5 ${isDark ? "text-[#A3FF00]" : "text-[#00B894]"}`} />
          <span>Curriculum Modules</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          {[
            { mod: "Module 1", title: "Bits to Qubits", desc: "Binary vs state vectors, Dirac bra-ket notation." },
            { mod: "Module 2", title: "Bloch Sphere Geometry", desc: "Angles θ, φ, pure vs mixed quantum states." },
            { mod: "Module 3", title: "Quantum Superposition", desc: "Hadamard gate transforms & Born rule probabilities." },
            { mod: "Module 4", title: "Quantum Entanglement", desc: "Bell state pairs, EPR paradox & non-locality." },
            { mod: "Module 5", title: "Gates & Matrix Math", desc: "Single-qubit & CNOT two-qubit unitary operations." },
            { mod: "Modules 6 & 7", title: "Algorithms & Teleportation", desc: "Grover search, Shor's algorithm & quantum communication." },
          ].map((item, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-2xl border space-y-1 ${
                isDark ? "bg-[#121212] border-white/10" : "bg-slate-50 border-slate-200"
              }`}
            >
              <span className={`font-black font-mono text-xs uppercase ${isDark ? "text-[#A3FF00]" : "text-[#00B894]"}`}>{item.mod}</span>
              <p className={`font-extrabold ${isDark ? "text-white" : "text-slate-900"}`}>{item.title}</p>
              <p className={`text-[11px] ${isDark ? "text-[#C0C0C0]" : "text-slate-600"}`}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Info: Date & Version */}
      <div className={`rounded-3xl p-6 border space-y-4 text-center transition-all ${
        isDark ? "bg-[#121212] border-white/10" : "bg-slate-100 border-slate-200"
      }`}>
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono font-bold">
          <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-[#A3FF00]/10 text-[#A3FF00] border border-[#A3FF00]/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Version 1.0</span>
          </div>

          <div className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full border ${
            isDark ? "bg-white/5 border-white/10 text-[#C0C0C0]" : "bg-white border-slate-200 text-slate-700"
          }`}>
            <Calendar className="w-3.5 h-3.5 text-[#FF66CC]" />
            <span>Release Date: July 27, 2026</span>
          </div>
        </div>

        <div className={`pt-3 border-t text-xs space-y-1 ${isDark ? "border-white/10 text-[#C0C0C0]" : "border-slate-200 text-slate-600"}`}>
          <p className="font-semibold uppercase tracking-wider">QuantumVerse AI Ecosystem • Gamified Quantum Learning</p>
          <p className="text-[11px] font-mono font-black text-[#FF66CC] uppercase tracking-widest">
            Empowering the Next Generation of Quantum Pioneers
          </p>
        </div>
      </div>
    </div>
  );
};
