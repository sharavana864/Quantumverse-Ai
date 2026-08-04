import React, { useState, useEffect } from "react";
import {
  Zap,
  Calendar,
  Sparkles,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RefreshCw,
  Code2,
  Award,
  ChevronRight,
  Brain
} from "lucide-react";
import { DailyChallenge, UserProfile } from "../types";
import { FormattedAIText } from "./FormattedAIText";

interface DailyChallengeCardProps {
  userProfile: UserProfile;
  onGainXP: (amount: number, reason: string) => void;
  theme: "dark" | "light";
}

export const DailyChallengeCard: React.FC<DailyChallengeCardProps> = ({
  userProfile,
  onGainXP,
  theme,
}) => {
  const isDark = theme === "dark";
  const todayStr = new Date().toISOString().split("T")[0];

  const [challenge, setChallenge] = useState<DailyChallenge | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [errorFeedback, setErrorFeedback] = useState<string | null>(null);

  // Check if solved today
  const isSolvedToday =
    userProfile.solvedDailyChallengeDates?.includes(todayStr) ||
    localStorage.getItem(`qv_daily_solved_${todayStr}`) === "true";

  const fetchDailyChallenge = async () => {
    setLoading(true);
    setErrorFeedback(null);
    try {
      const res = await fetch("/api/ai/daily-challenge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dateStr: todayStr }),
      });
      const data = await res.json();
      if (data.challenge) {
        setChallenge(data.challenge);
      }
    } catch (err) {
      console.error("Failed to fetch daily challenge:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDailyChallenge();
  }, [todayStr]);

  const handleSubmit = () => {
    if (selectedOption === null || !challenge) return;

    if (selectedOption === challenge.correctIndex) {
      setIsCorrect(true);
      setIsSubmitted(true);
      setErrorFeedback(null);

      if (!isSolvedToday) {
        localStorage.setItem(`qv_daily_solved_${todayStr}`, "true");
        onGainXP(
          challenge.xpReward || 75,
          `Daily Challenge Solved: ${challenge.title}`
        );
      }
    } else {
      setIsCorrect(false);
      setIsSubmitted(true);
      setErrorFeedback(
        "Incorrect answer! Review the code snippet or check the hint for guidance."
      );
    }
  };

  const handleTryAgain = () => {
    setSelectedOption(null);
    setIsSubmitted(false);
    setErrorFeedback(null);
  };

  const formattedDate = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div
      className={`rounded-3xl border p-6 sm:p-8 shadow-xl relative overflow-hidden transition-all ${
        isDark
          ? "bg-gradient-to-br from-[#27173e] via-[#201235] to-[#1a0f2c] border-purple-800/40 text-white"
          : "bg-gradient-to-br from-white via-purple-50/40 to-slate-50 border-purple-200/80 text-slate-900"
      }`}
    >
      {/* Background Accent glow */}
      <div className="absolute -top-16 -right-16 w-48 h-48 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-purple-800/30">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-400/20 border border-amber-400/30 flex items-center justify-center text-amber-300">
            <Zap className="w-5 h-5 fill-amber-300" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 font-mono">
                Daily Challenge
              </span>
              <span className="text-xs text-slate-400 font-semibold flex items-center space-x-1">
                <Calendar className="w-3 h-3 text-purple-300" />
                <span>{formattedDate}</span>
              </span>
            </div>
            <h2 className="text-xl font-extrabold tracking-tight mt-0.5">
              {loading ? "Generating Today's Quantum Puzzle..." : challenge?.title || "Daily Quantum Puzzle"}
            </h2>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {challenge?.difficulty && (
            <span
              className={`text-xs font-bold px-3 py-1 rounded-full border ${
                challenge.difficulty === "Easy"
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                  : challenge.difficulty === "Hard"
                  ? "bg-rose-500/10 text-rose-400 border-rose-500/30"
                  : "bg-amber-500/10 text-amber-300 border-amber-500/30"
              }`}
            >
              {challenge.difficulty}
            </span>
          )}

          <div className="flex items-center space-x-1 text-xs font-black px-3 py-1 rounded-full bg-purple-500/20 text-amber-300 border border-purple-400/30">
            <Sparkles className="w-3.5 h-3.5 fill-amber-300" />
            <span>+{challenge?.xpReward || 75} XP</span>
          </div>

          <button
            onClick={fetchDailyChallenge}
            disabled={loading}
            title="Generate a new AI challenge"
            className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-purple-200 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {/* Main Body */}
      {loading ? (
        <div className="py-12 flex flex-col items-center justify-center space-y-3">
          <Brain className="w-8 h-8 text-amber-300 animate-pulse" />
          <p className="text-xs font-semibold text-purple-200">
            Quantum AI synthesis in progress...
          </p>
        </div>
      ) : challenge ? (
        <div className="pt-5 space-y-5">
          {/* Solved Banner if completed today */}
          {isSolvedToday && (
            <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 flex items-center justify-between text-xs font-bold">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>You completed today's Daily Challenge! +{challenge.xpReward || 75} Bonus XP Earned</span>
              </div>
              <span className="text-[11px] font-mono opacity-80">Completed</span>
            </div>
          )}

          {/* Problem Statement */}
          <div className="space-y-2">
            <p className="text-sm leading-relaxed text-purple-100 font-medium">
              {challenge.description}
            </p>
          </div>

          {/* Optional Code Snippet */}
          {challenge.codeSnippet && (
            <div className="p-4 rounded-2xl bg-[#0d0718] border border-purple-800/50 font-mono text-xs text-[#A3FF00] overflow-x-auto relative group">
              <div className="flex items-center justify-between text-[10px] text-gray-500 font-bold uppercase mb-2">
                <span className="flex items-center space-x-1">
                  <Code2 className="w-3 h-3 text-amber-300" />
                  <span>Python / Qiskit Snippet</span>
                </span>
              </div>
              <pre className="whitespace-pre">{challenge.codeSnippet}</pre>
            </div>
          )}

          {/* Multiple Choice Options */}
          <div className="space-y-2.5">
            <label className="text-xs font-extrabold uppercase tracking-wider text-purple-300 block">
              Select Your Answer:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {challenge.options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrectOption = idx === challenge.correctIndex;
                let optionStyle = isDark
                  ? "bg-white/5 border-purple-800/40 text-purple-100 hover:bg-white/10 hover:border-purple-600/60"
                  : "bg-white border-purple-100 text-slate-800 hover:bg-purple-50/50 hover:border-purple-300";

                if (isSelected) {
                  optionStyle = isDark
                    ? "bg-purple-600/30 border-amber-400 text-white font-semibold ring-2 ring-amber-400/30"
                    : "bg-purple-100 border-purple-600 text-purple-950 font-semibold ring-2 ring-purple-400/30";
                }

                if (isSubmitted && isCorrect && isCorrectOption) {
                  optionStyle = "bg-emerald-500/20 border-emerald-400 text-emerald-200 font-bold";
                } else if (isSubmitted && !isCorrect && isSelected) {
                  optionStyle = "bg-rose-500/20 border-rose-400 text-rose-200 font-bold";
                }

                return (
                  <button
                    key={idx}
                    onClick={() => {
                      if (!isSubmitted || !isCorrect) {
                        setSelectedOption(idx);
                        setIsSubmitted(false);
                      }
                    }}
                    className={`p-3.5 rounded-2xl border text-left text-xs transition-all flex items-start space-x-3 ${optionStyle}`}
                  >
                    <span className="w-5 h-5 rounded-full border border-purple-400/40 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="leading-snug">{opt}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Error / Incorrect Feedback */}
          {isSubmitted && !isCorrect && errorFeedback && (
            <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-medium flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{errorFeedback}</span>
              </div>
              <button
                onClick={handleTryAgain}
                className="px-3 py-1 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 font-bold text-[11px] transition-colors shrink-0"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Success / Explanation View */}
          {isSubmitted && isCorrect && (
            <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-2.5 animate-in fade-in">
              <div className="flex items-center space-x-2 text-emerald-400 font-black text-sm">
                <Award className="w-5 h-5 fill-emerald-400" />
                <span>Automated Validation: Correct Solution!</span>
              </div>
              <div className="text-xs text-purple-100 leading-relaxed">
                <FormattedAIText content={challenge.explanation} isDark={isDark} />
              </div>
            </div>
          )}

          {/* Hint Section */}
          {challenge.hint && (
            <div>
              <button
                onClick={() => setShowHint(!showHint)}
                className="text-xs font-bold text-amber-300 hover:underline flex items-center space-x-1"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>{showHint ? "Hide Hint" : "Need a Hint?"}</span>
              </button>

              {showHint && (
                <div className="mt-2 p-3.5 rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-200 text-xs leading-relaxed italic">
                  💡 {challenge.hint}
                </div>
              )}
            </div>
          )}

          {/* Submit Action Bar */}
          {(!isSubmitted || !isCorrect) && (
            <div className="pt-2 flex justify-end">
              <button
                onClick={handleSubmit}
                disabled={selectedOption === null}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-extrabold text-xs shadow-lg shadow-amber-500/20 transition-all flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer active:scale-95"
              >
                <span>Submit Answer & Validate</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="py-6 text-center text-xs text-purple-200">
          Failed to load today's challenge. Please click refresh.
        </div>
      )}
    </div>
  );
};

export default DailyChallengeCard;
