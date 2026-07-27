import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
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
  Moon
} from "lucide-react";
import { UserProfile } from "../types";

interface NavigationProps {
  userProfile: UserProfile;
  onOpenAITutor: () => void;
  onOpenAuthModal: () => void;
  theme: "dark" | "light";
  onToggleTheme: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  userProfile,
  onOpenAITutor,
  onOpenAuthModal,
  theme,
  onToggleTheme,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isDark = theme === "dark";

  const navItems = [
    { path: "/", label: "Dashboard", icon: Layers },
    { path: "/learn", label: "Quantum Path", icon: Zap },
    { path: "/bloch", label: "Bloch Sphere", icon: Atom },
    { path: "/circuit", label: "Circuit Builder", icon: Workflow },
    { path: "/playground", label: "Playground", icon: Code2 },
    { path: "/flashcards", label: "Flashcards", icon: Cpu },
    { path: "/gamification", label: "Leaderboard", icon: Trophy },
    { path: "/events", label: "Events", icon: Calendar },
    { path: "/career", label: "Career & Papers", icon: Briefcase },
    { path: "/profile", label: "Profile", icon: User },
    { path: "/about", label: "About", icon: Info },
  ];

  return (
    <header className={`sticky top-0 z-40 backdrop-blur-xl border-b transition-all duration-300 shadow-xl ${
      isDark
        ? "bg-[#121212]/95 border-[#7F00FF]/30 text-[#EAEAEA] shadow-[#7F00FF]/10"
        : "bg-[#FAFAFA]/95 border-[#333333]/15 text-[#1C1C1C] shadow-slate-200/80"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center space-x-3 group shrink-0">
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center p-2 shadow-lg transition-all group-hover:scale-105 ${
              isDark
                ? "bg-gradient-to-br from-[#7F00FF] via-purple-700 to-[#FF66CC] glow-violet"
                : "bg-gradient-to-br from-[#333333] via-[#00B894] to-[#9B59B6] shadow-emerald-500/20"
            }`}>
              <Atom className="w-6 h-6 text-white animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className={`font-black text-lg tracking-wider uppercase font-mono ${
                  isDark ? "text-white" : "text-[#1C1C1C]"
                }`}>
                  QuantumVerse
                </span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-mono font-bold border shadow-sm ${
                  isDark
                    ? "bg-[#7F00FF]/20 text-[#A3FF00] border-[#A3FF00]/40"
                    : "bg-[#00B894]/20 text-[#00B894] border-[#00B894]/40"
                }`}>
                  AI
                </span>
              </div>
              <p className={`text-[9px] -mt-0.5 tracking-widest uppercase font-extrabold ${
                isDark ? "text-[#A3FF00]" : "text-[#00B894]"
              }`}>
                Quantum Learning Ecosystem
              </p>
            </div>
          </Link>

          {/* Centered Minimal Navigation Bar */}
          <nav className="hidden xl:flex items-center space-x-1 bg-black/10 dark:bg-white/5 p-1.5 rounded-2xl border border-white/5 dark:border-white/10">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                      isActive
                        ? isDark
                          ? "bg-[#7F00FF] text-white shadow-lg glow-violet border border-[#FF66CC]/40 scale-[1.02]"
                          : "bg-[#333333] text-white shadow-md border border-[#00B894]/40 scale-[1.02]"
                        : isDark
                        ? "text-[#C0C0C0] hover:text-[#A3FF00] hover:bg-[#7F00FF]/20 hover:shadow-sm"
                        : "text-[#333333] hover:text-[#00B894] hover:bg-[#00B894]/10"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon className={`w-3.5 h-3.5 ${
                        isActive
                          ? isDark ? "text-[#A3FF00]" : "text-[#FFC312]"
                          : isDark ? "text-[#7F00FF]" : "text-[#00B894]"
                      }`} />
                      <span>{item.label}</span>
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* Compact Nav for Medium Displays */}
          <nav className="hidden md:flex xl:hidden items-center space-x-1">
            {navItems.slice(0, 7).map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `p-2 rounded-xl text-xs font-bold transition-all ${
                      isActive
                        ? isDark
                          ? "bg-[#7F00FF] text-white glow-violet border border-[#A3FF00]/40"
                          : "bg-[#333333] text-white border border-[#00B894]/40"
                        : isDark
                        ? "text-[#C0C0C0] hover:text-[#A3FF00] hover:bg-white/10"
                        : "text-[#333333] hover:text-[#00B894] hover:bg-[#00B894]/10"
                    }`
                  }
                  title={item.label}
                >
                  <Icon className={`w-4 h-4 ${isDark ? "text-[#A3FF00]" : "text-[#00B894]"}`} />
                </NavLink>
              );
            })}
          </nav>

          {/* Right Controls */}
          <div className="hidden md:flex items-center space-x-3 shrink-0">
            {/* Animated Theme Switcher */}
            <button
              onClick={onToggleTheme}
              className={`p-2.5 rounded-2xl border transition-all active:scale-95 flex items-center justify-center ${
                isDark
                  ? "bg-[#121212] border-[#7F00FF]/40 text-[#FFC312] hover:border-[#A3FF00] glow-violet"
                  : "bg-white border-[#333333]/20 text-[#333333] hover:border-[#00B894] shadow-sm"
              }`}
              title={isDark ? "Switch to Pearl Light Mode" : "Switch to Graphite Dark Mode"}
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-[#FFC312] animate-pulse" />
              ) : (
                <Moon className="w-4 h-4 text-[#9B59B6]" />
              )}
            </button>

            {/* AI Tutor Launcher */}
            <button
              onClick={onOpenAITutor}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-2xl text-xs font-bold uppercase tracking-wider shadow-lg transition-all border active:scale-95 ${
                isDark
                  ? "bg-gradient-to-r from-[#7F00FF] to-purple-800 text-white border-[#FF66CC]/40 glow-violet"
                  : "bg-gradient-to-r from-[#333333] to-[#00B894] text-white border-[#00B894]/30"
              }`}
            >
              <Bot className={`w-4 h-4 ${isDark ? "text-[#A3FF00]" : "text-[#FFC312]"} animate-bounce`} />
              <span>AI Tutor</span>
              <Sparkles className="w-3 h-3 text-[#FF66CC]" />
            </button>

            {/* Streak & XP Counter */}
            <div className={`flex items-center space-x-2 border rounded-2xl px-3 py-1.5 shadow-sm ${
              isDark ? "bg-[#121212] border-white/10 text-[#EAEAEA]" : "bg-white border-[#333333]/15 text-[#1C1C1C]"
            }`}>
              <div
                className="flex items-center space-x-1 text-[#FFC312] cursor-pointer hover:scale-105 transition-all"
                title={`${userProfile.streakDays}-Day Coherence Streak`}
                onClick={onOpenAuthModal}
              >
                <Flame className="w-4 h-4 fill-[#FFC312]" />
                <span className="text-xs font-black font-mono">{userProfile.streakDays}</span>
              </div>

              <div className={`h-3.5 w-px ${isDark ? "bg-white/20" : "bg-slate-300"}`} />

              <div
                className="flex items-center space-x-1 cursor-pointer hover:scale-105 transition-all"
                title={`${userProfile.totalXP} Quantum XP`}
                onClick={onOpenAuthModal}
              >
                <Zap className={`w-4 h-4 fill-current ${isDark ? "text-[#A3FF00]" : "text-[#00B894]"}`} />
                <span className={`text-xs font-black font-mono ${isDark ? "text-[#A3FF00]" : "text-[#00B894]"}`}>
                  {userProfile.totalXP}
                </span>
              </div>
            </div>

            {/* User Profile Pill */}
            <button
              onClick={onOpenAuthModal}
              className={`flex items-center space-x-2 border rounded-2xl p-1 pr-3 transition-all shadow-sm ${
                isDark
                  ? "bg-[#121212] border-[#7F00FF]/40 hover:border-[#A3FF00]"
                  : "bg-white border-[#333333]/20 hover:border-[#00B894]"
              }`}
            >
              <img
                src={userProfile.avatar}
                alt={userProfile.name}
                className={`w-7 h-7 rounded-xl object-cover ring-2 ${
                  isDark ? "ring-[#A3FF00]" : "ring-[#00B894]"
                }`}
              />
              <div className="text-left leading-none">
                <span className={`block text-xs font-black max-w-[90px] truncate ${
                  isDark ? "text-white" : "text-[#1C1C1C]"
                }`}>
                  {userProfile.name}
                </span>
                <span className={`block text-[9px] font-mono font-extrabold ${
                  isDark ? "text-[#A3FF00]" : "text-[#00B894]"
                }`}>
                  Lvl {userProfile.level}
                </span>
              </div>
            </button>
          </div>

          {/* Mobile Buttons */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={onToggleTheme}
              className={`p-2 rounded-xl border ${
                isDark ? "bg-[#121212] border-[#7F00FF]/40 text-[#FFC312]" : "bg-white border-slate-300 text-slate-800"
              }`}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={onOpenAITutor}
              className={`p-2 rounded-xl text-white border ${
                isDark ? "bg-[#7F00FF] border-[#A3FF00]/40" : "bg-[#333333] border-[#00B894]/40"
              }`}
            >
              <Bot className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-xl ${
                isDark ? "bg-white/10 text-white" : "bg-slate-200 text-slate-900"
              }`}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className={`md:hidden border-b px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top duration-200 ${
          isDark ? "bg-[#121212] border-[#7F00FF]/30 text-white" : "bg-[#FAFAFA] border-slate-200 text-slate-900"
        }`}>
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-white/10">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center space-x-2 p-2.5 rounded-xl text-xs font-bold uppercase transition-all ${
                      isActive
                        ? isDark ? "bg-[#7F00FF] text-white" : "bg-[#333333] text-white"
                        : isDark ? "bg-white/5 text-gray-300" : "bg-slate-100 text-slate-800"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon className={`w-4 h-4 ${isActive ? "text-[#A3FF00]" : "text-[#7F00FF]"}`} />
                      <span>{item.label}</span>
                    </>
                  )}
                </NavLink>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center space-x-3 text-xs font-mono font-bold">
              <span className="flex items-center space-x-1 text-[#FFC312]">
                <Flame className="w-4 h-4 fill-current" />
                <span>{userProfile.streakDays}d Streak</span>
              </span>
              <span className={`flex items-center space-x-1 ${isDark ? "text-[#A3FF00]" : "text-[#00B894]"}`}>
                <Zap className="w-4 h-4 fill-current" />
                <span>{userProfile.totalXP} XP</span>
              </span>
            </div>

            <button
              onClick={() => {
                onOpenAuthModal();
                setMobileMenuOpen(false);
              }}
              className={`flex items-center space-x-2 text-xs font-bold px-3 py-1.5 rounded-xl ${
                isDark ? "bg-white/10 text-white" : "bg-slate-200 text-slate-900"
              }`}
            >
              <User className="w-3.5 h-3.5 text-[#00B894]" />
              <span>{userProfile.name}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
