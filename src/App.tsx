import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import {
  Layers,
  Code2,
  Atom,
  Workflow,
  Bot,
  Sparkles,
  Flame,
  ChevronRight,
  Zap,
  Trophy,
  Info,
  Quote,
  RefreshCw,
  Cpu,
  Calendar,
  Briefcase,
  User,
  ArrowRight,
  Star,
  BookOpen,
  Compass
} from "lucide-react";
import { Navigation } from "./components/Navigation";
import { BlochSphere } from "./components/BlochSphere";
import { CircuitBuilder } from "./components/CircuitBuilder";
import { CodingPlayground } from "./components/CodingPlayground";
import { AITutorModal } from "./components/AITutorModal";
import { ModuleViewer } from "./components/ModuleViewer";
import { FlashcardsView } from "./components/FlashcardsView";
import { QuizModal } from "./components/QuizModal";
import { ProfileView } from "./components/ProfileView";
import { EventsHub } from "./components/EventsHub";
import { GamificationView } from "./components/GamificationView";
import { CareerGuidance } from "./components/CareerGuidance";
import { AboutView } from "./components/AboutView";
import { AuthModal } from "./components/AuthModal";
import { LoginPortal } from "./components/LoginPortal";

import { MODULES_DATA } from "./data/modulesData";
import { INITIAL_USER_PROFILE } from "./data/userProfile";
import { UserProfile } from "./types";
import { playXpGainSound, playAchievementSound } from "./utils/soundEffects";
import {
  auth,
  signOut,
  syncUserProfile,
  saveUserProfileToFirestore,
  onAuthStateChanged,
} from "./lib/firebase";

// Quantum quotes data
const QUANTUM_QUOTES = [
  {
    quote: "If quantum mechanics hasn't profoundly shocked you, you haven't understood it yet.",
    author: "Niels Bohr",
    role: "Nobel Laureate in Physics",
    year: "1922",
  },
  {
    quote: "I think I can safely say that nobody understands quantum mechanics.",
    author: "Richard Feynman",
    role: "Pioneer of Quantum Computing",
    year: "1965",
  },
  {
    quote: "God does not play dice with the universe.",
    author: "Albert Einstein",
    role: "Theoretical Physicist",
    year: "1926",
  },
  {
    quote: "Science cannot solve the ultimate mystery of nature. And that is because, in the last analysis, we ourselves are a part of mystery that we are trying to solve.",
    author: "Max Planck",
    role: "Father of Quantum Theory",
    year: "1918",
  },
  {
    quote: "Quantum computation is nothing less than a distinctly new way of harnessing nature.",
    author: "David Deutsch",
    role: "Pioneer of Quantum Computation",
    year: "1985",
  },
];

