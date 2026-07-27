import React, { useState } from "react";
import {
  Sparkles,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Brain
} from "lucide-react";
import { Flashcard } from "../types";

const DEFAULT_FLASHCARDS: Flashcard[] = [
  {
    id: "fc-1",
    front: "What is a Qubit?",
    back: "A two-level quantum system represented by state vector |ψ⟩ = α|0⟩ + β|1⟩, where α and β are complex probability amplitudes satisfying |α|^2 + |β|^2 = 1.",
    category: "Qubits",
  },
  {
    id: "fc-2",
    front: "What does the Hadamard (H) Gate do?",
    back: "Creates an equal superposition state: H|0⟩ = (|0⟩ + |1⟩)/√2 and H|1⟩ = (|0⟩ - |1⟩)/√2.",
    category: "Gates",
  },
  {
    id: "fc-3",
    front: "What is Quantum Entanglement?",
    back: "A physical phenomenon where quantum states of two or more particles are linked such that the quantum state of each particle cannot be described independently of the others.",
    category: "Entanglement",
  },
  {
    id: "fc-4",
    front: "What is the No-Cloning Theorem?",
    back: "It is impossible to create an identical copy of an arbitrary unknown quantum state |ψ⟩ using unitary transformations.",
    category: "Fundamental Principles",
  },
  {
    id: "fc-5",
    front: "What speedup does Grover's Algorithm provide?",
    back: "Quadratic speedup O(√N) for searching an unsorted database of N items, compared to classical O(N) exhaustive search.",
    category: "Algorithms",
  },
];

interface FlashcardsViewProps {
  theme?: "dark" | "light";
}

