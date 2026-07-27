import React, { useState, useRef, useEffect } from "react";
import {
  Bot,
  X,
  Send,
  Volume2,
  VolumeX,
  Sparkles,
  User,
  Sliders,
  RotateCcw,
  BookOpen,
} from "lucide-react";
import { SkillLevel } from "../types";

interface AITutorModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeTopic?: string;
}

interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  isSimulated?: boolean;
}

export const AITutorModal: React.FC<AITutorModalProps> = ({
  isOpen,
  onClose,
  activeTopic = "Quantum Computing Fundamentals",
}) => {
  const [skillLevel, setSkillLevel] = useState<SkillLevel>("Beginner");
  const [inputPrompt, setInputPrompt] = useState<string>("");
  const [voiceEnabled, setVoiceEnabled] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "msg-1",
      sender: "ai",
      text: `Hello! I am your QuantumVerse AI Tutor. I can explain complex quantum mechanics, Dirac notation, or Qiskit circuits step-by-step at your preferred level (${skillLevel}). What concept shall we explore together?`,
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!isOpen) return null;

  // Speak response using Web Speech API if voice is enabled
  const speakText = (text: string) => {
    if (!voiceEnabled || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const cleanText = text.replace(/[*#_`]/g, ""); // strip markdown formatting
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  const handleSendMessage = async (promptToSend?: string) => {
    const text = promptToSend || inputPrompt;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: "user",
      text,
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!promptToSend) setInputPrompt("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/ai/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: text,
          topic: activeTopic,
          skillLevel,
          history: messages.map((m) => ({
            role: m.sender === "user" ? "user" : "model",
            text: m.text,
          })),
        }),
      });

      const data = await res.json();
      const aiMsgText = data.response || "Quantum states superposition principle collapses upon measurement.";

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: aiMsgText,
        isSimulated: data.isSimulated,
      };

      setMessages((prev) => [...prev, aiMsg]);
      speakText(aiMsgText);
    } catch (err) {
      const fallbackMsg: ChatMessage = {
        id: `ai-err-${Date.now()}`,
        sender: "ai",
        text: "In quantum computing, qubits exist in superposition |ψ⟩ = α|0⟩ + β|1⟩ until measurement collapses the wavefunction. Try opening the Bloch Sphere or Circuit Builder for visual intuition!",
      };
      setMessages((prev) => [...prev, fallbackMsg]);
      speakText(fallbackMsg.text);
    } finally {
      setIsLoading(false);
    }
  };

  const promptChips = [
    "Explain the Bloch Sphere in 3 simple bullet points",
    "How does Quantum Teleportation respect No-Cloning?",
    "What is the difference between Qiskit and Cirq?",
    "Why does Grover's Search give a quadratic speedup?",
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#1C1C1C] border border-[#7F00FF]/40 rounded-3xl w-full max-w-2xl h-[85vh] flex flex-col shadow-2xl overflow-hidden relative">
        {/* Header */}
        <div className="bg-[#121212] px-6 py-4 flex items-center justify-between border-b border-white/10 relative z-10">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-2xl bg-[#7F00FF] text-white shadow-md glow-violet">
              <Bot className="w-5 h-5 text-[#A3FF00]" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-extrabold text-white text-base uppercase tracking-wider">QuantumVerse AI Voice Tutor</h3>
                <span className="text-[10px] bg-[#A3FF00] text-[#121212] font-black px-2 py-0.5 rounded-full uppercase font-mono">
                  Gemini 3.6
                </span>
              </div>
              <span className="text-xs text-[#FF66CC] font-mono">Topic: {activeTopic}</span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* Voice Toggle */}
            <button
              onClick={() => {
                setVoiceEnabled(!voiceEnabled);
                if (voiceEnabled) window.speechSynthesis.cancel();
              }}
              className={`p-2 rounded-xl text-xs font-semibold border transition-all ${
                voiceEnabled
                  ? "bg-[#A3FF00]/10 border-[#A3FF00]/40 text-[#A3FF00]"
                  : "bg-white/5 border-white/10 text-gray-400"
              }`}
              title="Toggle Audio Voice Synthesis"
            >
              {voiceEnabled ? <Volume2 className="w-4 h-4 text-[#A3FF00]" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Level Controls & Prompt Chips */}
        <div className="bg-[#121212]/80 border-b border-white/10 px-6 py-3 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-2">
            <span className="text-gray-400 font-medium flex items-center space-x-1">
              <Sliders className="w-3.5 h-3.5 text-[#FF66CC]" />
              <span>Explanation Level:</span>
            </span>
            {(["Beginner", "Intermediate", "Advanced"] as SkillLevel[]).map((lvl) => (
              <button
                key={lvl}
                onClick={() => setSkillLevel(lvl)}
                className={`px-3 py-1 rounded-xl font-bold uppercase tracking-wider text-[10px] transition-all ${
                  skillLevel === lvl
                    ? "bg-[#7F00FF] text-white border border-[#FF66CC]/30 glow-violet"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Messages Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#121212]">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start space-x-3 ${
                msg.sender === "user" ? "flex-row-reverse space-x-reverse" : ""
              }`}
            >
              <div
                className={`w-8 h-8 rounded-2xl flex items-center justify-center shrink-0 shadow-md ${
                  msg.sender === "user" ? "bg-[#A3FF00] text-[#121212] font-black" : "bg-[#7F00FF] text-[#A3FF00]"
                }`}
              >
                {msg.sender === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 text-xs leading-relaxed ${
                  msg.sender === "user"
                    ? "bg-[#A3FF00] text-[#121212] font-bold"
                    : "bg-[#1C1C1C] border border-[#7F00FF]/30 text-white shadow-lg space-y-2"
                }`}
              >
                <p className="whitespace-pre-wrap">{msg.text}</p>
                {msg.isSimulated && (
                  <span className="text-[10px] text-gray-400 block italic font-mono pt-1">
                    * Generated via Quantum AI Tutor
                  </span>
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center space-x-2 text-xs text-[#FF66CC] animate-pulse font-mono font-bold">
              <Sparkles className="w-4 h-4 text-[#FFC312]" />
              <span>Quantum AI Tutor is computing explanation...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Prompt Chips Bar */}
        <div className="p-3 bg-[#121212] border-t border-white/10 overflow-x-auto whitespace-nowrap space-x-2">
          {promptChips.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(chip)}
              className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-[#C0C0C0] transition-all hover:border-[#A3FF00]"
            >
              <Sparkles className="w-3 h-3 text-[#FFC312]" />
              <span>{chip}</span>
            </button>
          ))}
        </div>

        {/* Input Controls */}
        <div className="p-4 bg-[#1C1C1C] border-t border-white/10 flex items-center space-x-3">
          <input
            type="text"
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder={`Ask AI Tutor about ${activeTopic}...`}
            className="flex-1 bg-[#121212] border border-white/10 rounded-2xl px-4 py-3 text-xs text-white placeholder-gray-500 outline-none focus:border-[#A3FF00] transition-all"
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={isLoading || !inputPrompt.trim()}
            className="px-5 py-3 rounded-2xl bg-[#7F00FF] hover:bg-[#6b00db] text-white text-xs font-black uppercase tracking-wider shadow-lg transition-all active:scale-95 disabled:opacity-50 flex items-center space-x-1 glow-violet"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