// Dashboard View matching screenshot styling with dark purple theme
function DashboardView({
  userProfile,
  onOpenAITutor,
  theme,
}: {
  userProfile: UserProfile;
  onOpenAITutor?: () => void;
  theme: "dark" | "light";
}) {
  const isDark = theme === "dark";
  const daysOfWeek = ["M", "T", "W", "T", "F", "S", "S"];
  const currentDayIndex = 6;

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10">
      {/* 1. Hero Banner matching reference image */}
      <div className="rounded-3xl p-7 sm:p-10 relative overflow-hidden bg-gradient-to-r from-[#2c1a48] via-[#331c54] to-[#25153e] text-white shadow-xl border border-purple-800/40">
        <div className="max-w-xl space-y-4 relative z-10">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-purple-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Your quantum journey starts here</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
            Master Quantum Computing,{" "}
            <span className="text-[#fcd34d] block sm:inline">one qubit at a time.</span>
          </h1>

          <p className="text-sm sm:text-base text-purple-200/90 leading-relaxed font-normal">
            Structured modules, AI-powered tutoring, hands-on coding, and a community of quantum explorers.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={onOpenAITutor}
              className="px-5 py-3 rounded-xl bg-[#fcd34d] hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-md transition-all flex items-center space-x-2 active:scale-95 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 fill-slate-950" />
              <span>Ask the AI Tutor</span>
            </button>

            <Link
              to="/playground"
              className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 transition-all flex items-center space-x-2 active:scale-95"
            >
              <Code2 className="w-4 h-4 text-purple-200" />
              <span>Open Playground</span>
            </Link>
          </div>
        </div>

        {/* Atom Orbit Watermark Graphic on Right */}
        <div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-20 pointer-events-none hidden md:block">
          <Atom className="w-80 h-80 text-amber-300 animate-spin-slow" />
        </div>
      </div>

      {/* 2. Streak / Day Bar Card */}
      <div className={`p-4 sm:p-5 rounded-2xl border shadow-sm flex flex-col md:flex-row items-center justify-between gap-4 transition-all ${
        isDark ? "bg-[#251638] border-purple-800/40 text-white" : "bg-white border-purple-100/80 text-slate-900"
      }`}>
        <div className="flex items-center space-x-3.5">
          <div className="w-11 h-11 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
            <Flame className="w-6 h-6 fill-emerald-500" />
          </div>
          <div>
            <div className="flex items-baseline space-x-1.5">
              <span className="text-2xl font-black">{userProfile.streakDays}</span>
              <span className="text-sm font-semibold text-slate-500 dark:text-purple-200/70">days</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-purple-200/70 font-medium -mt-0.5">Keep it going!</p>
          </div>
        </div>

        {/* Day circles */}
        <div className="flex items-center space-x-2">
          {daysOfWeek.map((day, idx) => {
            const isToday = idx === currentDayIndex;
            return (
              <div
                key={idx}
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                  isToday
                    ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/30 scale-105"
                    : isDark
                    ? "bg-white/5 text-purple-200/60"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                {isToday ? <Flame className="w-4 h-4 fill-white" /> : day}
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Key Stats Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* Total XP */}
        <div className={`p-5 rounded-2xl border shadow-sm transition-all ${
          isDark ? "bg-[#251638] border-purple-800/40 text-white" : "bg-white border-purple-100/80 text-slate-900"
        }`}>
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-500 flex items-center justify-center">
            <Star className="w-5 h-5 fill-amber-400" />
          </div>
          <div className="text-3xl font-black mt-3">{userProfile.totalXP}</div>
          <div className="text-xs font-semibold text-slate-500 dark:text-purple-200/70 mt-0.5">Total XP</div>
        </div>

        {/* Day Streak */}
        <div className={`p-5 rounded-2xl border shadow-sm transition-all ${
          isDark ? "bg-[#251638] border-purple-800/40 text-white" : "bg-white border-purple-100/80 text-slate-900"
        }`}>
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-500 flex items-center justify-center">
            <Flame className="w-5 h-5 fill-emerald-500" />
          </div>
          <div className="text-3xl font-black mt-3">{userProfile.streakDays}</div>
          <div className="text-xs font-semibold text-slate-500 dark:text-purple-200/70 mt-0.5">Day Streak</div>
        </div>

        {/* Modules Done */}
        <div className={`p-5 rounded-2xl border shadow-sm transition-all ${
          isDark ? "bg-[#251638] border-purple-800/40 text-white" : "bg-white border-purple-100/80 text-slate-900"
        }`}>
          <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-purple-600" />
          </div>
          <div className="text-3xl font-black mt-3">{userProfile.completedLessonIds?.length || 0}</div>
          <div className="text-xs font-semibold text-slate-500 dark:text-purple-200/70 mt-0.5">Modules Done</div>
        </div>

        {/* Challenges */}
        <div className={`p-5 rounded-2xl border shadow-sm transition-all ${
          isDark ? "bg-[#251638] border-purple-800/40 text-white" : "bg-white border-purple-100/80 text-slate-900"
        }`}>
          <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center">
            <Code2 className="w-5 h-5 text-slate-600" />
          </div>
          <div className="text-3xl font-black mt-3">{userProfile.solvedChallengeIds?.length || 0}</div>
          <div className="text-xs font-semibold text-slate-500 dark:text-purple-200/70 mt-0.5">Challenges</div>
        </div>
      </div>

      {/* 4. Your Journey Roadmap Section */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <div>
            <h2 className={`text-xl font-extrabold tracking-tight ${isDark ? "text-white" : "text-slate-900"}`}>
              Your Journey
            </h2>
            <p className="text-xs text-slate-500 dark:text-purple-200/70 font-medium">
              Progress through the quantum modules
            </p>
          </div>
          <Link
            to="/learn"
            className="text-xs font-bold text-purple-700 dark:text-amber-300 hover:underline flex items-center space-x-1"
          >
            <span>Full path</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {MODULES_DATA.slice(0, 3).map((module, idx) => (
            <Link
              key={module.id}
              to="/learn"
              className={`p-6 rounded-2xl border shadow-sm transition-all group hover:scale-[1.02] flex flex-col justify-between ${
                isDark
                  ? "bg-[#251638] border-purple-800/40 text-white hover:border-amber-400/50"
                  : "bg-white border-purple-100/80 text-slate-900 hover:border-purple-300 hover:shadow-md"
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase font-mono px-2.5 py-1 rounded-md bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-amber-300">
                    Module {idx + 1}
                  </span>
                  <span className="text-xs font-bold text-amber-500 flex items-center space-x-1">
                    <Zap className="w-3.5 h-3.5 fill-amber-400" />
                    <span>+{module.lessons.length * 50} XP</span>
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-base group-hover:text-purple-600 dark:group-hover:text-amber-300 transition-colors">
                    {module.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-purple-200/70 mt-1 line-clamp-2">
                    {module.description}
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-gray-100 dark:border-purple-900/30 flex items-center justify-between text-xs font-bold text-purple-700 dark:text-amber-300">
                <span>Start Learning</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

// Standalone Bloch Sphere Page Component
function BlochSpherePage({ theme }: { theme: "dark" | "light" }) {
  const isDark = theme === "dark";
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className={`border rounded-3xl p-6 sm:p-8 shadow-2xl space-y-4 transition-colors ${
        isDark ? "bg-[#251638] border-purple-800/40 text-white" : "bg-white border-slate-200 text-[#1C1C1C]"
      }`}>
        <div className={`border-b pb-4 flex items-center justify-between ${isDark ? "border-purple-800/30" : "border-slate-200"}`}>
          <div>
            <h2 className="text-xl font-black uppercase tracking-wider flex items-center space-x-2">
              <Atom className={`w-6 h-6 ${isDark ? "text-[#fcd34d]" : "text-[#00B894]"}`} />
              <span>3D Bloch Sphere Vector Rotator</span>
            </h2>
            <p className={`text-xs mt-1 ${isDark ? "text-purple-200/70" : "text-slate-600"}`}>
              Visualize single-qubit quantum state vector rotations |ψ⟩ = cos(θ/2)|0⟩ + e^(iφ) sin(θ/2)|1⟩.
            </p>
          </div>
        </div>
        <BlochSphere theme={theme} />
      </div>
    </div>
  );
}

export function App() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);

  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    const savedUser = localStorage.getItem("qv_current_user");
    if (savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch (e) {
        return INITIAL_USER_PROFILE;
      }
    }
    return INITIAL_USER_PROFILE;
  });

  const [selectedModuleId, setSelectedModuleId] = useState<string>("mod-1");

  // Optional background Firebase Auth state listener (non-blocking)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const profile = await syncUserProfile(firebaseUser);
          setUserProfile(profile);
        } catch (err) {
          console.warn("Firebase Auth sync skipped:", err);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  // Save session state to localStorage instantly, and try Firestore sync if logged in on Firebase
  useEffect(() => {
    localStorage.setItem("qv_is_logged_in", "true");
    localStorage.setItem("qv_current_user", JSON.stringify(userProfile));

    if (auth.currentUser) {
      const timer = setTimeout(() => {
        try {
          saveUserProfileToFirestore(auth.currentUser!.uid, userProfile);
        } catch (err) {
          console.warn("Firestore save skipped:", err);
        }
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [userProfile]);

  // Modals
  const [isAITutorOpen, setIsAITutorOpen] = useState<boolean>(false);
  const [aiTutorTopic, setAiTutorTopic] = useState<string>("Quantum Basics");

  const [isQuizOpen, setIsQuizOpen] = useState<boolean>(false);
  const [quizModuleTitle, setQuizModuleTitle] = useState<string>("");
  const [quizLessonTitle, setQuizLessonTitle] = useState<string>("");

  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const handleGainXP = (amount: number, reason: string) => {
    playXpGainSound();
    setUserProfile((prev) => {
      const newXP = prev.totalXP + amount;
      const newLevel = Math.floor(newXP / 100) + 1;
      if (newLevel > prev.level) {
        playAchievementSound();
      }
      return {
        ...prev,
        totalXP: newXP,
        level: newLevel,
      };
    });
  };

  const handleChallengeSolved = (xpAward: number) => {
    handleGainXP(xpAward, "Coding Challenge Solved");
  };

  const handleOpenQuiz = (moduleTitle: string, lessonTitle: string) => {
    setQuizModuleTitle(moduleTitle);
    setQuizLessonTitle(lessonTitle);
    setIsQuizOpen(true);
  };

  const handleQuizComplete = (score: number, total: number) => {
    const earnedXP = Math.round((score / total) * 50);
    handleGainXP(earnedXP, `Quiz Completion: ${score}/${total}`);
  };

  const handleLoginSuccess = (profile: UserProfile) => {
    setUserProfile(profile);
    setIsLoggedIn(true);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.warn("Sign out skipped:", err);
    }
    setUserProfile(INITIAL_USER_PROFILE);
    localStorage.setItem("qv_current_user", JSON.stringify(INITIAL_USER_PROFILE));
  };

  const handleOpenAITutorWithTopic = (topic: string) => {
    setAiTutorTopic(topic);
    setIsAITutorOpen(true);
  };

  const handleUpdateProfile = (updated: Partial<UserProfile>) => {
    setUserProfile((prev) => ({ ...prev, ...updated }));
  };

  const isDark = theme === "dark";

  return (
    <BrowserRouter>
      <div className={`min-h-screen font-sans antialiased transition-colors duration-300 ${
        isDark
          ? "bg-[#1f142e] text-[#EAEAEA] selection:bg-purple-700 selection:text-white"
          : "bg-[#f8f7fa] bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] text-slate-900 selection:bg-[#00B894] selection:text-white"
      }`}>
        {/* Navigation Header with 3-Bars Drawer Side Panel */}
        <Navigation
          userProfile={userProfile}
          onOpenAITutor={() => handleOpenAITutorWithTopic("Quantum Computing Overview")}
          onOpenAuthModal={() => setIsAuthModalOpen(true)}
          onLogout={handleLogout}
          theme={theme}
          onToggleTheme={toggleTheme}
        />

        {/* Main Content Router */}
        <main className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8 overflow-x-hidden">
          <Routes>
            <Route
              path="/login"
              element={
                <LoginPortal
                  onLoginSuccess={handleLoginSuccess}
                  onExploreGuest={() => {}}
                  theme={theme}
                />
              }
            />
            <Route
              path="/"
              element={
                <DashboardView
                  userProfile={userProfile}
                  onOpenAITutor={() => handleOpenAITutorWithTopic("Quantum Computing Overview")}
                  theme={theme}
                />
              }
            />
            <Route
              path="/learn"
              element={
                <ModuleViewer
                  modules={MODULES_DATA}
                  selectedModuleId={selectedModuleId}
                  onSelectModule={setSelectedModuleId}
                  onOpenQuiz={handleOpenQuiz}
                  onOpenAITutorWithTopic={handleOpenAITutorWithTopic}
                  onOpenBlochSphere={() => {}}
                  onOpenCircuitBuilder={() => {}}
                  onGainXP={handleGainXP}
                  theme={theme}
                />
              }
            />
            <Route path="/bloch" element={<BlochSpherePage theme={theme} />} />
            <Route path="/circuit" element={<CircuitBuilder theme={theme} />} />
            <Route
              path="/playground"
              element={<CodingPlayground onChallengeSolved={handleChallengeSolved} theme={theme} />}
            />
            <Route path="/flashcards" element={<FlashcardsView theme={theme} />} />
            <Route path="/gamification" element={<GamificationView userProfile={userProfile} theme={theme} />} />
            <Route path="/events" element={<EventsHub theme={theme} />} />
            <Route path="/career" element={<CareerGuidance theme={theme} />} />
            <Route
              path="/profile"
              element={
                <ProfileView
                  userProfile={userProfile}
                  onUpdateProfile={handleUpdateProfile}
                  onLogout={handleLogout}
                  theme={theme}
                />
              }
            />
            <Route path="/about" element={<AboutView theme={theme} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Modals */}
        <AITutorModal
          isOpen={isAITutorOpen}
          onClose={() => setIsAITutorOpen(false)}
          activeTopic={aiTutorTopic}
        />

        <QuizModal
          isOpen={isQuizOpen}
          onClose={() => setIsQuizOpen(false)}
          moduleTitle={quizModuleTitle}
          lessonTitle={quizLessonTitle}
          onQuizComplete={handleQuizComplete}
        />

        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          userProfile={userProfile}
          onUpdateProfile={handleUpdateProfile}
          theme={theme}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
