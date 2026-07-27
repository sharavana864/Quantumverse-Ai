import React, { useState, useEffect } from "react";
import {
  X,
  CheckCircle2,
  XCircle,
  Award,
  Sparkles,
  ArrowRight,
  Clock,
  RotateCcw,
  BookOpen,
} from "lucide-react";
import { QuizQuestion } from "../types";
import {
  playCorrectSound,
  playIncorrectSound,
  playAchievementSound,
  playQuizCompleteSound,
} from "../utils/soundEffects";

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  moduleTitle: string;
  lessonTitle: string;
  onQuizComplete: (score: number, total: number) => void;
}

export const QuizModal: React.FC<QuizModalProps> = ({
  isOpen,
  onClose,
  moduleTitle,
  lessonTitle,
  onQuizComplete,
}) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Fetch AI generated or topic quiz questions
  useEffect(() => {
    if (!isOpen) return;

    setIsLoading(true);
    setQuestions([]);
    setCurrentIdx(0);
    setScore(0);
    setQuizFinished(false);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);

    fetch("/api/ai/quiz", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        topic: `${moduleTitle} - ${lessonTitle}`,
        difficulty: "Intermediate",
        questionCount: 3,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.questions && data.questions.length > 0) {
          setQuestions(data.questions);
        } else {
          setQuestions([
            {
              id: "q-fb-1",
              question: "What is the result of applying an H gate to |0⟩?",
              options: [
                "|1⟩",
                "|0⟩",
                "(|0⟩ + |1⟩)/√2",
                "Collapse to ground state"
              ],
              correctIndex: 2,
              explanation: "Hadamard transforms basis state |0⟩ into equal superposition state (|0⟩ + |1⟩)/√2.",
              recommendedTopic: "Hadamard & Superposition"
            }
          ]);
        }
      })
      .catch(() => {
        setQuestions([
          {
            id: "q-fb-1",
            question: "What is the result of applying an H gate to |0⟩?",
            options: ["|1⟩", "|0⟩", "(|0⟩ + |1⟩)/√2", "Collapse to ground state"],
            correctIndex: 2,
            explanation: "Hadamard transforms basis state |0⟩ into equal superposition state (|0⟩ + |1⟩)/√2.",
            recommendedTopic: "Hadamard & Superposition"
          }
        ]);
      })
      .finally(() => setIsLoading(false));
  }, [isOpen, moduleTitle, lessonTitle]);

  if (!isOpen) return null;

  const currentQ = questions[currentIdx];

  const handleSelectOption = (idx: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null || isAnswerSubmitted) return;
    setIsAnswerSubmitted(true);

    if (selectedOption === currentQ.correctIndex) {
      setScore((prev) => prev + 1);
      playCorrectSound();
    } else {
      playIncorrectSound();
    }
  };

  const handleNextQuestion = () => {
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      setQuizFinished(true);
      const finalScore = score + (selectedOption === currentQ?.correctIndex ? 1 : 0);
      if (finalScore === questions.length) {
        playAchievementSound();
      } else {
        playQuizCompleteSound();
      }
      onQuizComplete(finalScore, questions.length);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#1C1C1C] border border-[#7F00FF]/40 rounded-3xl w-full max-w-xl p-6 shadow-2xl text-white space-y-6 relative overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#7F00FF]/20 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 relative z-10">
          <div>
            <span className="text-[10px] font-mono font-bold text-[#A3FF00] uppercase tracking-wider block">
              Adaptive AI Quantum Quiz
            </span>
            <h3 className="text-base font-extrabold uppercase tracking-wider text-white mt-0.5">{moduleTitle}</h3>
            <span className="text-xs text-[#C0C0C0]">{lessonTitle}</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isLoading ? (
          <div className="py-12 flex flex-col items-center justify-center space-y-3 relative z-10">
            <Sparkles className="w-8 h-8 text-[#FFC312] animate-spin-slow" />
            <p className="text-xs text-[#C0C0C0] font-mono">Generating adaptive quantum questions with Gemini...</p>
          </div>
        ) : quizFinished ? (
          /* Quiz Finished Score Screen */
          <div className="py-8 text-center space-y-6 relative z-10">
            <div className="w-16 h-16 rounded-3xl bg-[#7F00FF] border border-[#FF66CC]/30 flex items-center justify-center mx-auto shadow-2xl glow-violet">
              <Award className="w-8 h-8 text-[#A3FF00]" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-black uppercase tracking-wider">Quiz Completed!</h3>
              <p className="text-sm text-[#C0C0C0]">
                You scored <span className="text-[#A3FF00] font-extrabold font-mono text-lg">{score}</span> out of{" "}
                <span className="font-extrabold font-mono text-lg">{questions.length}</span> correct!
              </p>
              <span className="inline-block px-4 py-1.5 rounded-full bg-[#A3FF00]/10 text-[#A3FF00] text-xs font-mono font-black border border-[#A3FF00]/40 uppercase tracking-wider">
                +{score * 50} XP Earned!
              </span>
            </div>

            <button
              onClick={onClose}
              className="px-6 py-3 rounded-2xl bg-[#A3FF00] text-[#121212] hover:bg-[#8ee600] font-black text-xs uppercase tracking-wider shadow-lg glow-lime"
            >
              Continue Learning
            </button>
          </div>
        ) : (
          /* Active Question Screen */
          currentQ && (
            <div className="space-y-6 relative z-10">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[#C0C0C0]">
                  Question {currentIdx + 1} of {questions.length}
                </span>
                <span className="text-[#A3FF00] font-bold">Score: {score}</span>
              </div>

              {/* Question Text */}
              <h4 className="text-base font-bold leading-relaxed">{currentQ.question}</h4>

              {/* Options List */}
              <div className="space-y-2">
                {currentQ.options.map((option, idx) => {
                  let btnStyle = "bg-[#121212] border-white/10 text-gray-200 hover:bg-white/10";

                  if (selectedOption === idx) {
                    btnStyle = "bg-[#7F00FF] border-[#FF66CC]/50 text-white font-bold glow-violet";
                  }

                  if (isAnswerSubmitted) {
                    if (idx === currentQ.correctIndex) {
                      btnStyle = "bg-[#A3FF00]/20 border-[#A3FF00] text-[#A3FF00] font-bold";
                    } else if (selectedOption === idx) {
                      btnStyle = "bg-red-950/60 border-red-500 text-red-300 font-bold";
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      disabled={isAnswerSubmitted}
                      className={`w-full text-left p-3.5 rounded-2xl border text-xs transition-all flex items-center justify-between ${btnStyle}`}
                    >
                      <span>{option}</span>
                      {isAnswerSubmitted && idx === currentQ.correctIndex && (
                        <CheckCircle2 className="w-4 h-4 text-[#A3FF00] shrink-0" />
                      )}
                      {isAnswerSubmitted && selectedOption === idx && idx !== currentQ.correctIndex && (
                        <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Instant Explanation Box */}
              {isAnswerSubmitted && (
                <div className="bg-[#121212] border border-[#7F00FF]/30 rounded-2xl p-4 space-y-2 text-xs">
                  <span className="font-extrabold text-[#A3FF00] uppercase tracking-wider block">Explanation:</span>
                  <p className="text-[#C0C0C0] leading-relaxed">{currentQ.explanation}</p>
                  {selectedOption !== currentQ.correctIndex && (
                    <div className="pt-2 text-[11px] text-[#FF66CC] flex items-center space-x-1 font-mono font-bold">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Recommended Review: {currentQ.recommendedTopic}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Next Controls */}
              <div className="flex justify-end pt-2">
                {!isAnswerSubmitted ? (
                  <button
                    onClick={handleSubmitAnswer}
                    disabled={selectedOption === null}
                    className="px-6 py-3 rounded-2xl bg-[#7F00FF] hover:bg-[#6b00db] text-white font-black text-xs uppercase tracking-wider shadow-lg disabled:opacity-50 glow-violet"
                  >
                    Submit Answer
                  </button>
                ) : (
                  <button
                    onClick={handleNextQuestion}
                    className="px-6 py-3 rounded-2xl bg-[#A3FF00] text-[#121212] hover:bg-[#8ee600] font-black text-xs uppercase tracking-wider shadow-lg flex items-center space-x-2 glow-lime"
                  >
                    <span>{currentIdx + 1 < questions.length ? "Next Question" : "View Results"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};
