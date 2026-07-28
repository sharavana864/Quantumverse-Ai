import React, { useState } from "react";
import {
  Layers,
  BookOpen,
  CheckCircle2,
  Sparkles,
  Bot,
  FileText,
  ChevronRight,
  Zap,
  Gamepad2,
  Lock,
  Trophy,
  Check,
  Star,
  Flame,
  Play,
  Tv,
  Image as ImageIcon,
  Copy,
  Clock,
  ListVideo,
  Code
} from "lucide-react";
import { Module, Lesson } from "../types";

interface ModuleViewerProps {
  modules: Module[];
  selectedModuleId: string;
  onSelectModule: (id: string) => void;
  onOpenQuiz: (moduleTitle: string, lessonTitle: string) => void;
  onOpenAITutorWithTopic: (topic: string) => void;
  onOpenBlochSphere?: () => void;
  onOpenCircuitBuilder?: () => void;
  onGainXP?: (xp: number) => void;
  theme?: "dark" | "light";
}

export const ModuleViewer: React.FC<ModuleViewerProps> = ({
  modules,
  selectedModuleId,
  onSelectModule,
  onOpenQuiz,
  onOpenAITutorWithTopic,
  onGainXP,
  theme = "dark",
}) => {
  const isDark = theme === "dark";
  const [viewMode, setViewMode] = useState<"path" | "details">("details");

  const currentModule =
    modules.find((m) => m.id === selectedModuleId) || modules[0];

  const [activeLessonId, setActiveLessonId] = useState<string>(
    currentModule.lessons[0]?.id || ""
  );

  const currentLesson: Lesson =
    currentModule.lessons.find((l) => l.id === activeLessonId) ||
    currentModule.lessons[0] ||
    modules[0].lessons[0];

  // Active tab within selected lesson viewer: 'video' | 'text' | 'visuals' | 'games'
  const [activeContentTab, setActiveContentTab] = useState<
    "video" | "text" | "visuals" | "games"
  >("video");

  // Code snippet copied indicator state
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  // Interactive Game 1 State: Qubit Rotation Target Match
  const [rotationState, setRotationState] = useState<"0" | "1" | "+">("0");
  const [targetRotationState] = useState<"1" | "+">("1");
  const [game1Solved, setGame1Solved] = useState<boolean>(false);

  // Interactive Game 2 State: Superposition Amplitude Matcher
  const [alphaVal, setAlphaVal] = useState<number>(0.707);
  const [game2Solved, setGame2Solved] = useState<boolean>(false);

  const handleApplyGateToRotation = (gate: "H" | "X" | "Z") => {
    let nextState: "0" | "1" | "+" = rotationState;
    if (rotationState === "0") {
      if (gate === "X") nextState = "1";
      if (gate === "H") nextState = "+";
    } else if (rotationState === "1") {
      if (gate === "X") nextState = "0";
      if (gate === "H") nextState = "+";
    } else if (rotationState === "+") {
      if (gate === "H") nextState = "0";
      if (gate === "Z") nextState = "+";
    }
    setRotationState(nextState);

    if (nextState === targetRotationState && !game1Solved) {
      setGame1Solved(true);
      if (onGainXP) onGainXP(50);
    }
  };

  const handleSliderChange = (val: number) => {
    setAlphaVal(val);
    if (Math.abs(val - 0.707) < 0.05 && !game2Solved) {
      setGame2Solved(true);
      if (onGainXP) onGainXP(50);
    }
  };

  const handleCopyCode = (codeText: string) => {
    navigator.clipboard.writeText(codeText);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // Helper to render responsive diagram SVG graphics
  const renderVisualDiagram = (type?: string) => {
    switch (type) {
      case "bloch":
        return (
          <div className="w-full h-64 bg-slate-950/80 rounded-2xl border border-violet-500/30 p-4 flex flex-col items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-violet-900/20 via-transparent to-emerald-900/20 pointer-events-none" />
            <svg viewBox="0 0 300 200" className="w-full h-48">
              {/* Sphere Outer Rim */}
              <circle cx="150" cy="100" r="70" fill="none" stroke="#7F00FF" strokeWidth="2" strokeDasharray="4 2" />
              <ellipse cx="150" cy="100" rx="70" ry="25" fill="none" stroke="#A3FF00" strokeWidth="1.5" opacity="0.6" />
              {/* Axis lines */}
              <line x1="150" y1="20" x2="150" y2="180" stroke="#ffffff" strokeWidth="1.5" opacity="0.5" />
              <line x1="70" y1="100" x2="230" y2="100" stroke="#ffffff" strokeWidth="1.5" opacity="0.5" />
              {/* North & South Labels */}
              <text x="145" y="15" fill="#A3FF00" fontSize="12" fontWeight="bold">|0⟩ (North)</text>
              <text x="145" y="195" fill="#FF66CC" fontSize="12" fontWeight="bold">|1⟩ (South)</text>
              <text x="235" y="104" fill="#00B894" fontSize="11">|+⟩</text>
              <text x="45" y="104" fill="#00B894" fontSize="11">|-⟩</text>
              {/* Qubit State Vector Arrow */}
              <line x1="150" y1="100" x2="195" y2="55" stroke="#A3FF00" strokeWidth="3" markerEnd="url(#arrow)" />
              <circle cx="195" cy="55" r="5" fill="#A3FF00" />
              <text x="202" y="52" fill="#ffffff" fontSize="11" fontWeight="bold">|ψ⟩ State Vector</text>
            </svg>
            <div className="text-[11px] font-mono text-violet-300 mt-1">
              Polar Angle θ (Theta) & Azimuthal Angle φ (Phi)
            </div>
          </div>
        );

      case "circuit":
        return (
          <div className="w-full h-64 bg-slate-950/80 rounded-2xl border border-purple-500/30 p-4 flex flex-col justify-center relative overflow-hidden">
            <div className="text-xs font-mono font-bold text-emerald-400 mb-2 flex items-center justify-between">
              <span>QUANTUM CIRCUIT REGISTER</span>
              <span className="text-gray-400">2 Qubits • Depth 3</span>
            </div>
            <svg viewBox="0 0 320 120" className="w-full h-36">
              {/* Qubit 0 Wire */}
              <text x="10" y="40" fill="#A3FF00" fontSize="12" fontWeight="bold">q₀ |0⟩</text>
              <line x1="50" y1="36" x2="300" y2="36" stroke="#5A2A82" strokeWidth="3" />
              {/* Qubit 1 Wire */}
              <text x="10" y="90" fill="#A3FF00" fontSize="12" fontWeight="bold">q₁ |0⟩</text>
              <line x1="50" y1="86" x2="300" y2="86" stroke="#5A2A82" strokeWidth="3" />

              {/* Gate H on q0 */}
              <rect x="90" y="20" width="32" height="32" rx="6" fill="#7F00FF" stroke="#A3FF00" strokeWidth="1.5" />
              <text x="101" y="41" fill="#ffffff" fontSize="14" fontWeight="bold">H</text>

              {/* CNOT Gate (Control on q0, Target on q1) */}
              <line x1="180" y1="36" x2="180" y2="86" stroke="#A3FF00" strokeWidth="2" />
              <circle cx="180" cy="36" r="6" fill="#A3FF00" />
              <circle cx="180" cy="86" r="12" fill="#7F00FF" stroke="#A3FF00" strokeWidth="2" />
              <line x1="180" y1="78" x2="180" y2="94" stroke="#ffffff" strokeWidth="2" />
              <line x1="172" y1="86" x2="188" y2="86" stroke="#ffffff" strokeWidth="2" />

              {/* Meter Measurement on q0 and q1 */}
              <rect x="250" y="20" width="32" height="32" rx="6" fill="#1C1C1C" stroke="#FF66CC" strokeWidth="1.5" />
              <path d="M 258 42 A 10 10 0 0 1 274 42" fill="none" stroke="#FF66CC" strokeWidth="1.5" />
              <line x1="266" y1="42" x2="272" y2="30" stroke="#FF66CC" strokeWidth="1.5" />

              <rect x="250" y="70" width="32" height="32" rx="6" fill="#1C1C1C" stroke="#FF66CC" strokeWidth="1.5" />
              <path d="M 258 92 A 10 10 0 0 1 274 92" fill="none" stroke="#FF66CC" strokeWidth="1.5" />
              <line x1="266" y1="92" x2="272" y2="80" stroke="#FF66CC" strokeWidth="1.5" />
            </svg>
            <div className="text-[11px] font-mono text-center text-gray-400">
              Hadamard (H) superposition followed by CNOT entanglement
            </div>
          </div>
        );

      case "matrix":
        return (
          <div className="w-full h-64 bg-slate-950/80 rounded-2xl border border-emerald-500/30 p-4 flex flex-col justify-center items-center">
            <span className="text-xs font-mono font-bold text-emerald-400 mb-3 uppercase tracking-wider">
              Unitary Matrix Gate Transformations
            </span>
            <div className="grid grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-slate-900 p-3 rounded-xl border border-white/10 text-center">
                <span className="text-emerald-400 font-bold block mb-1">Pauli-X Matrix</span>
                <div className="text-white text-sm tracking-widest">[ 0  1 ]</div>
                <div className="text-white text-sm tracking-widest">[ 1  0 ]</div>
              </div>
              <div className="bg-slate-900 p-3 rounded-xl border border-white/10 text-center">
                <span className="text-violet-400 font-bold block mb-1">Hadamard Matrix</span>
                <div className="text-white text-xs tracking-wider">1/√2 * [ 1   1 ]</div>
                <div className="text-white text-xs tracking-wider">      [ 1  -1 ]</div>
              </div>
            </div>
            <p className="text-[11px] text-gray-400 mt-3 font-mono">
              Unitary matrices preserve vector norms: U† U = I
            </p>
          </div>
        );

      default:
        return (
          <div className="w-full h-64 bg-slate-950/80 rounded-2xl border border-violet-500/30 p-4 flex flex-col justify-center items-center text-center">
            <div className="p-3 rounded-full bg-emerald-500/20 text-emerald-400 mb-2">
              <Zap className="w-8 h-8" />
            </div>
            <h4 className="text-sm font-bold text-white">Quantum Concept Visualizer</h4>
            <p className="text-xs text-gray-400 max-w-sm mt-1 font-mono">
              Illustrating quantum states, interference wave amplitudes, and matrix gates.
            </p>
          </div>
        );
    }
  };

  return (
    <div
      className={`space-y-8 max-w-7xl mx-auto transition-colors ${
        isDark ? "text-white" : "text-slate-900"
      }`}
    >
      {/* Top Banner & Mode Toggle */}
      <div
        className={`rounded-3xl p-5 sm:p-6 shadow-xl border flex flex-col sm:flex-row items-center justify-between gap-4 transition-all ${
          isDark
            ? "bg-[#1C1C1C] border-[#7F00FF]/30 text-white"
            : "bg-white border-slate-200 text-[#1C1C1C]"
        }`}
      >
        <div className="flex items-center space-x-3">
          <div
            className={`p-3 rounded-2xl text-white shadow-lg ${
              isDark ? "bg-[#7F00FF] glow-violet" : "bg-[#333333]"
            }`}
          >
            <Zap
              className={`w-6 h-6 fill-current ${
                isDark ? "text-[#A3FF00]" : "text-[#00B894]"
              }`}
            />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-black uppercase tracking-wider">
                Quantum Learning Modules
              </h2>
              <span
                className={`text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold uppercase tracking-wider border ${
                  isDark
                    ? "bg-[#A3FF00]/10 text-[#A3FF00] border-[#A3FF00]/30"
                    : "bg-[#00B894]/10 text-[#00B894] border-[#00B894]/30"
                }`}
              >
                Multimodal Hub
              </span>
            </div>
            <p
              className={`text-xs ${
                isDark ? "text-[#C0C0C0]" : "text-slate-600"
              }`}
            >
              Video Tutorials • Textbook & Formulas • Diagrams & Images • Interactive Games
            </p>
          </div>
        </div>

        <div
          className={`flex items-center space-x-2 p-1.5 rounded-2xl border text-xs ${
            isDark ? "bg-[#121212] border-white/10" : "bg-slate-100 border-slate-200"
          }`}
        >
          <button
            onClick={() => setViewMode("details")}
            className={`px-4 py-2 rounded-xl font-bold uppercase tracking-wider transition-all flex items-center space-x-1.5 ${
              viewMode === "details"
                ? isDark
                  ? "bg-[#A3FF00] text-[#121212] shadow-md glow-lime"
                  : "bg-[#00B894] text-white shadow-md"
                : isDark
                ? "text-gray-400 hover:text-white"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Modules & Lessons</span>
          </button>
          <button
            onClick={() => setViewMode("path")}
            className={`px-4 py-2 rounded-xl font-bold uppercase tracking-wider transition-all flex items-center space-x-1.5 ${
              viewMode === "path"
                ? isDark
                  ? "bg-[#A3FF00] text-[#121212] shadow-md glow-lime"
                  : "bg-[#00B894] text-white shadow-md"
                : isDark
                ? "text-gray-400 hover:text-white"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Gamepad2 className="w-4 h-4" />
            <span>Snake Pathway</span>
          </button>
        </div>
      </div>

      {/* SNAKE PATHWAY VIEW */}
      {viewMode === "path" && (
        <div
          className={`rounded-3xl p-6 sm:p-10 shadow-2xl space-y-10 relative overflow-hidden border transition-all ${
            isDark
              ? "bg-[#1C1C1C] border-[#7F00FF]/30 text-white"
              : "bg-white border-slate-200 text-[#1C1C1C]"
          }`}
        >
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <span
              className={`text-xs font-mono font-bold uppercase tracking-widest block ${
                isDark ? "text-[#A3FF00]" : "text-[#00B894]"
              }`}
            >
              Unit 1 • Foundational Quantum Mechanics
            </span>
            <h3 className="text-2xl font-black uppercase tracking-wider">
              Quantum Computing Tree
            </h3>
            <p
              className={`text-xs ${
                isDark ? "text-[#C0C0C0]" : "text-slate-600"
              }`}
            >
              Tap any level node to open video lessons, visual diagrams, and quiz challenges.
            </p>
          </div>

          <div className="flex flex-col items-center space-y-8 relative max-w-lg mx-auto py-4">
            <div
              className={`absolute top-8 bottom-8 w-1.5 rounded-full z-0 ${
                isDark
                  ? "bg-gradient-to-b from-[#7F00FF] via-[#A3FF00] to-[#FF66CC]"
                  : "bg-gradient-to-b from-[#333333] via-[#00B894] to-[#9B59B6]"
              }`}
            />

            {modules.map((m, idx) => {
              const isCurrent = m.id === selectedModuleId;
              const isUnlocked = idx <= 6;
              const offsetClasses = [
                "translate-x-0",
                "translate-x-12 sm:translate-x-16",
                "-translate-x-12 sm:-translate-x-16",
                "translate-x-12 sm:translate-x-16",
                "-translate-x-12 sm:-translate-x-16",
                "translate-x-0",
                "translate-x-12 sm:translate-x-16",
              ];

              return (
                <div
                  key={m.id}
                  className={`relative z-10 flex flex-col items-center space-y-2 transition-all ${
                    offsetClasses[idx % offsetClasses.length]
                  }`}
                >
                  <button
                    onClick={() => {
                      onSelectModule(m.id);
                      setActiveLessonId(m.lessons[0]?.id || "");
                      setViewMode("details");
                    }}
                    className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center shadow-2xl transition-all border-4 relative active:scale-95 ${
                      isCurrent
                        ? isDark
                          ? "bg-[#A3FF00] border-white text-[#121212] ring-8 ring-[#A3FF00]/30 glow-lime animate-pulse"
                          : "bg-[#00B894] border-white text-white ring-8 ring-[#00B894]/30 shadow-lg"
                        : isUnlocked
                        ? isDark
                          ? "bg-[#7F00FF] border-[#FF66CC]/40 text-white hover:scale-105 hover:border-[#A3FF00] glow-violet"
                          : "bg-[#333333] border-[#00B894]/40 text-white hover:scale-105 hover:border-[#00B894]"
                        : isDark
                        ? "bg-[#121212] border-white/10 text-gray-600 opacity-60 cursor-not-allowed"
                        : "bg-slate-200 border-slate-300 text-slate-400 opacity-60 cursor-not-allowed"
                    }`}
                  >
                    {isUnlocked ? (
                      <div className="text-center">
                        <span className="font-black text-sm sm:text-base font-mono block">
                          {idx + 1}
                        </span>
                        <div className="flex justify-center space-x-0.5 text-[#FFC312] mt-0.5">
                          <Star className="w-2.5 h-2.5 fill-current" />
                          <Star className="w-2.5 h-2.5 fill-current" />
                          <Star className="w-2.5 h-2.5 fill-current" />
                        </div>
                      </div>
                    ) : (
                      <Lock className="w-6 h-6 text-gray-500" />
                    )}

                    {isCurrent && (
                      <div className="absolute -top-3 -right-2 bg-[#FFC312] text-slate-950 p-1 rounded-full text-[10px] font-bold shadow-lg">
                        <Flame className="w-3.5 h-3.5 fill-slate-950" />
                      </div>
                    )}
                  </button>

                  <div className="text-center max-w-[140px]">
                    <span className="font-bold text-xs block leading-tight">
                      {m.title}
                    </span>
                    <span
                      className={`text-[10px] font-mono font-bold ${
                        isDark ? "text-[#A3FF00]" : "text-[#00B894]"
                      }`}
                    >
                      +{m.lessons.length * 50} XP
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* MODULE SELECTOR GRID & LESSON DETAIL VIEW */}
      {viewMode === "details" && (
        <div className="space-y-8">
          {/* Module Selector Buttons Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
            {modules.map((m, index) => {
              const isSelected = m.id === currentModule.id;
              return (
                <button
                  key={m.id}
                  onClick={() => {
                    onSelectModule(m.id);
                    setActiveLessonId(m.lessons[0]?.id || "");
                  }}
                  className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                    isSelected
                      ? "bg-[#5A2A82] border-purple-400 text-white shadow-xl scale-102 ring-2 ring-purple-400/40"
                      : isDark
                      ? "bg-[#2A2A2A] border-white/10 text-gray-300 hover:bg-white/5"
                      : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <div>
                    <span className="text-[10px] font-mono font-bold text-emerald-500 block uppercase">
                      Module {index + 1}
                    </span>
                    <span className="font-bold text-xs line-clamp-2 mt-1">
                      {m.title}
                    </span>
                  </div>
                  <span
                    className={`text-[10px] font-mono mt-3 block ${
                      isDark ? "text-gray-400" : "text-slate-500"
                    }`}
                  >
                    {m.lessons.length} Lessons • {m.difficulty}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Selected Module Workspace */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Sidebar: Lesson List for Module */}
            <div
              className={`lg:col-span-4 rounded-2xl p-6 space-y-4 border transition-all ${
                isDark ? "bg-[#2A2A2A] border-white/10" : "bg-white border-slate-200"
              }`}
            >
              <div
                className={`border-b pb-3 ${
                  isDark ? "border-white/10" : "border-slate-200"
                }`}
              >
                <span className="text-xs font-bold text-emerald-500 uppercase tracking-wider block">
                  Curriculum Syllabus
                </span>
                <h3
                  className={`text-base font-bold mt-1 ${
                    isDark ? "text-white" : "text-slate-900"
                  }`}
                >
                  {currentModule.title}
                </h3>
                <p
                  className={`text-xs mt-0.5 ${
                    isDark ? "text-gray-400" : "text-slate-600"
                  }`}
                >
                  {currentModule.description}
                </p>
              </div>

              <div className="space-y-2">
                {currentModule.lessons.map((lesson, idx) => {
                  const isActive = lesson.id === currentLesson.id;
                  return (
                    <button
                      key={lesson.id}
                      onClick={() => setActiveLessonId(lesson.id)}
                      className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-center justify-between ${
                        isActive
                          ? "bg-gradient-to-r from-[#5A2A82] to-purple-800 border-purple-400 text-white shadow-lg"
                          : isDark
                          ? "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10"
                          : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-500 flex items-center justify-center font-mono font-bold text-[11px]">
                          {idx + 1}
                        </span>
                        <div>
                          <span className="font-bold block">{lesson.title}</span>
                          <span
                            className={`text-[10px] font-mono ${
                              isDark ? "text-gray-400" : "text-slate-500"
                            }`}
                          >
                            {lesson.duration}
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </button>
                  );
                })}
              </div>

              {/* Module Flashcard / Quiz CTA */}
              <div
                className={`p-4 rounded-xl border space-y-3 ${
                  isDark
                    ? "bg-gradient-to-br from-[#7F00FF]/20 to-emerald-900/20 border-[#7F00FF]/30"
                    : "bg-purple-50 border-purple-200"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center space-x-1">
                    <Trophy className="w-4 h-4 text-amber-400" />
                    <span>Module Milestone</span>
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500 text-slate-950 font-bold">
                    +50 XP
                  </span>
                </div>
                <p className={`text-xs ${isDark ? "text-gray-300" : "text-slate-700"}`}>
                  Complete video, text reading, and quiz questions to earn your quantum badge.
                </p>
                <button
                  onClick={() =>
                    onOpenQuiz(currentModule.title, currentLesson.title)
                  }
                  className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg flex items-center justify-center space-x-2"
                >
                  <Sparkles className="w-4 h-4 text-slate-950" />
                  <span>Launch Module Quiz</span>
                </button>
              </div>
            </div>

            {/* Right Main Content: Multimodal Lesson Hub */}
            <div
              className={`lg:col-span-8 rounded-2xl p-6 space-y-6 border transition-all ${
                isDark ? "bg-[#2A2A2A] border-white/10" : "bg-white border-slate-200"
              }`}
            >
              {/* Header Info & Actions */}
              <div
                className={`flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b gap-4 ${
                  isDark ? "border-white/10" : "border-slate-200"
                }`}
              >
                <div>
                  <div className="flex items-center space-x-2">
                    <BookOpen className="w-5 h-5 text-emerald-500" />
                    <h2
                      className={`text-lg font-bold ${
                        isDark ? "text-white" : "text-slate-900"
                      }`}
                    >
                      {currentLesson.title}
                    </h2>
                  </div>
                  <div className="flex items-center space-x-3 mt-1">
                    <span
                      className={`text-xs font-mono flex items-center space-x-1 ${
                        isDark ? "text-gray-400" : "text-slate-500"
                      }`}
                    >
                      <Clock className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Est. {currentLesson.duration}</span>
                    </span>
                    <span className="text-gray-500">•</span>
                    <span className="text-xs font-mono font-bold text-amber-400">
                      +50 XP Reward
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    onClick={() =>
                      onOpenAITutorWithTopic(currentLesson.title)
                    }
                    className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-[#5A2A82] to-purple-800 text-white text-xs font-semibold border border-purple-400/30 shadow"
                  >
                    <Bot className="w-4 h-4 text-emerald-300" />
                    <span>Ask AI Tutor</span>
                  </button>

                  <button
                    onClick={() =>
                      onOpenQuiz(currentModule.title, currentLesson.title)
                    }
                    className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20"
                  >
                    <Sparkles className="w-4 h-4 text-slate-950" />
                    <span>Take Quiz</span>
                  </button>
                </div>
              </div>

              {/* Multimodal Content Switcher Tabs */}
              <div
                className={`flex items-center space-x-2 p-1.5 rounded-xl border text-xs overflow-x-auto ${
                  isDark
                    ? "bg-[#1E1E1E] border-white/10"
                    : "bg-slate-100 border-slate-200"
                }`}
              >
                <button
                  onClick={() => setActiveContentTab("video")}
                  className={`px-3.5 py-2 rounded-lg font-bold flex items-center space-x-1.5 whitespace-nowrap transition-all ${
                    activeContentTab === "video"
                      ? "bg-purple-600 text-white shadow-md"
                      : isDark
                      ? "text-gray-400 hover:text-white"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <Tv className="w-4 h-4 text-emerald-300" />
                  <span>Video Lesson</span>
                </button>

                <button
                  onClick={() => setActiveContentTab("text")}
                  className={`px-3.5 py-2 rounded-lg font-bold flex items-center space-x-1.5 whitespace-nowrap transition-all ${
                    activeContentTab === "text"
                      ? "bg-purple-600 text-white shadow-md"
                      : isDark
                      ? "text-gray-400 hover:text-white"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <FileText className="w-4 h-4 text-emerald-300" />
                  <span>Textbook & Math</span>
                </button>

                <button
                  onClick={() => setActiveContentTab("visuals")}
                  className={`px-3.5 py-2 rounded-lg flex items-center space-x-1.5 whitespace-nowrap font-bold transition-all ${
                    activeContentTab === "visuals"
                      ? "bg-purple-600 text-white shadow-md"
                      : isDark
                      ? "text-gray-400 hover:text-white"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <ImageIcon className="w-4 h-4 text-emerald-300" />
                  <span>Visual Diagrams</span>
                </button>

                <button
                  onClick={() => setActiveContentTab("games")}
                  className={`px-3.5 py-2 rounded-lg flex items-center space-x-1.5 whitespace-nowrap font-bold transition-all ${
                    activeContentTab === "games"
                      ? "bg-purple-600 text-white shadow-md"
                      : isDark
                      ? "text-gray-400 hover:text-white"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <Gamepad2 className="w-4 h-4 text-emerald-300" />
                  <span>Interactive Games</span>
                </button>
              </div>

              {/* TAB 1: VIDEO LESSON PLAYER & TRANSCRIPT */}
              {activeContentTab === "video" && (
                <div className="space-y-6 animate-in fade-in">
                  <div className="rounded-2xl overflow-hidden border border-purple-500/30 bg-black aspect-video relative shadow-2xl">
                    {currentLesson.videoUrl ? (
                      <iframe
                        src={currentLesson.videoUrl}
                        title={currentLesson.videoTitle || currentLesson.title}
                        className="w-full h-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center space-y-3 bg-slate-950">
                        <Play className="w-12 h-12 text-emerald-400 animate-pulse" />
                        <h3 className="font-bold text-white text-base">
                          {currentLesson.videoTitle || currentLesson.title}
                        </h3>
                        <p className="text-xs text-gray-400 max-w-md">
                          Video lecture stream loaded for quantum theory module.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Video Chapters & Transcript */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    {/* Chapters */}
                    {currentLesson.videoChapters && currentLesson.videoChapters.length > 0 && (
                      <div
                        className={`md:col-span-5 rounded-xl p-4 border space-y-2 ${
                          isDark ? "bg-black/30 border-white/10" : "bg-slate-50 border-slate-200"
                        }`}
                      >
                        <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block flex items-center space-x-1.5">
                          <ListVideo className="w-4 h-4" />
                          <span>Video Timestamps</span>
                        </span>
                        <div className="space-y-1.5 text-xs">
                          {currentLesson.videoChapters.map((chap, i) => (
                            <div
                              key={i}
                              className={`p-2 rounded-lg flex items-center justify-between font-mono ${
                                isDark ? "bg-white/5 text-gray-300" : "bg-white text-slate-700"
                              }`}
                            >
                              <span className="text-emerald-400 font-bold">{chap.time}</span>
                              <span className="truncate ml-2">{chap.title}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Transcript Box */}
                    <div
                      className={`rounded-xl p-4 border space-y-2 ${
                        currentLesson.videoChapters && currentLesson.videoChapters.length > 0
                          ? "md:col-span-7"
                          : "md:col-span-12"
                      } ${
                        isDark ? "bg-black/30 border-white/10" : "bg-slate-50 border-slate-200"
                      }`}
                    >
                      <span className="text-xs font-bold text-purple-400 uppercase tracking-wider block flex items-center space-x-1.5">
                        <FileText className="w-4 h-4" />
                        <span>Lecture Transcript</span>
                      </span>
                      <p
                        className={`text-xs leading-relaxed font-mono ${
                          isDark ? "text-gray-300" : "text-slate-700"
                        }`}
                      >
                        {currentLesson.videoTranscript ||
                          currentLesson.summary}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: TEXTBOOK & MATHEMATICAL FORMULAS */}
              {activeContentTab === "text" && (
                <div className="space-y-6 animate-in fade-in">
                  {/* Detailed Reading Text */}
                  <div
                    className={`p-5 rounded-2xl border space-y-3 ${
                      isDark ? "bg-black/30 border-white/10" : "bg-slate-50 border-slate-200"
                    }`}
                  >
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block flex items-center space-x-2">
                      <BookOpen className="w-4 h-4" />
                      <span>Comprehensive Textbook Reading</span>
                    </span>
                    <p
                      className={`text-xs leading-relaxed whitespace-pre-line ${
                        isDark ? "text-gray-200" : "text-slate-800"
                      }`}
                    >
                      {currentLesson.fullTextContent || currentLesson.summary}
                    </p>
                  </div>

                  {/* Mathematical Formulas & Matrix Box */}
                  {(currentLesson.formulaLatex || currentLesson.matrixNotation) && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {currentLesson.formulaLatex && (
                        <div
                          className={`p-4 rounded-xl border space-y-2 ${
                            isDark
                              ? "bg-slate-950 border-emerald-500/30"
                              : "bg-emerald-50 border-emerald-200"
                          }`}
                        >
                          <span className="text-xs font-mono font-bold text-emerald-400 uppercase block">
                            Quantum State Formula
                          </span>
                          <div className="p-3 rounded-lg bg-black/60 text-emerald-300 font-mono text-xs overflow-x-auto">
                            <code>{currentLesson.formulaLatex}</code>
                          </div>
                        </div>
                      )}

                      {currentLesson.matrixNotation && (
                        <div
                          className={`p-4 rounded-xl border space-y-2 ${
                            isDark
                              ? "bg-slate-950 border-violet-500/30"
                              : "bg-purple-50 border-purple-200"
                          }`}
                        >
                          <span className="text-xs font-mono font-bold text-violet-400 uppercase block">
                            Unitary Matrix & Vector Notation
                          </span>
                          <div className="p-3 rounded-lg bg-black/60 text-violet-300 font-mono text-xs overflow-x-auto">
                            <code>{currentLesson.matrixNotation}</code>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Qiskit Python Code Example */}
                  {currentLesson.starterCode && (
                    <div
                      className={`rounded-2xl border p-4 space-y-3 ${
                        isDark ? "bg-slate-950 border-white/10" : "bg-slate-900 border-slate-800"
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-emerald-400 font-bold flex items-center space-x-1.5">
                          <Code className="w-4 h-4" />
                          <span>Qiskit Python Simulation Snippet</span>
                        </span>
                        <button
                          onClick={() => handleCopyCode(currentLesson.starterCode!)}
                          className="px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-gray-200 flex items-center space-x-1 transition"
                        >
                          {copiedCode ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                          <span>{copiedCode ? "Copied!" : "Copy"}</span>
                        </button>
                      </div>
                      <pre className="p-3 rounded-xl bg-black text-gray-200 text-xs font-mono overflow-x-auto">
                        <code>{currentLesson.starterCode}</code>
                      </pre>
                    </div>
                  )}

                  {/* Key Technical Takeaways */}
                  <div className="space-y-3">
                    <span
                      className={`text-xs font-bold uppercase tracking-wider block ${
                        isDark ? "text-gray-300" : "text-slate-600"
                      }`}
                    >
                      Key Technical Takeaways
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {currentLesson.keyConcepts.map((concept, idx) => (
                        <div
                          key={idx}
                          className={`p-3 rounded-xl border text-xs flex items-start space-x-2 ${
                            isDark
                              ? "bg-white/5 border-white/10 text-gray-200"
                              : "bg-slate-50 border-slate-200 text-slate-800"
                          }`}
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{concept}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: VISUAL DIAGRAMS & IMAGES */}
              {activeContentTab === "visuals" && (
                <div className="space-y-6 animate-in fade-in">
                  {/* Dynamic SVG Diagram */}
                  {renderVisualDiagram(currentLesson.diagramType)}

                  {/* High Quality Concept Image & Caption */}
                  {currentLesson.imageUrl && (
                    <div
                      className={`rounded-2xl border overflow-hidden p-4 space-y-3 ${
                        isDark ? "bg-black/30 border-white/10" : "bg-slate-50 border-slate-200"
                      }`}
                    >
                      <div className="rounded-xl overflow-hidden max-h-72 border border-white/10 relative">
                        <img
                          src={currentLesson.imageUrl}
                          alt={currentLesson.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {currentLesson.imageCaption && (
                        <p className="text-xs text-center font-mono text-gray-400">
                          {currentLesson.imageCaption}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 4: INTERACTIVE GAMES & PUZZLES */}
              {activeContentTab === "games" && (
                <div className="space-y-6 animate-in fade-in">
                  {/* Game 1: Qubit Vector Rotator Puzzle */}
                  <div
                    className={`rounded-2xl p-5 space-y-4 border ${
                      isDark
                        ? "bg-black/40 border-purple-500/30"
                        : "bg-slate-50 border-purple-200"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase block">
                          Interactive Challenge 1
                        </span>
                        <h4
                          className={`font-bold text-sm ${
                            isDark ? "text-white" : "text-slate-900"
                          }`}
                        >
                          State Vector Target Rotation
                        </h4>
                      </div>
                      <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-purple-900 text-purple-200">
                        +50 XP
                      </span>
                    </div>

                    <p
                      className={`text-xs ${
                        isDark ? "text-gray-300" : "text-slate-600"
                      }`}
                    >
                      Apply standard quantum gates (X, H, Z) to rotate initial qubit state{" "}
                      <code className="text-emerald-400 font-mono font-bold">|0⟩</code>{" "}
                      to match target state{" "}
                      <code className="text-amber-400 font-mono font-bold">
                        |{targetRotationState}⟩
                      </code>.
                    </p>

                    <div
                      className={`p-4 rounded-xl border space-y-3 text-center ${
                        isDark
                          ? "bg-[#1E1E1E] border-white/10"
                          : "bg-white border-slate-200"
                      }`}
                    >
                      <div className="flex justify-around text-xs font-mono font-bold">
                        <div>
                          <span
                            className={`block text-[10px] ${
                              isDark ? "text-gray-400" : "text-slate-500"
                            }`}
                          >
                            CURRENT STATE
                          </span>
                          <span className="text-emerald-400 text-lg">
                            |{rotationState}⟩
                          </span>
                        </div>
                        <div
                          className={`h-8 w-px ${
                            isDark ? "bg-white/20" : "bg-slate-200"
                          }`}
                        />
                        <div>
                          <span
                            className={`block text-[10px] ${
                              isDark ? "text-gray-400" : "text-slate-500"
                            }`}
                          >
                            TARGET STATE
                          </span>
                          <span className="text-amber-400 text-lg">
                            |{targetRotationState}⟩
                          </span>
                        </div>
                      </div>

                      <div className="flex justify-center space-x-2 pt-2">
                        <button
                          onClick={() => handleApplyGateToRotation("X")}
                          className="px-4 py-2 rounded-xl bg-purple-800 hover:bg-purple-700 text-white font-mono font-bold text-xs"
                        >
                          Pauli-X Gate
                        </button>
                        <button
                          onClick={() => handleApplyGateToRotation("H")}
                          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono font-bold text-xs"
                        >
                          Hadamard (H)
                        </button>
                      </div>

                      {game1Solved && (
                        <div className="p-2.5 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-bold flex items-center justify-center space-x-1.5">
                          <Check className="w-4 h-4 text-emerald-400" />
                          <span>Target Matched! Earned +50 XP!</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Game 2: Superposition Amplitude Matcher */}
                  <div
                    className={`rounded-2xl p-5 space-y-4 border ${
                      isDark
                        ? "bg-black/40 border-emerald-500/30"
                        : "bg-slate-50 border-emerald-200"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase block">
                          Interactive Challenge 2
                        </span>
                        <h4
                          className={`font-bold text-sm ${
                            isDark ? "text-white" : "text-slate-900"
                          }`}
                        >
                          Equal Superposition Amplitude Matcher
                        </h4>
                      </div>
                      <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-emerald-950 text-emerald-300">
                        +50 XP
                      </span>
                    </div>

                    <p
                      className={`text-xs ${
                        isDark ? "text-gray-300" : "text-slate-600"
                      }`}
                    >
                      Adjust amplitude{" "}
                      <code className="text-emerald-400 font-mono font-bold">α</code>{" "}
                      so that{" "}
                      <code className="text-amber-400 font-mono font-bold">
                        |α|² = 0.5
                      </code>{" "}
                      (Equal 50/50 probability superposition).
                    </p>

                    <div
                      className={`p-4 rounded-xl border space-y-3 ${
                        isDark
                          ? "bg-[#1E1E1E] border-white/10"
                          : "bg-white border-slate-200"
                      }`}
                    >
                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between font-mono">
                          <span
                            className={
                              isDark ? "text-gray-300" : "text-slate-600"
                            }
                          >
                            Alpha Amplitude (α):
                          </span>
                          <span className="text-emerald-400 font-bold">
                            {alphaVal.toFixed(3)}
                          </span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.01"
                          value={alphaVal}
                          onChange={(e) =>
                            handleSliderChange(parseFloat(e.target.value))
                          }
                          className="w-full accent-emerald-500"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-center pt-1">
                        <div
                          className={`p-2 rounded ${
                            isDark ? "bg-white/5" : "bg-slate-100"
                          }`}
                        >
                          <span
                            className={`block text-[9px] ${
                              isDark ? "text-gray-400" : "text-slate-500"
                            }`}
                          >
                            P(|0⟩) = |α|²
                          </span>
                          <span className="text-emerald-400 font-bold">
                            {(alphaVal * alphaVal * 100).toFixed(1)}%
                          </span>
                        </div>
                        <div
                          className={`p-2 rounded ${
                            isDark ? "bg-white/5" : "bg-slate-100"
                          }`}
                        >
                          <span
                            className={`block text-[9px] ${
                              isDark ? "text-gray-400" : "text-slate-500"
                            }`}
                          >
                            P(|1⟩) = 1 - |α|²
                          </span>
                          <span className="text-purple-400 font-bold">
                            {((1 - alphaVal * alphaVal) * 100).toFixed(1)}%
                          </span>
                        </div>
                      </div>

                      {game2Solved && (
                        <div className="p-2.5 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-bold flex items-center justify-center space-x-1.5">
                          <Check className="w-4 h-4 text-emerald-400" />
                          <span>Balanced Superposition Achieved! Earned +50 XP!</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
