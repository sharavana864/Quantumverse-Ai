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
  ArrowRight
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

// Famous Quantum Scientist Quotes Data
const QUANTUM_QUOTES = [
  {
    quote: "If you think you understand quantum mechanics, you don't understand quantum mechanics.",
    author: "Richard Feynman",
    role: "Nobel Laureate in Physics",
    year: "1965",
  },
  {
    quote: "Those who are not shocked when they first come across quantum theory cannot possibly have understood it.",
    author: "Niels Bohr",
    role: "Pioneer of Atomic Model & Quantum Theory",
    year: "1922",
  },
  {
    quote: "The task is not so much to see what no one has yet seen, but to think what nobody has yet thought, about that which everybody sees.",
    author: "Erwin Schrödinger",
    role: "Creator of Wave Mechanics",
    year: "1933",
  },
  {
    quote: "What we observe is not nature itself, but nature exposed to our method of questioning.",
    author: "Werner Heisenberg",
    role: "Formulator of Uncertainty Principle",
    year: "1927",
  },
  {
    quote: "When you change the way you look at things, the things you look at change.",
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
  {
    quote: "A theory with mathematical beauty is more likely to be correct than an ugly one that fits experimental data.",
    author: "Paul Dirac",
    role: "Pioneer of Quantum Electrodynamics",
    year: "1933",
  },
];

// Simplified Dashboard View Component
function DashboardView({
  userProfile,
  theme,
}: {
  userProfile: UserProfile;
  theme: "dark" | "light";
}) {
  const isDark = theme === "dark";
  const [quoteIndex, setQuoteIndex] = useState(0);

  const currentQuote = QUANTUM_QUOTES[quoteIndex];

  const handleNextQuote = () => {
    setQuoteIndex((prev) => (prev + 1) % QUANTUM_QUOTES.length);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className={`rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden border transition-all ${
        isDark
          ? "bg-gradient-to-r from-[#1E122A] via-[#7F00FF]/30 to-[#121212] border-[#7F00FF]/40 text-[#EAEAEA] glow-violet"
          : "bg-gradient-to-r from-[#FAFAFA] via-purple-50 to-white border-[#333333]/20 text-[#1C1C1C] shadow-lg"
      }`}>
        <div className={`absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl pointer-events-none ${
          isDark ? "bg-[#A3FF00]/10" : "bg-[#00B894]/15"
        }`} />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full flex items-center space-x-1 ${
                isDark ? "bg-[#A3FF00] text-[#121212] glow-lime" : "bg-[#00B894] text-white"
              }`}>
                <Flame className="w-3.5 h-3.5 fill-current" />
                <span>Streak: {userProfile.streakDays} Days</span>
              </span>
              <span className={`text-xs font-mono px-3 py-1 rounded-full border ${
                isDark ? "text-[#FF66CC] bg-[#FF66CC]/10 border-[#FF66CC]/30" : "text-[#9B59B6] bg-[#9B59B6]/10 border-[#9B59B6]/30"
              }`}>
                Level {userProfile.level} Quantum Scholar
              </span>
            </div>

            <h1 className={`text-3xl sm:text-4xl font-black tracking-tight uppercase ${
              isDark ? "text-white" : "text-[#1C1C1C]"
            }`}>
              Welcome back, <span className={isDark ? "text-[#A3FF00]" : "text-[#00B894]"}>{userProfile.name}</span>
            </h1>

            <p className={`text-sm leading-relaxed ${isDark ? "text-[#C0C0C0]" : "text-[#333333]"}`}>
              Your quantum learning environment is active. Explore step-by-step modules, simulate quantum circuits, or test your knowledge on interactive playgrounds.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/learn"
              className={`px-6 py-3.5 rounded-2xl font-black text-xs uppercase tracking-wider shadow-xl transition-all flex items-center space-x-2 active:scale-95 ${
                isDark
                  ? "bg-[#A3FF00] text-[#121212] hover:bg-[#8ee600] glow-lime"
                  : "bg-[#00B894] text-white hover:bg-[#00a383] shadow-emerald-500/20"
              }`}
            >
              <Zap className="w-4 h-4 fill-current" />
              <span>Resume Learning Path</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Streamlined Stats Overview: XP, Streak & Daily Milestone */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className={`p-6 rounded-3xl border transition-all ${
          isDark
            ? "bg-[#1C1C1C] border-[#FFC312]/30 text-white"
            : "bg-white border-slate-200 shadow-md text-[#1C1C1C]"
        }`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold font-mono text-[#FFC312] uppercase tracking-wider">Daily Coherence Streak</span>
            <Flame className="w-5 h-5 text-[#FFC312] fill-current" />
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-3xl font-black font-mono">
              {userProfile.streakDays}
            </span>
            <span className="text-xs font-semibold text-[#FFC312]">Days Active</span>
          </div>
          <p className={`text-[11px] mt-1.5 ${isDark ? "text-[#C0C0C0]" : "text-slate-500"}`}>
            Maintain your daily quantum coherence!
          </p>
        </div>

        <div className={`p-6 rounded-3xl border transition-all ${
          isDark
            ? "bg-[#1C1C1C] border-[#A3FF00]/30 text-white"
            : "bg-white border-slate-200 shadow-md text-[#1C1C1C]"
        }`}>
          <div className="flex items-center justify-between">
            <span className={`text-xs font-bold font-mono uppercase tracking-wider ${isDark ? "text-[#A3FF00]" : "text-[#00B894]"}`}>
              Quantum XP Score
            </span>
            <Zap className={`w-5 h-5 fill-current ${isDark ? "text-[#A3FF00]" : "text-[#00B894]"}`} />
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-3xl font-black font-mono">
              {userProfile.totalXP}
            </span>
            <span className={`text-xs font-semibold ${isDark ? "text-[#A3FF00]" : "text-[#00B894]"}`}>XP Earned</span>
          </div>
          <p className={`text-[11px] mt-1.5 ${isDark ? "text-[#C0C0C0]" : "text-slate-500"}`}>
            Level {userProfile.level} Quantum Scholar
          </p>
        </div>

        <div className={`p-6 rounded-3xl border transition-all ${
          isDark
            ? "bg-[#1C1C1C] border-[#7F00FF]/40 text-white"
            : "bg-white border-slate-200 shadow-md text-[#1C1C1C]"
        }`}>
          <div className="flex items-center justify-between">
            <span className={`text-xs font-bold font-mono uppercase tracking-wider ${isDark ? "text-[#FF66CC]" : "text-[#9B59B6]"}`}>
              Daily Goal Target
            </span>
            <Trophy className={`w-5 h-5 ${isDark ? "text-[#FF66CC]" : "text-[#9B59B6]"}`} />
          </div>
          <div className="mt-3 space-y-2">
            <div className="flex justify-between text-xs font-mono font-bold">
              <span>Progress</span>
              <span className={isDark ? "text-[#A3FF00]" : "text-[#00B894]"}>50 / 100 XP</span>
            </div>
            <div className={`w-full h-2 rounded-full overflow-hidden ${isDark ? "bg-black/50" : "bg-slate-200"}`}>
              <div className={`h-full w-1/2 rounded-full ${isDark ? "bg-[#A3FF00]" : "bg-[#00B894]"}`} />
            </div>
          </div>
          <p className={`text-[11px] mt-2 ${isDark ? "text-[#C0C0C0]" : "text-slate-500"}`}>
            Complete 1 quiz or challenge today.
          </p>
        </div>
      </div>

      {/* Quantum Scientist Motivational Quote Component */}
      <div className={`p-6 sm:p-8 rounded-3xl border relative overflow-hidden shadow-xl transition-all ${
        isDark
          ? "bg-[#1C1C1C] border-[#7F00FF]/40 text-[#EAEAEA]"
          : "bg-white border-purple-200 text-[#1C1C1C] shadow-md"
      }`}>
        <Quote className={`absolute -bottom-6 -right-6 w-36 h-36 opacity-10 pointer-events-none ${
          isDark ? "text-[#7F00FF]" : "text-[#9B59B6]"
        }`} />

        <div className="space-y-4 relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className={`p-2 rounded-xl border ${
                isDark ? "bg-[#7F00FF]/20 text-[#A3FF00] border-[#7F00FF]/30" : "bg-purple-100 text-[#9B59B6] border-purple-300"
              }`}>
                <Sparkles className="w-4 h-4" />
              </div>
              <span className={`text-xs font-mono font-extrabold uppercase tracking-widest ${
                isDark ? "text-[#A3FF00]" : "text-[#9B59B6]"
              }`}>
                Quantum Scientist Inspiration
              </span>
            </div>

            <button
              onClick={handleNextQuote}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                isDark
                  ? "bg-black/40 border-white/10 text-[#C0C0C0] hover:text-white hover:bg-white/10"
                  : "bg-slate-100 border-slate-300 text-slate-800 hover:bg-slate-200"
              }`}
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Next Quote</span>
            </button>
          </div>

          <blockquote className="text-base sm:text-lg italic font-serif leading-relaxed">
            "{currentQuote.quote}"
          </blockquote>

          <div className="flex items-center space-x-3 pt-1">
            <div className={`w-9 h-9 rounded-2xl flex items-center justify-center font-mono font-black text-xs shadow-md ${
              isDark ? "bg-[#7F00FF] text-white" : "bg-[#333333] text-white"
            }`}>
              {currentQuote.author[0]}
            </div>
            <div>
              <span className="block font-bold text-sm">
                {currentQuote.author}
              </span>
              <span className={`block text-xs font-mono ${isDark ? "text-[#C0C0C0]" : "text-slate-500"}`}>
                {currentQuote.role} • {currentQuote.year}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Access Navigation Grid */}
      <div className="space-y-4">
        <h3 className={`text-lg font-black uppercase tracking-wider ${isDark ? "text-white" : "text-[#1C1C1C]"}`}>
          Quick Access Hubs
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            {
              path: "/learn",
              title: "Quantum Path",
              desc: "Structured learning tree with XP & level progression.",
              icon: Zap,
            },
            {
              path: "/bloch",
              title: "3D Bloch Sphere",
              desc: "Interactive state vector rotations with gate transformations.",
              icon: Atom,
            },
            {
              path: "/circuit",
              title: "Circuit Builder",
              desc: "Drag and drop quantum gates to design multi-qubit circuits.",
              icon: Workflow,
            },
            {
              path: "/playground",
              title: "Coding Playground",
              desc: "Run Python Qiskit simulations and solve quantum algorithms.",
              icon: Code2,
            },
            {
              path: "/gamification",
              title: "Leaderboard & Badges",
              desc: "Compare your XP and daily coherence streaks with quantum scholars.",
              icon: Trophy,
            },
            {
              path: "/career",
              title: "Career & Research Papers",
              desc: "Explore quantum job listings, internships, and arXiv papers.",
              icon: Briefcase,
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <Link
                key={idx}
                to={item.path}
                className={`p-6 rounded-3xl border transition-all group hover:scale-[1.02] flex flex-col justify-between ${
                  isDark
                    ? "bg-[#1C1C1C] border-white/10 hover:border-[#7F00FF] hover:glow-violet text-white"
                    : "bg-white border-slate-200 shadow-sm hover:border-[#00B894] hover:shadow-md text-[#1C1C1C]"
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-2xl border ${
                      isDark ? "bg-[#7F00FF]/20 text-[#A3FF00] border-[#7F00FF]/30" : "bg-[#00B894]/10 text-[#00B894] border-[#00B894]/20"
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <ArrowRight className={`w-4 h-4 transition-colors ${
                      isDark ? "text-gray-500 group-hover:text-[#A3FF00]" : "text-slate-400 group-hover:text-[#00B894]"
                    }`} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm uppercase tracking-wide">
                      {item.title}
                    </h4>
                    <p className={`text-xs mt-1.5 leading-relaxed ${isDark ? "text-[#C0C0C0]" : "text-slate-600"}`}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
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
        isDark ? "bg-[#1C1C1C] border-[#7F00FF]/30 text-white" : "bg-white border-slate-200 text-[#1C1C1C]"
      }`}>
        <div className={`border-b pb-4 flex items-center justify-between ${isDark ? "border-white/10" : "border-slate-200"}`}>
          <div>
            <h2 className="text-xl font-black uppercase tracking-wider flex items-center space-x-2">
              <Atom className={`w-6 h-6 ${isDark ? "text-[#A3FF00]" : "text-[#00B894]"}`} />
              <span>3D Bloch Sphere Vector Rotator</span>
            </h2>
            <p className={`text-xs mt-1 ${isDark ? "text-[#C0C0C0]" : "text-slate-600"}`}>
              Visualize single-qubit quantum state vector rotations |ψ⟩ = cos(θ/2)|0⟩ + e^(iφ) sin(θ/2)|1⟩.
            </p>
          </div>
        </div>

        <BlochSphere qubitName="q[0]" theme={theme} />
      </div>
    </div>
  );
}

