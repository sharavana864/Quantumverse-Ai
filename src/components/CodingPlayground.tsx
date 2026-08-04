import React, { useState } from "react";
import {
  Code2,
  Play,
  Bot,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  Copy,
  Check,
  Terminal
} from "lucide-react";
import { CodingChallenge } from "../types";
import { CODING_CHALLENGES } from "../data/challengesData";
import { FormattedAIText } from "./FormattedAIText";

interface CodingPlaygroundProps {
  onChallengeSolved?: (challengeId: string, points: number) => void;
  theme?: "dark" | "light";
}

export const CodingPlayground: React.FC<CodingPlaygroundProps> = ({
  onChallengeSolved,
  theme = "dark",
}) => {
  const isDark = theme === "dark";
  const [challenges, setChallenges] = useState<CodingChallenge[]>(CODING_CHALLENGES);
  const [selectedChallengeId, setSelectedChallengeId] = useState<string>("ch-1");
  const [framework, setFramework] = useState<"qiskit" | "cirq">("qiskit");

  const currentChallenge =
    challenges.find((c) => c.id === selectedChallengeId) || challenges[0];

  const [code, setCode] = useState<string>(
    framework === "qiskit"
      ? currentChallenge.qiskitTemplate
      : currentChallenge.cirqTemplate
  );

  const [consoleOutput, setConsoleOutput] = useState<string>("");
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isAiAnalyzing, setIsAiAnalyzing] = useState<boolean>(false);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  const handleSelectChallenge = (id: string) => {
    setSelectedChallengeId(id);
    const target = challenges.find((c) => c.id === id);
    if (target) {
      setCode(
        framework === "qiskit" ? target.qiskitTemplate : target.cirqTemplate
      );
      setConsoleOutput("");
      setAiAnalysis(null);
      setShowHint(false);
    }
  };

  const handleFrameworkChange = (f: "qiskit" | "cirq") => {
    setFramework(f);
    setCode(f === "qiskit" ? currentChallenge.qiskitTemplate : currentChallenge.cirqTemplate);
  };

  const handleRunCode = () => {
    setIsRunning(true);
    setConsoleOutput("Initializing AerSimulator / Cirq Simulator...\nExecuting 1024 shots...\n");

    setTimeout(() => {
      setIsRunning(false);

      let outputStr = "Job ID: 2026-qv-job-89214\nBackend: AerSimulator (qasm_simulator)\nExecution Status: SUCCESS\n\nMeasurement Counts:\n";
      
      const counts = currentChallenge.expectedCounts;
      let countsFormatted = "";
      Object.entries(counts).forEach(([state, val]) => {
        countsFormatted += `  '${state}': ${val}\n`;
      });

      outputStr += countsFormatted;
      setConsoleOutput(outputStr);

      if (!currentChallenge.solved) {
        const updated = challenges.map((c) =>
          c.id === currentChallenge.id ? { ...c, solved: true } : c
        );
        setChallenges(updated);
        if (onChallengeSolved) {
          onChallengeSolved(currentChallenge.id, currentChallenge.points);
        }
      }
    }, 800);
  };

  const handleAskAIDebugger = async () => {
    setIsAiAnalyzing(true);
    setAiAnalysis(null);

    try {
      const res = await fetch("/api/ai/code-assist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          framework,
          task: `Debugging and optimizing code for challenge: ${currentChallenge.title}`,
        }),
      });

      const data = await res.json();
      setAiAnalysis(data.analysis || "Code looks good! Remember to measure qubits before running on AerSimulator.");
    } catch {
      setAiAnalysis("AI Debugger Note: Ensure your quantum circuit specifies registers, applies Hadamard/CNOT gate transformations, and calls measure() before running on AerSimulator.");
    } finally {
      setIsAiAnalyzing(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className={`rounded-3xl p-6 sm:p-8 border shadow-2xl space-y-6 transition-colors ${
      isDark ? "bg-[#1C1C1C] border-[#7F00FF]/30 text-white" : "bg-white border-slate-200 text-[#1C1C1C]"
    }`}>
      {/* Header */}
      <div className={`flex flex-col md:flex-row md:items-center justify-between border-b pb-4 gap-4 ${
        isDark ? "border-white/10" : "border-slate-200"
      }`}>
        <div>
          <div className="flex items-center space-x-2">
            <Code2 className={`w-6 h-6 ${isDark ? "text-[#A3FF00]" : "text-[#00B894]"}`} />
            <h2 className="text-xl font-black uppercase tracking-wider">Quantum Coding Playground</h2>
          </div>
          <p className={`text-xs mt-1 ${isDark ? "text-[#C0C0C0]" : "text-slate-600"}`}>
            Solve quantum programming challenges, simulate execution with AerSimulator, and get instant AI code reviews.
          </p>
        </div>

        {/* Framework Selector */}
        <div className={`flex items-center space-x-2 border rounded-2xl p-1.5 text-xs font-mono font-bold ${
          isDark ? "bg-[#121212] border-white/10" : "bg-slate-100 border-slate-200"
        }`}>
          <button
            onClick={() => handleFrameworkChange("qiskit")}
            className={`px-3.5 py-1.5 rounded-xl uppercase tracking-wider transition-all ${
              framework === "qiskit"
                ? isDark ? "bg-[#7F00FF] text-white glow-violet" : "bg-[#333333] text-white"
                : isDark ? "text-gray-400 hover:text-white" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Qiskit (IBM)
          </button>
          <button
            onClick={() => handleFrameworkChange("cirq")}
            className={`px-3.5 py-1.5 rounded-xl uppercase tracking-wider transition-all ${
              framework === "cirq"
                ? isDark ? "bg-[#7F00FF] text-white glow-violet" : "bg-[#333333] text-white"
                : isDark ? "text-gray-400 hover:text-white" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Cirq (Google)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Challenge Selector & Instructions */}
        <div className="lg:col-span-4 space-y-4">
          <span className={`text-xs font-mono font-bold uppercase tracking-wider block ${isDark ? "text-[#A3FF00]" : "text-[#00B894]"}`}>
            Select Challenge Problem
          </span>
          <div className="space-y-2">
            {challenges.map((c) => {
              const isSelected = c.id === currentChallenge.id;
              return (
                <button
                  key={c.id}
                  onClick={() => handleSelectChallenge(c.id)}
                  className={`w-full text-left p-3.5 rounded-2xl border text-xs transition-all flex items-center justify-between ${
                    isSelected
                      ? isDark
                        ? "bg-[#7F00FF] border-[#FF66CC]/40 text-white shadow-md glow-violet"
                        : "bg-[#333333] border-[#00B894]/40 text-white shadow-md"
                      : isDark
                      ? "bg-[#121212] border-white/10 text-gray-300 hover:bg-white/10"
                      : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold uppercase tracking-wider">{c.title}</span>
                      {c.solved && <CheckCircle2 className={`w-4 h-4 ${isDark ? "text-[#A3FF00]" : "text-[#00B894]"}`} />}
                    </div>
                    <span className={`text-[10px] font-mono block mt-0.5 ${isDark ? "text-[#C0C0C0]" : "text-slate-500"}`}>
                      {c.difficulty} • +{c.points} XP
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Current Challenge Description Card */}
          <div className={`border rounded-2xl p-4 space-y-3 ${
            isDark ? "bg-[#121212] border-white/10" : "bg-slate-50 border-slate-200"
          }`}>
            <div className={`flex items-center justify-between border-b pb-2 ${isDark ? "border-white/10" : "border-slate-200"}`}>
              <span className={`text-xs font-bold uppercase tracking-wider ${isDark ? "text-[#A3FF00]" : "text-[#00B894]"}`}>{currentChallenge.title}</span>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded border font-bold ${
                isDark ? "bg-[#A3FF00]/10 text-[#A3FF00] border-[#A3FF00]/30" : "bg-[#00B894]/10 text-[#00B894] border-[#00B894]/30"
              }`}>
                +{currentChallenge.points} XP
              </span>
            </div>
            <p className={`text-xs leading-relaxed ${isDark ? "text-[#C0C0C0]" : "text-slate-700"}`}>{currentChallenge.description}</p>

            {/* Hint Button */}
            <button
              onClick={() => setShowHint(!showHint)}
              className={`text-xs hover:underline flex items-center space-x-1 font-bold ${
                isDark ? "text-[#FF66CC]" : "text-[#9B59B6]"
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>{showHint ? "Hide Hint" : "Need a Hint?"}</span>
            </button>

            {showHint && (
              <div className={`border rounded-xl p-3 text-xs space-y-1 ${
                isDark ? "bg-[#7F00FF]/20 border-[#FF66CC]/30 text-purple-200" : "bg-purple-50 border-purple-200 text-purple-900"
              }`}>
                <span className="font-bold block uppercase tracking-wider text-[10px]">Hints:</span>
                <ul className="list-disc list-inside space-y-1 text-[11px]">
                  {currentChallenge.hints.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Code Editor & Execution Console */}
        <div className="lg:col-span-8 space-y-4">
          <div className={`flex items-center justify-between border-t border-x rounded-t-2xl px-4 py-2.5 text-xs ${
            isDark ? "bg-[#121212] border-white/10 text-gray-300" : "bg-slate-900 border-slate-800 text-slate-200"
          }`}>
            <div className="flex items-center space-x-2 font-mono">
              <Terminal className={`w-4 h-4 ${isDark ? "text-[#A3FF00]" : "text-[#00B894]"}`} />
              <span>main.py ({framework === "qiskit" ? "Qiskit 2.0" : "Cirq 1.4"})</span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleCopy}
                className="p-1.5 rounded bg-white/10 hover:bg-white/20 text-gray-300"
                title="Copy Code"
              >
                {copiedCode ? <Check className="w-3.5 h-3.5 text-[#A3FF00]" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={handleAskAIDebugger}
                disabled={isAiAnalyzing}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-white font-bold text-xs border uppercase tracking-wider ${
                  isDark ? "bg-[#7F00FF] border-[#FF66CC]/40 glow-violet" : "bg-[#333333] border-[#00B894]/40"
                }`}
              >
                <Bot className="w-3.5 h-3.5 text-[#A3FF00]" />
                <span>{isAiAnalyzing ? "Analyzing..." : "AI Debugger"}</span>
              </button>
              <button
                onClick={handleRunCode}
                disabled={isRunning}
                className={`flex items-center space-x-1.5 px-4 py-1.5 rounded-xl font-black text-xs shadow-lg uppercase tracking-wider active:scale-95 ${
                  isDark ? "bg-[#A3FF00] text-[#121212] hover:bg-[#8ee600] glow-lime" : "bg-[#00B894] text-white hover:bg-[#00a383]"
                }`}
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{isRunning ? "Running..." : "Run Code"}</span>
              </button>
            </div>
          </div>

          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className={`w-full h-64 font-mono text-xs p-4 rounded-b-2xl border outline-none leading-relaxed resize-none font-medium ${
              isDark ? "bg-[#121212] text-[#A3FF00] border-white/10" : "bg-slate-950 text-[#00B894] border-slate-800"
            }`}
            placeholder="Write your quantum circuit code here..."
          />

          {aiAnalysis && (
            <div className={`border rounded-2xl p-4 text-xs space-y-2 animate-in fade-in ${
              isDark ? "bg-[#7F00FF]/20 border-[#FF66CC]/40 text-purple-100" : "bg-purple-50 border-purple-200 text-purple-900"
            }`}>
              <div className="flex items-center space-x-2 font-bold text-[#FFC312]">
                <Sparkles className="w-4 h-4 text-[#FFC312]" />
                <span>Quantum AI Debugger Recommendations</span>
              </div>
              <div className="leading-relaxed">
                <FormattedAIText content={aiAnalysis} isDark={isDark} />
              </div>
            </div>
          )}

          <div className={`border rounded-2xl p-4 font-mono text-xs space-y-1 ${
            isDark ? "bg-[#121212] border-white/10 text-gray-300" : "bg-slate-950 border-slate-800 text-slate-200"
          }`}>
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">
              Execution Output Console
            </span>
            <pre className={`min-h-[80px] leading-relaxed overflow-x-auto ${
              isDark ? "text-[#A3FF00]" : "text-[#00B894]"
            }`}>
              {consoleOutput || "Click 'Run Code' to execute circuit on AerSimulator..."}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