export const FlashcardsView: React.FC<FlashcardsViewProps> = ({ theme = "dark" }) => {
  const isDark = theme === "dark";
  const [cards, setCards] = useState<Flashcard[]>(DEFAULT_FLASHCARDS);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [customTopic, setCustomTopic] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const currentCard = cards[currentIndex] || cards[0];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const handleGenerateCustomCards = async () => {
    if (!customTopic.trim()) return;
    setIsGenerating(true);

    try {
      const res = await fetch("/api/ai/notes-summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: `Generate 4 revision flashcards for topic: ${customTopic}`,
          title: customTopic,
        }),
      });

      const data = await res.json();
      if (data.flashcards && data.flashcards.length > 0) {
        const newCards: Flashcard[] = data.flashcards.map((fc: any, i: number) => ({
          id: `ai-fc-${Date.now()}-${i}`,
          front: fc.front,
          back: fc.back,
          category: customTopic,
        }));

        setCards([...newCards, ...cards]);
        setCurrentIndex(0);
        setIsFlipped(false);
      }
    } catch {
      // Fallback
    } finally {
      setIsGenerating(false);
      setCustomTopic("");
    }
  };

  return (
    <div className={`border rounded-3xl p-6 shadow-2xl space-y-8 max-w-4xl mx-auto transition-colors ${
      isDark ? "bg-[#1C1C1C] border-[#7F00FF]/30 text-[#EAEAEA]" : "bg-white border-slate-200 text-[#1C1C1C]"
    }`}>
      {/* Header */}
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between border-b pb-4 gap-4 ${
        isDark ? "border-white/10" : "border-slate-200"
      }`}>
        <div>
          <div className="flex items-center space-x-2">
            <Brain className={`w-6 h-6 ${isDark ? "text-[#A3FF00]" : "text-[#00B894]"}`} />
            <h2 className="text-xl font-extrabold uppercase tracking-wider">AI Revision Flashcards</h2>
          </div>
          <p className={`text-xs mt-1 ${isDark ? "text-[#C0C0C0]" : "text-slate-600"}`}>
            Master quantum computing definitions, Dirac vector math, and gate identities with active recall.
          </p>
        </div>

        <span className={`text-xs font-mono font-bold px-3 py-1.5 rounded-full border ${
          isDark
            ? "text-[#A3FF00] bg-[#A3FF00]/10 border-[#A3FF00]/30"
            : "text-[#00B894] bg-[#00B894]/10 border-[#00B894]/30"
        }`}>
          Card {currentIndex + 1} of {cards.length}
        </span>
      </div>

      {/* AI Card Generator Input */}
      <div className={`flex items-center space-x-3 border rounded-2xl p-2 ${
        isDark ? "bg-[#121212] border-white/10" : "bg-slate-50 border-slate-200"
      }`}>
        <input
          type="text"
          value={customTopic}
          onChange={(e) => setCustomTopic(e.target.value)}
          placeholder="Generate flashcards on custom topic..."
          className={`flex-1 bg-transparent px-3 py-1.5 text-xs outline-none ${
            isDark ? "text-white placeholder-gray-500" : "text-slate-900 placeholder-slate-400"
          }`}
        />
        <button
          onClick={handleGenerateCustomCards}
          disabled={isGenerating || !customTopic.trim()}
          className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-white font-bold text-xs uppercase tracking-wider disabled:opacity-50 transition-all ${
            isDark
              ? "bg-[#7F00FF] hover:bg-[#6b00db] glow-violet"
              : "bg-[#333333] hover:bg-slate-700"
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-[#FFC312]" />
          <span>{isGenerating ? "Generating..." : "Generate Cards"}</span>
        </button>
      </div>

      {/* 3D Flip Flashcard Display */}
      <div className="flex flex-col items-center justify-center space-y-6">
        <div
          onClick={() => setIsFlipped(!isFlipped)}
          className={`w-full max-w-xl h-72 rounded-3xl p-8 cursor-pointer flex flex-col items-center justify-center text-center transition-all duration-500 transform shadow-2xl relative border ${
            isFlipped
              ? isDark
                ? "bg-[#7F00FF] border-[#FF66CC]/40 text-white glow-violet"
                : "bg-[#333333] border-[#9B59B6]/40 text-white"
              : isDark
              ? "bg-[#121212] border-white/10 hover:border-[#A3FF00]/50 text-white"
              : "bg-slate-50 border-slate-200 hover:border-[#00B894]/50 text-slate-900"
          }`}
        >
          <span className={`absolute top-4 left-4 text-[10px] uppercase font-mono font-black tracking-wider px-2.5 py-1 rounded-full ${
            isDark
              ? "bg-[#A3FF00]/20 text-[#A3FF00]"
              : "bg-[#00B894]/20 text-[#00B894]"
          }`}>
            {currentCard.category || "Quantum AI"}
          </span>
          <span className={`absolute top-4 right-4 text-[10px] font-mono ${isDark ? "text-[#C0C0C0]" : "text-slate-400"}`}>
            Click to {isFlipped ? "Show Question" : "Reveal Answer"}
          </span>

          <div className="space-y-3 px-4">
            {!isFlipped ? (
              <h3 className="text-xl font-bold leading-relaxed">{currentCard.front}</h3>
            ) : (
              <p className={`text-sm leading-relaxed font-mono font-bold ${
                isDark ? "text-[#A3FF00]" : "text-[#FFC312]"
              }`}>{currentCard.back}</p>
            )}
          </div>
        </div>

        {/* Carousel Navigation Buttons */}
        <div className="flex items-center space-x-4">
          <button
            onClick={handlePrev}
            className={`p-3 rounded-full border transition-all active:scale-95 ${
              isDark ? "bg-white/5 hover:bg-white/10 text-white border-white/10" : "bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300"
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => setIsFlipped(!isFlipped)}
            className={`px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all flex items-center space-x-2 ${
              isDark
                ? "bg-[#A3FF00]/10 text-[#A3FF00] border-[#A3FF00]/30 hover:bg-[#A3FF00]/20"
                : "bg-[#00B894]/10 text-[#00B894] border-[#00B894]/30 hover:bg-[#00B894]/20"
            }`}
          >
            <RotateCcw className="w-4 h-4" />
            <span>Flip Card</span>
          </button>
          <button
            onClick={handleNext}
            className={`p-3 rounded-full border transition-all active:scale-95 ${
              isDark ? "bg-white/5 hover:bg-white/10 text-white border-white/10" : "bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300"
            }`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
