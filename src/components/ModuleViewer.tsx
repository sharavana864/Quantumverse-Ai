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
  Flame
} from "lucide-react";
import { Module, Lesson } from "../types";

interface ModuleViewerProps {
  modules: Module[];
  selectedModuleId: string;
  onSelectModule: (id: string) => void;
  onOpenQuiz: (moduleTitle: string, lessonTitle: string) => void;
  onOpenAITutorWithTopic: (topic: string) => void;
  onOpenBlochSphere: () => void;
  onOpenCircuitBuilder: () => void;
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
  const [viewMode, setViewMode] = useState<"path" | "details">("path");

  const currentModule =
    modules.find((m) => m.id === selectedModuleId) || modules[0];

  const [activeLessonId, setActiveLessonId] = useState<string>(
    currentModule.lessons[0]?.id || ""
  );

  const currentLesson =
    currentModule.lessons.find((l) => l.id === activeLessonId) ||
    currentModule.lessons[0];

  // Interactive Game 1 State: Qubit Rotation Target Match
  const [rotationState, setRotationState] = useState<"0" | "1" | "+">("0");
  const [targetRotationState] = useState<"1" | "+">("1");
  const [game1Solved, setGame1Solved] = useState<boolean>(false);

  // Interactive Game 2 State: Superposition Amplitude Matcher
  const [alphaVal, setAlphaVal] = useState<number>(0.707);
  const [game2Solved, setGame2Solved] = useState<boolean>(false);

