import React, { useState, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import {
  Atom,
  Cpu,
  Workflow,
  Code2,
  Bot,
  Layers,
  Calendar,
  User,
  Trophy,
  Briefcase,
  Flame,
  Zap,
  Sparkles,
  Menu,
  X,
  Info,
  Sun,
  Moon,
  LogOut,
  ChevronRight,
  Compass
} from "lucide-react";
import { UserProfile } from "../types";

interface NavigationProps {
  userProfile: UserProfile;
  onOpenAITutor: () => void;
  onOpenAuthModal: () => void;
  onLogout?: () => void;
  theme: "dark" | "light";
  onToggleTheme: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  userProfile,
  onOpenAITutor,
  onOpenAuthModal,
  onLogout,
  theme,
  onToggleTheme,
}) => {
  const [sidePanelOpen, setSidePanelOpen] = useState(false);
  const isDark = theme === "dark";
  const location = useLocation();

  // Close side panel when route changes
  useEffect(() => {
    setSidePanelOpen(false);
  }, [location.pathname]);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSidePanelOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Categorized Navigation Sections
  const navCategories = [
    {
      title: "Core Quantum Studio",
      items: [
        { path: "/", label: "Dashboard", desc: "Overview & Quick Access", icon: Layers },
        { path: "/learn", label: "Quantum Path", desc: "Interactive Learning Modules", icon: Zap },
        { path: "/bloch", label: "3D Bloch Sphere", desc: "Qubit State Vector Sandbox", icon: Atom },
        { path: "/circuit", label: "Circuit Builder", desc: "Drag-&-Drop Quantum Simulator", icon: Workflow },
        { path: "/playground", label: "Code Playground", desc: "Qiskit & Python Quantum IDE", icon: Code2 },
        { path: "/flashcards", label: "Quantum Flashcards", desc: "Spaced Repetition Review", icon: Cpu },
      ]
    },
    {
      title: "Ecosystem & Growth",
      items: [
        { path: "/gamification", label: "Leaderboard & XP", desc: "Ranks, Badges & Streaks", icon: Trophy },
        { path: "/events", label: "Events & Hackathons", desc: "Conferences & Competitions", icon: Calendar },
        { path: "/career", label: "Career & Papers", desc: "Research Papers & Jobs", icon: Briefcase },
      ]
    },
    {
      title: "Account & System",
      items: [
        { path: "/profile", label: "Scholar Profile", desc: "Stats, Certs & Settings", icon: User },
        { path: "/about", label: "About QuantumVerse", desc: "Platform Mission & Specs", icon: Info },
      ]
    }
  ];

  // Primary top items for desktop top-bar
  const topQuickItems = [
    { path: "/", label: "Dashboard", icon: Layers },
    { path: "/learn", label: "Learn", icon: Zap },
    { path: "/bloch", label: "Bloch", icon: Atom },
    { path: "/circuit", label: "Circuit", icon: Workflow },
    { path: "/playground", label: "IDE", icon: Code2 },
  ];

  return (
    <>
      <header className={`sticky top-0 z-40 backdrop-blur-xl border-b transition-all duration-300 shadow-xl ${
        isDark
          ? "bg-[#251638]/95 border-purple-800/30 text-[#EAEAEA] shadow-purple-950/20"
          : "bg-[#FAFAFA]/95 border-[#333333]/15 text-[#1C1C1C] shadow-slate-200/80"
      }`}>
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-2">
            
            {/* Left: Three-Bars Menu Trigger & Brand Logo */}
            <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
              {/* Three Bars Menu Button (Main Side Panel Toggle for Web & Mobile) */}
              <button
                onClick={() => setSidePanelOpen(true)}
                className={`flex items-center space-x-1.5 px-2.5 py-2 rounded-2xl border transition-all active:scale-95 group ${
                  isDark
                    ? "bg-[#1d112d] border-purple-700/40 text-white hover:border-[#fcd34d] hover:bg-purple-900/30"
                    : "bg-white border-[#333333]/20 text-[#1C1C1C] hover:border-[#00B894] hover:bg-[#00B894]/10 shadow-sm"
                }`}
                title="Open Navigation Side Panel (3-Bars Menu)"
              >
                <Menu className={`w-5 h-5 transition-transform group-hover:scale-110 ${
                  isDark ? "text-[#fcd34d]" : "text-[#00B894]"
                }`} />
                <span className="hidden sm:inline-block text-xs font-black uppercase tracking-wider">
                  Menu
                </span>
              </button>

              {/* Brand Logo */}
              <Link to="/" className="flex items-center space-x-2.5 group">
                <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-2xl flex items-center justify-center p-1.5 sm:p-2 shadow-lg transition-all group-hover:scale-105 ${
                  isDark
                    ? "bg-gradient-to-br from-purple-700 via-indigo-800 to-amber-500 shadow-purple-900/40"
                    : "bg-gradient-to-br from-[#333333] via-[#00B894] to-[#9B59B6] shadow-emerald-500/20"
                }`}>
                  <Atom className="w-5 h-5 sm:w-6 sm:h-6 text-white animate-spin-slow" />
                </div>
                <div>
                  <div className="flex items-center space-x-1">
                    <span className={`font-black text-base sm:text-lg tracking-wider uppercase font-mono ${
                      isDark ? "text-white" : "text-[#1C1C1C]"
                    }`}>
                      QuantumVerse
                    </span>
                    <span className={`text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded-md font-mono font-bold border shadow-sm ${
                      isDark
                        ? "bg-purple-900/40 text-[#fcd34d] border-[#fcd34d]/40"
                        : "bg-[#00B894]/20 text-[#00B894] border-[#00B894]/40"
                    }`}>
                      AI
                    </span>
                  </div>
                  <p className={`text-[8px] sm:text-[9px] -mt-0.5 tracking-widest uppercase font-extrabold ${
                    isDark ? "text-[#fcd34d]" : "text-[#00B894]"
                  }`}>
                    Quantum Ecosystem
                  </p>
                </div>
              </Link>
            </div>

            {/* Center Quick Navigation Bar (Desktop) */}
            <nav className="hidden lg:flex items-center space-x-1 bg-black/20 dark:bg-white/5 p-1.5 rounded-2xl border border-white/5 dark:border-white/10">
              {topQuickItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                        isActive
                          ? isDark
                            ? "bg-purple-800 text-white shadow-lg border border-purple-500/40 scale-[1.02]"
                            : "bg-[#333333] text-white shadow-md border border-[#00B894]/40 scale-[1.02]"
                          : isDark
                          ? "text-purple-200/80 hover:text-[#fcd34d] hover:bg-purple-900/30"
                          : "text-[#333333] hover:text-[#00B894] hover:bg-[#00B894]/10"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <Icon className={`w-3.5 h-3.5 ${
                          isActive
                            ? isDark ? "text-[#fcd34d]" : "text-[#FFC312]"
                            : isDark ? "text-purple-300" : "text-[#00B894]"
                        }`} />
                        <span>{item.label}</span>
                      </>
                    )}
                  </NavLink>
                );
              })}

              <button
                onClick={() => setSidePanelOpen(true)}
                className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                  isDark
                    ? "text-[#fcd34d] hover:bg-purple-900/30 border border-[#fcd34d]/30"
                    : "text-[#00B894] hover:bg-[#00B894]/15 border border-[#00B894]/30"
                }`}
                title="See all modules in side panel"
              >
                <Compass className="w-3.5 h-3.5" />
                <span>All Modules</span>
              </button>
            </nav>

            {/* Right Controls */}
            <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
              {/* Theme Switcher */}
              <button
                onClick={onToggleTheme}
                className={`p-2 sm:p-2.5 rounded-2xl border transition-all active:scale-95 flex items-center justify-center ${
                  isDark
                    ? "bg-[#1d112d] border-purple-800/40 text-[#fcd34d] hover:border-[#fcd34d]"
                    : "bg-white border-[#333333]/20 text-[#333333] hover:border-[#00B894] shadow-sm"
                }`}
                title={isDark ? "Switch to Pearl Light Mode" : "Switch to Deep Purple Dark Mode"}
              >
                {isDark ? (
                  <Sun className="w-4 h-4 text-[#fcd34d]" />
                ) : (
                  <Moon className="w-4 h-4 text-[#9B59B6]" />
                )}
              </button>

              {/* AI Tutor Launcher */}
              <button
                onClick={onOpenAITutor}
                className={`flex items-center space-x-1.5 sm:space-x-2 px-2.5 sm:px-3.5 py-2 rounded-2xl text-xs font-bold uppercase tracking-wider shadow-lg transition-all border active:scale-95 ${
                  isDark
                    ? "bg-gradient-to-r from-purple-800 via-indigo-900 to-purple-900 text-white border-purple-500/40"
                    : "bg-gradient-to-r from-[#333333] to-[#00B894] text-white border-[#00B894]/30"
                }`}
              >
                <Bot className={`w-4 h-4 ${isDark ? "text-[#fcd34d]" : "text-[#FFC312]"} animate-bounce`} />
                <span className="hidden sm:inline-block">AI Tutor</span>
                <Sparkles className="w-3 h-3 text-amber-300" />
              </button>

              {/* Streak & XP Counter */}
              <div className={`hidden sm:flex items-center space-x-2 border rounded-2xl px-3 py-1.5 shadow-sm ${
                isDark ? "bg-[#1d112d] border-purple-800/30 text-[#EAEAEA]" : "bg-white border-[#333333]/15 text-[#1C1C1C]"
              }`}>
                <div
                  className="flex items-center space-x-1 text-[#fcd34d] cursor-pointer hover:scale-105 transition-all"
                  title={`${userProfile.streakDays}-Day Coherence Streak`}
                  onClick={onOpenAuthModal}
                >
                  <Flame className="w-4 h-4 fill-[#fcd34d]" />
                  <span className="text-xs font-black font-mono">{userProfile.streakDays}</span>
                </div>

                <div className={`h-3.5 w-px ${isDark ? "bg-white/20" : "bg-slate-300"}`} />

                <div
                  className="flex items-center space-x-1 cursor-pointer hover:scale-105 transition-all"
                  title={`${userProfile.totalXP} Quantum XP`}
                  onClick={onOpenAuthModal}
                >
                  <Zap className={`w-4 h-4 fill-current ${isDark ? "text-[#fcd34d]" : "text-[#00B894]"}`} />
                  <span className={`text-xs font-black font-mono ${isDark ? "text-[#fcd34d]" : "text-[#00B894]"}`}>
                    {userProfile.totalXP}
                  </span>
                </div>
              </div>

              {/* User Profile Pill */}
              <button
                onClick={onOpenAuthModal}
                className={`flex items-center space-x-2 border rounded-2xl p-1 pr-2.5 sm:pr-3 transition-all shadow-sm ${
                  isDark
                    ? "bg-[#1d112d] border-purple-800/40 hover:border-[#fcd34d]"
                    : "bg-white border-[#333333]/20 hover:border-[#00B894]"
                }`}
                title="View & edit account details"
              >
                <img
                  src={userProfile.avatar}
                  alt={userProfile.name}
                  className={`w-7 h-7 rounded-xl object-cover ring-2 ${
                    isDark ? "ring-[#fcd34d]" : "ring-[#00B894]"
                  }`}
                />
                <div className="text-left leading-none hidden sm:block">
                  <span className={`block text-xs font-black max-w-[90px] truncate ${
                    isDark ? "text-white" : "text-[#1C1C1C]"
                  }`}>
                    {userProfile.name}
                  </span>
                  <span className={`block text-[9px] font-mono font-extrabold ${
                    isDark ? "text-[#fcd34d]" : "text-[#00B894]"
                  }`}>
                    Lvl {userProfile.level}
                  </span>
                </div>
              </button>

              {/* Logout Button */}
              {onLogout && (
                <button
                  onClick={onLogout}
                  className={`p-2 rounded-2xl border transition-all hover:scale-105 active:scale-95 ${
                    isDark
                      ? "bg-[#1d112d] border-rose-500/30 text-rose-400 hover:bg-rose-950/40"
                      : "bg-rose-50 border-rose-200 text-rose-600 hover:bg-rose-100"
                  }`}
                  title="Switch Person / Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              )}
            </div>

          </div>
        </div>
      </header>

      {/* Slide-Out Navigation Side Panel (Drawer for Web & Mobile) */}
      {sidePanelOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop Overlay */}
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
            onClick={() => setSidePanelOpen(false)}
          />

          {/* Drawer Sidebar Container */}
          <div className={`fixed top-0 left-0 bottom-0 w-80 max-w-[88vw] shadow-2xl flex flex-col z-50 animate-in slide-in-from-left duration-300 ${
            isDark
              ? "bg-[#251638] border-r border-purple-800/40 text-[#EAEAEA]"
              : "bg-[#FAFAFA] border-r border-[#333333]/20 text-[#1C1C1C]"
          }`}>
            
            {/* Side Panel Header */}
            <div className={`p-4 border-b flex items-center justify-between ${
              isDark ? "border-purple-800/30 bg-[#1d112d]" : "border-slate-200 bg-white"
            }`}>
              <div className="flex items-center space-x-2.5">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center p-1.5 shadow-md ${
                  isDark ? "bg-gradient-to-br from-purple-700 to-amber-500" : "bg-gradient-to-br from-[#333333] to-[#00B894]"
                }`}>
                  <Atom className="w-5 h-5 text-white animate-spin-slow" />
                </div>
                <div>
                  <h3 className="font-mono font-black uppercase text-sm tracking-wide">
                    QuantumVerse <span className={isDark ? "text-[#fcd34d]" : "text-[#00B894]"}>AI</span>
                  </h3>
                  <p className="text-[10px] uppercase tracking-wider text-purple-200/60 font-bold">
                    Navigation Panel
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSidePanelOpen(false)}
                className={`p-2 rounded-xl transition-all hover:scale-105 active:scale-95 ${
                  isDark ? "bg-white/10 hover:bg-white/20 text-white" : "bg-slate-200 hover:bg-slate-300 text-slate-800"
                }`}
                title="Close Side Panel"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* User Profile Card Inside Side Panel */}
            <div className={`p-4 mx-3 my-3 rounded-2xl border shadow-sm ${
              isDark
                ? "bg-gradient-to-br from-[#2c1a48] to-[#1d112d] border-purple-800/40"
                : "bg-gradient-to-br from-white to-slate-50 border-slate-200"
            }`}>
              <div className="flex items-center space-x-3">
                <img
                  src={userProfile.avatar}
                  alt={userProfile.name}
                  className={`w-11 h-11 rounded-2xl object-cover ring-2 ${
                    isDark ? "ring-[#fcd34d]" : "ring-[#00B894]"
                  }`}
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-sm truncate">{userProfile.name}</h4>
                  <p className={`text-xs font-medium truncate ${isDark ? "text-purple-200/80" : "text-gray-600"}`}>
                    {userProfile.title || "Quantum Scholar"}
                  </p>
                  <div className="flex items-center space-x-3 mt-1 text-[11px] font-mono font-bold">
                    <span className="flex items-center space-x-1 text-[#fcd34d]">
                      <Flame className="w-3.5 h-3.5 fill-current" />
                      <span>{userProfile.streakDays}d Streak</span>
                    </span>
                    <span className={`flex items-center space-x-1 ${isDark ? "text-[#fcd34d]" : "text-[#00B894]"}`}>
                      <Zap className="w-3.5 h-3.5 fill-current" />
                      <span>{userProfile.totalXP} XP</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Categorized Navigation List */}
            <div className="flex-1 overflow-y-auto px-3 py-2 space-y-5">
              {navCategories.map((category) => (
                <div key={category.title} className="space-y-1">
                  <h5 className={`px-3 text-[10px] font-mono font-black uppercase tracking-widest ${
                    isDark ? "text-[#fcd34d]" : "text-[#00B894]"
                  }`}>
                    {category.title}
                  </h5>

                  <div className="space-y-1 mt-1.5">
                    {category.items.map((item) => {
                      const Icon = item.icon;
                      return (
                        <NavLink
                          key={item.path}
                          to={item.path}
                          onClick={() => setSidePanelOpen(false)}
                          className={({ isActive }) =>
                            `flex items-center justify-between p-2.5 rounded-2xl transition-all group ${
                              isActive
                                ? isDark
                                  ? "bg-purple-800 text-white shadow-lg border border-purple-500/30 font-bold"
                                  : "bg-[#333333] text-white shadow-md font-bold"
                                : isDark
                                ? "hover:bg-white/10 text-purple-200/80 hover:text-white"
                                : "hover:bg-slate-100 text-slate-700 hover:text-slate-900"
                            }`
                          }
                        >
                          {({ isActive }) => (
                            <>
                              <div className="flex items-center space-x-3">
                                <div className={`p-2 rounded-xl ${
                                  isActive
                                    ? "bg-white/20 text-white"
                                    : isDark
                                    ? "bg-white/5 text-[#fcd34d] group-hover:bg-purple-900/30"
                                    : "bg-slate-100 text-[#00B894] group-hover:bg-[#00B894]/20"
                                }`}>
                                  <Icon className="w-4 h-4" />
                                </div>
                                <div>
                                  <div className="text-xs font-bold uppercase tracking-wide">
                                    {item.label}
                                  </div>
                                  <div className={`text-[10px] font-normal leading-tight ${
                                    isActive ? "text-white/80" : isDark ? "text-purple-300/70" : "text-gray-500"
                                  }`}>
                                    {item.desc}
                                  </div>
                                </div>
                              </div>
                              <ChevronRight className={`w-4 h-4 transition-transform group-hover:translate-x-0.5 ${
                                isActive ? "text-white" : isDark ? "text-purple-400" : "text-gray-400"
                              }`} />
                            </>
                          )}
                        </NavLink>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Drawer Footer Actions */}
            <div className={`p-4 border-t space-y-2 ${
              isDark ? "border-purple-800/30 bg-[#1d112d]" : "border-slate-200 bg-white"
            }`}>
              <button
                onClick={() => {
                  onOpenAITutor();
                  setSidePanelOpen(false);
                }}
                className={`w-full flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider text-white shadow-md transition-all ${
                  isDark ? "bg-gradient-to-r from-purple-800 to-indigo-900" : "bg-gradient-to-r from-[#333333] to-[#00B894]"
                }`}
              >
                <Bot className="w-4 h-4 text-[#fcd34d] animate-bounce" />
                <span>Launch AI Tutor Assistant</span>
              </button>

              <div className="flex items-center justify-between pt-1">
                <button
                  onClick={onToggleTheme}
                  className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-xl border text-xs font-bold ${
                    isDark ? "bg-white/5 border-white/10 text-[#fcd34d]" : "bg-slate-100 border-slate-200 text-slate-800"
                  }`}
                >
                  {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                  <span>{isDark ? "Light Theme" : "Dark Theme"}</span>
                </button>

                {onLogout && (
                  <button
                    onClick={() => {
                      if (onLogout) onLogout();
                      setSidePanelOpen(false);
                    }}
                    className="ml-2 p-2 rounded-xl bg-rose-500/10 text-rose-500 border border-rose-500/20 hover:bg-rose-500/20 text-xs font-bold"
                    title="Switch Person / Logout"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