export function App() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    const savedLoggedIn = localStorage.getItem("qv_is_logged_in");
    return savedLoggedIn !== "false"; // Default to true for prototype mode
  });

  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    const savedUser = localStorage.getItem("qv_current_user");
    if (savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch (e) {
        // fallback
      }
    }
    return INITIAL_USER_PROFILE;
  });

  const [selectedModuleId, setSelectedModuleId] = useState<string>("mod-1");

  // Listen for Firebase Auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const profile = await syncUserProfile(firebaseUser);
          setUserProfile(profile);
          setIsLoggedIn(true);
        } catch (err) {
          console.error("Error syncing user profile on auth state change:", err);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  // Save session state to localStorage instantly, and debounce Firestore sync to prevent UI lag
  useEffect(() => {
    localStorage.setItem("qv_is_logged_in", isLoggedIn ? "true" : "false");
    localStorage.setItem("qv_current_user", JSON.stringify(userProfile));

    if (auth.currentUser) {
      const timer = setTimeout(() => {
        saveUserProfileToFirestore(auth.currentUser!.uid, userProfile);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isLoggedIn, userProfile]);

  // Modals
  const [isAITutorOpen, setIsAITutorOpen] = useState<boolean>(false);
  const [aiTutorTopic, setAiTutorTopic] = useState<string>("Quantum Computing Overview");
  const [isQuizOpen, setIsQuizOpen] = useState<boolean>(false);
  const [quizModuleTitle, setQuizModuleTitle] = useState<string>("");
  const [quizLessonTitle, setQuizLessonTitle] = useState<string>("");
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const handleLoginSuccess = (profile: UserProfile) => {
    setUserProfile(profile);
    setIsLoggedIn(true);
    if (auth.currentUser) {
      saveUserProfileToFirestore(auth.currentUser.uid, profile);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error("Sign out error:", err);
    }
    setIsLoggedIn(false);
  };

  const handleOpenAITutorWithTopic = (topic: string) => {
    setAiTutorTopic(topic);
    setIsAITutorOpen(true);
  };

  const handleOpenQuiz = (modTitle: string, lesTitle: string) => {
    setQuizModuleTitle(modTitle);
    setQuizLessonTitle(lesTitle);
    setIsQuizOpen(true);
  };

  const handleQuizComplete = (score: number, total: number) => {
    const xpGained = score * 50;
    if (xpGained > 0) {
      playXpGainSound();
    }
    setUserProfile((prev) => {
      const newXP = prev.totalXP + xpGained;
      const newLevel = Math.floor(newXP / 250) + 1;
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

  const handleChallengeSolved = (challengeId: string, points: number) => {
    playAchievementSound();
    setUserProfile((prev) => {
      const newXP = prev.totalXP + points;
      const newLevel = Math.floor(newXP / 250) + 1;
      return {
        ...prev,
        totalXP: newXP,
        level: newLevel,
        solvedChallengeIds: [...prev.solvedChallengeIds, challengeId],
      };
    });
  };

  const handleGainXP = (xp: number) => {
    if (xp > 0) {
      playXpGainSound();
    }
    setUserProfile((prev) => {
      const newXP = prev.totalXP + xp;
      const newLevel = Math.floor(newXP / 250) + 1;
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

  const handleUpdateProfile = (updated: Partial<UserProfile>) => {
    setUserProfile((prev) => ({ ...prev, ...updated }));
  };

  const isDark = theme === "dark";

  return (
    <BrowserRouter>
      <div className={`min-h-screen font-sans antialiased transition-colors duration-300 ${
        isDark
          ? "bg-[#121212] text-[#EAEAEA] selection:bg-[#7F00FF] selection:text-white"
          : "bg-[#FAFAFA] text-[#1C1C1C] selection:bg-[#00B894] selection:text-white"
      }`}>
        {/* Top Navbar */}
        <Navigation
          userProfile={userProfile}
          onOpenAITutor={() => handleOpenAITutorWithTopic("Quantum Computing Overview")}
          onOpenAuthModal={() => {
            if (!isLoggedIn) {
              setIsLoggedIn(false);
            } else {
              setIsAuthModalOpen(true);
            }
          }}
          onLogout={handleLogout}
          theme={theme}
          onToggleTheme={toggleTheme}
        />

        {/* Main Content Router */}
        <main className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8 overflow-x-hidden">
          {!isLoggedIn ? (
            <LoginPortal
              onLoginSuccess={handleLoginSuccess}
              onExploreGuest={() => setIsLoggedIn(true)}
              theme={theme}
            />
          ) : (
            <Routes>
              <Route
                path="/"
                element={
                  <DashboardView
                    userProfile={userProfile}
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
          )}
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