  const handleApplyGateToRotation = (gate: "H" | "X" | "Z") => {
    if (rotationState === "0") {
      if (gate === "X") setRotationState("1");
      if (gate === "H") setRotationState("+");
    } else if (rotationState === "1") {
      if (gate === "X") setRotationState("0");
      if (gate === "H") setRotationState("+");
    } else if (rotationState === "+") {
      if (gate === "H") setRotationState("0");
      if (gate === "Z") setRotationState("+");
    }

    const nextState = gate === "X" ? (rotationState === "0" ? "1" : "0") : "+";
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

  return (
    <div className={`space-y-8 max-w-7xl mx-auto transition-colors ${isDark ? "text-white" : "text-slate-900"}`}>
      {/* Top Pathway Bar & Mode Toggle */}
      <div className={`rounded-3xl p-5 sm:p-6 shadow-xl border flex flex-col sm:flex-row items-center justify-between gap-4 transition-all ${
        isDark ? "bg-[#1C1C1C] border-[#7F00FF]/30 text-white" : "bg-white border-slate-200 text-[#1C1C1C]"
      }`}>
        <div className="flex items-center space-x-3">
          <div className={`p-3 rounded-2xl text-white shadow-lg ${
            isDark ? "bg-[#7F00FF] glow-violet" : "bg-[#333333]"
          }`}>
            <Zap className={`w-6 h-6 fill-current ${isDark ? "text-[#A3FF00]" : "text-[#00B894]"}`} />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-black uppercase tracking-wider">
                Quantum Learning Path
              </h2>
              <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold uppercase tracking-wider border ${
                isDark ? "bg-[#A3FF00]/10 text-[#A3FF00] border-[#A3FF00]/30" : "bg-[#00B894]/10 text-[#00B894] border-[#00B894]/30"
              }`}>
                Interactive Mode
              </span>
            </div>
            <p className={`text-xs ${isDark ? "text-[#C0C0C0]" : "text-slate-600"}`}>
              Interactive game-based nodes • Earn XP & complete daily coherence milestones
            </p>
          </div>
        </div>

        <div className={`flex items-center space-x-2 p-1.5 rounded-2xl border text-xs ${
          isDark ? "bg-[#121212] border-white/10" : "bg-slate-100 border-slate-200"
        }`}>
          <button
            onClick={() => setViewMode("path")}
            className={`px-4 py-2 rounded-xl font-bold uppercase tracking-wider transition-all flex items-center space-x-1.5 ${
              viewMode === "path"
                ? isDark ? "bg-[#A3FF00] text-[#121212] shadow-md glow-lime" : "bg-[#00B894] text-white shadow-md"
                : isDark ? "text-gray-400 hover:text-white" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Gamepad2 className="w-4 h-4" />
            <span>Path Tree</span>
          </button>
          <button
            onClick={() => setViewMode("details")}
            className={`px-4 py-2 rounded-xl font-bold uppercase tracking-wider transition-all flex items-center space-x-1.5 ${
              viewMode === "details"
                ? isDark ? "bg-[#A3FF00] text-[#121212] shadow-md glow-lime" : "bg-[#00B894] text-white shadow-md"
                : isDark ? "text-gray-400 hover:text-white" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Grid View</span>
          </button>
        </div>
      </div>

      {/* SNAKE PATHWAY VIEW */}
      {viewMode === "path" && (
        <div className={`rounded-3xl p-6 sm:p-10 shadow-2xl space-y-10 relative overflow-hidden border transition-all ${
          isDark ? "bg-[#1C1C1C] border-[#7F00FF]/30 text-white" : "bg-white border-slate-200 text-[#1C1C1C]"
        }`}>
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <span className={`text-xs font-mono font-bold uppercase tracking-widest block ${
              isDark ? "text-[#A3FF00]" : "text-[#00B894]"
            }`}>
              Unit 1 • Foundational Quantum Mechanics
            </span>
            <h3 className="text-2xl font-black uppercase tracking-wider">
              Quantum Computing Tree
            </h3>
            <p className={`text-xs ${isDark ? "text-[#C0C0C0]" : "text-slate-600"}`}>
              Tap any level node to unlock interactive quantum games, visualizers, and lesson quizzes.
            </p>
          </div>

          {/* Snake Path Nodes */}
          <div className="flex flex-col items-center space-y-8 relative max-w-lg mx-auto py-4">
            {/* Connecting background path line */}
            <div className={`absolute top-8 bottom-8 w-1.5 rounded-full z-0 ${
              isDark ? "bg-gradient-to-b from-[#7F00FF] via-[#A3FF00] to-[#FF66CC]" : "bg-gradient-to-b from-[#333333] via-[#00B894] to-[#9B59B6]"
            }`} />

            {modules.map((m, idx) => {
              const isCurrent = m.id === selectedModuleId;
              const isUnlocked = idx <= 4;
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
                  className={`relative z-10 flex flex-col items-center space-y-2 transition-all ${offsetClasses[idx % offsetClasses.length]}`}
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
                    <span className={`text-[10px] font-mono font-bold ${
                      isDark ? "text-[#A3FF00]" : "text-[#00B894]"
                    }`}>
                      +{m.lessons.length * 50} XP
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* GAME-BASED INTERACTIVE MINI-GAMES SECTION */}
      <div className={`rounded-2xl p-6 shadow-2xl space-y-6 border transition-all ${
        isDark ? "bg-[#2A2A2A] border-white/10" : "bg-white border-slate-200"
      }`}>
        <div className={`flex items-center justify-between border-b pb-3 ${isDark ? "border-white/10" : "border-slate-200"}`}>
          <div className="flex items-center space-x-2">
            <Gamepad2 className="w-5 h-5 text-emerald-500" />
            <h3 className={`text-base font-bold uppercase tracking-wider ${isDark ? "text-white" : "text-slate-900"}`}>
              Interactive Game Challenges
            </h3>
          </div>
          <span className="text-xs font-mono font-bold text-amber-500 flex items-center space-x-1">
            <Trophy className="w-4 h-4 text-amber-500" />
            <span>Play & Earn XP</span>
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Game 1: Qubit Vector Rotator Puzzle */}
          <div className={`rounded-2xl p-5 space-y-4 border ${
            isDark ? "bg-black/40 border-purple-500/30" : "bg-slate-50 border-purple-200"
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold text-emerald-500 uppercase block">
                  Game Challenge 1
                </span>
                <h4 className={`font-bold text-sm ${isDark ? "text-white" : "text-slate-900"}`}>
                  State Vector Target Rotation
                </h4>
              </div>
              <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-purple-900 text-purple-200">
                +50 XP
              </span>
            </div>

            <p className={`text-xs ${isDark ? "text-gray-300" : "text-slate-600"}`}>
              Apply standard quantum gates (X, H, Z) to rotate initial qubit state <code className="text-emerald-500 font-mono font-bold">|0⟩</code> to match target state <code className="text-amber-500 font-mono font-bold">|{targetRotationState}⟩</code>.
            </p>

            <div className={`p-4 rounded-xl border space-y-3 text-center ${
              isDark ? "bg-[#1E1E1E] border-white/10" : "bg-white border-slate-200"
            }`}>
              <div className="flex justify-around text-xs font-mono font-bold">
                <div>
                  <span className={`block text-[10px] ${isDark ? "text-gray-400" : "text-slate-500"}`}>CURRENT STATE</span>
                  <span className="text-emerald-500 text-lg">|{rotationState}⟩</span>
                </div>
                <div className={`h-8 w-px ${isDark ? "bg-white/20" : "bg-slate-200"}`} />
                <div>
                  <span className={`block text-[10px] ${isDark ? "text-gray-400" : "text-slate-500"}`}>TARGET STATE</span>
                  <span className="text-amber-500 text-lg">|{targetRotationState}⟩</span>
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
                <div className="p-2.5 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-500 text-xs font-bold flex items-center justify-center space-x-1.5 animate-in fade-in">
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span>Target Matched! Earned +50 XP!</span>
                </div>
              )}
            </div>
          </div>

          {/* Game 2: Superposition Amplitude Matcher */}
          <div className={`rounded-2xl p-5 space-y-4 border ${
            isDark ? "bg-black/40 border-emerald-500/30" : "bg-slate-50 border-emerald-200"
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold text-emerald-500 uppercase block">
                  Game Challenge 2
                </span>
                <h4 className={`font-bold text-sm ${isDark ? "text-white" : "text-slate-900"}`}>
                  Equal Superposition Amplitude Matcher
                </h4>
              </div>
              <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-emerald-950 text-emerald-300">
                +50 XP
              </span>
            </div>

            <p className={`text-xs ${isDark ? "text-gray-300" : "text-slate-600"}`}>
              Adjust amplitude <code className="text-emerald-500 font-mono font-bold">α</code> so that <code className="text-amber-500 font-mono font-bold">|α|² = 0.5</code> (Equal 50/50 probability superposition).
            </p>

            <div className={`p-4 rounded-xl border space-y-3 ${
              isDark ? "bg-[#1E1E1E] border-white/10" : "bg-white border-slate-200"
            }`}>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between font-mono">
                  <span className={isDark ? "text-gray-300" : "text-slate-600"}>Alpha Amplitude (α):</span>
                  <span className="text-emerald-500 font-bold">{alphaVal.toFixed(3)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={alphaVal}
                  onChange={(e) => handleSliderChange(parseFloat(e.target.value))}
                  className="w-full accent-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-center pt-1">
                <div className={`p-2 rounded ${isDark ? "bg-white/5" : "bg-slate-100"}`}>
                  <span className={`block text-[9px] ${isDark ? "text-gray-400" : "text-slate-500"}`}>P(|0⟩) = |α|²</span>
                  <span className="text-emerald-500 font-bold">{(alphaVal * alphaVal * 100).toFixed(1)}%</span>
                </div>
                <div className={`p-2 rounded ${isDark ? "bg-white/5" : "bg-slate-100"}`}>
                  <span className={`block text-[9px] ${isDark ? "text-gray-400" : "text-slate-500"}`}>P(|1⟩) = 1 - |α|²</span>
                  <span className="text-purple-500 font-bold">{((1 - alphaVal * alphaVal) * 100).toFixed(1)}%</span>
                </div>
              </div>

              {game2Solved && (
                <div className="p-2.5 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-500 text-xs font-bold flex items-center justify-center space-x-1.5 animate-in fade-in">
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span>Balanced Superposition Achieved! Earned +50 XP!</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* DETAILED GRID VIEW FOR MODULES */}
      {viewMode === "details" && (
        <div className="space-y-8">
          {/* Module Selector Buttons */}
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
                    <span className="font-bold text-xs line-clamp-2 mt-1">{m.title}</span>
                  </div>
                  <span className={`text-[10px] font-mono mt-3 block ${isDark ? "text-gray-400" : "text-slate-500"}`}>
                    {m.lessons.length} Lessons • {m.difficulty}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Selected Lesson Detail */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Sidebar Lessons */}
            <div className={`lg:col-span-4 rounded-2xl p-6 space-y-4 border transition-all ${
              isDark ? "bg-[#2A2A2A] border-white/10" : "bg-white border-slate-200"
            }`}>
              <div className={`border-b pb-3 ${isDark ? "border-white/10" : "border-slate-200"}`}>
                <span className="text-xs font-bold text-emerald-500 uppercase tracking-wider block">
                  Curriculum Lessons
                </span>
                <h3 className={`text-base font-bold mt-1 ${isDark ? "text-white" : "text-slate-900"}`}>{currentModule.title}</h3>
                <p className={`text-xs mt-0.5 ${isDark ? "text-gray-400" : "text-slate-600"}`}>{currentModule.description}</p>
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
                          <span className={`text-[10px] font-mono ${isDark ? "text-gray-400" : "text-slate-500"}`}>{lesson.duration}</span>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Lesson Main Content */}
            <div className={`lg:col-span-8 rounded-2xl p-6 space-y-6 border transition-all ${
              isDark ? "bg-[#2A2A2A] border-white/10" : "bg-white border-slate-200"
            }`}>
              <div className={`flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b gap-4 ${
                isDark ? "border-white/10" : "border-slate-200"
              }`}>
                <div>
                  <div className="flex items-center space-x-2">
                    <BookOpen className="w-5 h-5 text-emerald-500" />
                    <h2 className={`text-lg font-bold ${isDark ? "text-white" : "text-slate-900"}`}>{currentLesson.title}</h2>
                  </div>
                  <span className={`text-xs font-mono mt-1 block ${isDark ? "text-gray-400" : "text-slate-500"}`}>
                    Estimated Time: {currentLesson.duration}
                  </span>
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => onOpenAITutorWithTopic(currentLesson.title)}
                    className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-[#5A2A82] to-purple-800 text-white text-xs font-semibold border border-purple-400/30"
                  >
                    <Bot className="w-4 h-4 text-emerald-300" />
                    <span>Ask AI Tutor</span>
                  </button>

                  <button
                    onClick={() => onOpenQuiz(currentModule.title, currentLesson.title)}
                    className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20"
                  >
                    <Sparkles className="w-4 h-4 text-slate-950" />
                    <span>Take Quiz</span>
                  </button>
                </div>
              </div>

              {/* Lesson Summary Notes */}
              <div className={`p-5 rounded-2xl border space-y-3 ${
                isDark ? "bg-black/30 border-white/10" : "bg-slate-50 border-slate-200"
              }`}>
                <span className="text-xs font-bold text-emerald-500 uppercase tracking-wider block flex items-center space-x-2">
                  <FileText className="w-4 h-4" />
                  <span>Core Concept Summary Notes</span>
                </span>
                <p className={`text-xs leading-relaxed ${isDark ? "text-gray-300" : "text-slate-700"}`}>{currentLesson.summary}</p>
              </div>

              {/* Key Concepts */}
              <div className="space-y-3">
                <span className={`text-xs font-bold uppercase tracking-wider block ${isDark ? "text-gray-300" : "text-slate-600"}`}>
                  Key Technical Takeaways
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentLesson.keyConcepts.map((concept, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-xl border text-xs flex items-start space-x-2 ${
                        isDark ? "bg-white/5 border-white/10 text-gray-200" : "bg-slate-50 border-slate-200 text-slate-800"
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{concept}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
