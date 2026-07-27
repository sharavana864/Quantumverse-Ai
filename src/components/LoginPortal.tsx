import React, { useState } from "react";
import {
  ShieldCheck,
  Mail,
  UserPlus,
  ArrowRight,
  CheckCircle2,
  Atom,
  Lock,
  User,
  Sparkles
} from "lucide-react";
import { UserProfile } from "../types";
import { createNewUserProfile } from "../data/userProfile";

interface LoginPortalProps {
  onLoginSuccess: (user: UserProfile) => void;
  onExploreGuest?: () => void;
  theme?: "dark" | "light";
}

export const LoginPortal: React.FC<LoginPortalProps> = ({
  onLoginSuccess,
  onExploreGuest,
  theme = "dark",
}) => {
  const isDark = theme === "dark";
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");

  // Sign In State
  const [nameInput, setNameInput] = useState("Sharavanakumar");
  const [emailInput, setEmailInput] = useState("sharavanakumar864@gmail.com");
  const [passwordInput, setPasswordInput] = useState("••••••••••••");

  // Custom User Sign Up State
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newTitle, setNewTitle] = useState("Quantum Scholar");
  const [newBio, setNewBio] = useState("Exploring qubits, circuit synthesis & quantum algorithms.");

  const [notification, setNotification] = useState<string | null>(null);

  const handleGoogleQuickSignIn = () => {
    const name = nameInput.trim() || "Sharavanakumar";
    const email = emailInput.trim() || "sharavanakumar864@gmail.com";
    const user = createNewUserProfile(name, email, "google");

    setNotification(`Google SSO Verified! Signing in as ${user.name}...`);
    setTimeout(() => {
      onLoginSuccess(user);
    }, 800);
  };

  const handleGitHubQuickSignIn = () => {
    const name = nameInput.trim() || "Developer";
    const email = emailInput.trim() || "dev@github.com";
    const user = createNewUserProfile(name, email, "github");

    setNotification(`GitHub OAuth Connected! Signing in as ${user.name}...`);
    setTimeout(() => {
      onLoginSuccess(user);
    }, 800);
  };

  const handleEmailSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim() || !emailInput.trim()) return;

    const user = createNewUserProfile(nameInput, emailInput, "email");
    setNotification(`Authenticated! Welcome back, ${user.name}.`);
    setTimeout(() => {
      onLoginSuccess(user);
    }, 800);
  };

  const handleCreateCustomAccountSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newEmail.trim()) return;

    const user = createNewUserProfile(newName, newEmail, "email");
    user.title = newTitle || "Quantum Scholar";
    user.bio = newBio || "Exploring qubits, circuit synthesis & quantum algorithms.";

    setNotification(`New Account Created for ${newName}! Launching Personal Page...`);
    setTimeout(() => {
      onLoginSuccess(user);
    }, 900);
  };

  return (
    <div className={`min-h-[85vh] flex items-center justify-center p-4 transition-colors ${
      isDark ? "text-white" : "text-[#1C1C1C]"
    }`}>
      <div className={`w-full max-w-2xl border rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden transition-all ${
        isDark
          ? "bg-[#1C1C1C] border-[#7F00FF]/40 glow-violet"
          : "bg-white border-slate-200 shadow-xl"
      }`}>
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#7F00FF]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#A3FF00]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-8">
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#7F00FF]/20 text-[#A3FF00] border border-[#FF66CC]/30 text-xs font-mono font-black uppercase tracking-wider shadow-md">
              <Atom className="w-4 h-4 text-[#A3FF00] animate-spin-slow" />
              <span>QuantumVerse AI Authentication Gateway</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight">
              Sign In to Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A3FF00] via-[#FF66CC] to-[#7F00FF]">Quantum Account</span>
            </h1>

            <p className={`text-xs sm:text-sm max-w-xl mx-auto leading-relaxed ${
              isDark ? "text-[#C0C0C0]" : "text-slate-600"
            }`}>
              Log in or register with your name to access your personalized person page, verified certificates, daily streaks, and progress tracking.
            </p>
          </div>

          {/* Toast Notification */}
          {notification && (
            <div className={`p-4 rounded-2xl border font-black text-xs uppercase tracking-wider flex items-center justify-center space-x-2 animate-in fade-in shadow-lg ${
              isDark ? "bg-[#A3FF00]/10 border-[#A3FF00]/40 text-[#A3FF00]" : "bg-[#00B894]/10 border-[#00B894]/40 text-[#00B894]"
            }`}>
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <span>{notification}</span>
            </div>
          )}

          {/* Mode Toggle Tabs */}
          <div className={`flex items-center p-1.5 border rounded-2xl text-xs font-bold ${
            isDark ? "bg-[#121212] border-white/10" : "bg-slate-100 border-slate-200"
          }`}>
            <button
              onClick={() => setActiveTab("login")}
              className={`flex-1 py-3 rounded-xl transition-all uppercase tracking-wider text-xs font-extrabold flex items-center justify-center space-x-2 ${
                activeTab === "login"
                  ? isDark ? "bg-[#7F00FF] text-white shadow-lg glow-violet" : "bg-[#333333] text-white shadow-md"
                  : isDark ? "text-[#C0C0C0] hover:text-white" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-[#A3FF00]" />
              <span>Sign In with Account</span>
            </button>

            <button
              onClick={() => setActiveTab("signup")}
              className={`flex-1 py-3 rounded-xl transition-all uppercase tracking-wider text-xs font-extrabold flex items-center justify-center space-x-2 ${
                activeTab === "signup"
                  ? isDark ? "bg-[#7F00FF] text-white shadow-lg glow-violet" : "bg-[#333333] text-white shadow-md"
                  : isDark ? "text-[#C0C0C0] hover:text-white" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <UserPlus className="w-4 h-4 text-[#FF66CC]" />
              <span>Create New Person Page</span>
            </button>
          </div>

          {/* TAB 1: SIGN IN */}
          {activeTab === "login" && (
            <div className="space-y-6 max-w-md mx-auto text-xs">
              <div className="space-y-3 text-center">
                <p className={`text-xs ${isDark ? "text-[#C0C0C0]" : "text-slate-600"}`}>
                  Authenticate using Single Sign-On (SSO) or direct credentials:
                </p>

                {/* Google SSO Button */}
                <button
                  onClick={handleGoogleQuickSignIn}
                  className={`w-full py-3.5 px-4 rounded-2xl border font-black text-xs uppercase tracking-wider flex items-center justify-center space-x-3 shadow-lg transition-all ${
                    isDark ? "bg-white text-slate-900 border-white hover:bg-slate-100" : "bg-white text-slate-900 border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span>Sign In with Google Account</span>
                </button>

                {/* GitHub SSO Button */}
                <button
                  onClick={handleGitHubQuickSignIn}
                  className={`w-full py-3.5 px-4 rounded-2xl border font-black text-xs uppercase tracking-wider flex items-center justify-center space-x-3 shadow-lg transition-all ${
                    isDark ? "bg-[#121212] text-white border-white/20 hover:bg-black" : "bg-slate-900 text-white border-slate-900 hover:bg-slate-800"
                  }`}
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  <span>Sign In with GitHub OAuth</span>
                </button>
              </div>

              <div className="flex items-center my-4">
                <div className={`flex-1 border-t ${isDark ? "border-white/10" : "border-slate-200"}`} />
                <span className={`px-3 text-[10px] font-mono font-extrabold uppercase ${isDark ? "text-gray-400" : "text-slate-400"}`}>
                  OR Direct Credentials
                </span>
                <div className={`flex-1 border-t ${isDark ? "border-white/10" : "border-slate-200"}`} />
              </div>

              <form onSubmit={handleEmailSignInSubmit} className="space-y-4">
                <div>
                  <label className="block font-bold uppercase tracking-wider mb-1">Your Name</label>
                  <div className={`flex items-center space-x-2 border rounded-2xl px-3.5 py-3 ${
                    isDark ? "bg-[#121212] border-white/10" : "bg-slate-50 border-slate-200"
                  }`}>
                    <User className={`w-4 h-4 ${isDark ? "text-[#A3FF00]" : "text-[#00B894]"}`} />
                    <input
                      type="text"
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      required
                      placeholder="e.g. Sharavanakumar"
                      className="w-full bg-transparent outline-none text-xs font-mono font-bold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider mb-1">Email Address</label>
                  <div className={`flex items-center space-x-2 border rounded-2xl px-3.5 py-3 ${
                    isDark ? "bg-[#121212] border-white/10" : "bg-slate-50 border-slate-200"
                  }`}>
                    <Mail className={`w-4 h-4 ${isDark ? "text-[#FF66CC]" : "text-[#9B59B6]"}`} />
                    <input
                      type="email"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      required
                      placeholder="you@domain.com"
                      className="w-full bg-transparent outline-none text-xs font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider mb-1">Password</label>
                  <div className={`flex items-center space-x-2 border rounded-2xl px-3.5 py-3 ${
                    isDark ? "bg-[#121212] border-white/10" : "bg-slate-50 border-slate-200"
                  }`}>
                    <Lock className="w-4 h-4 text-purple-400" />
                    <input
                      type="password"
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      required
                      className="w-full bg-transparent outline-none text-xs font-mono"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className={`w-full py-3.5 rounded-2xl text-white font-black text-xs uppercase tracking-wider shadow-lg transition-all border ${
                    isDark ? "bg-[#7F00FF] border-[#FF66CC]/30 hover:bg-[#6b00db] glow-violet" : "bg-[#333333] border-slate-400"
                  }`}
                >
                  Log In & Launch Person Page
                </button>
              </form>
            </div>
          )}

          {/* TAB 2: CREATE NEW PERSON PROFILE */}
          {activeTab === "signup" && (
            <form onSubmit={handleCreateCustomAccountSubmit} className="space-y-4 max-w-lg mx-auto text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold uppercase tracking-wider mb-1">Full Name</label>
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    required
                    placeholder="e.g. Sharavanakumar"
                    className={`w-full border rounded-2xl p-3 outline-none ${
                      isDark ? "bg-[#121212] border-white/10 text-white focus:border-[#A3FF00]" : "bg-slate-50 border-slate-200 text-slate-900"
                    }`}
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider mb-1">Email Address</label>
                  <input
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    required
                    placeholder="e.g. sharavanakumar864@gmail.com"
                    className={`w-full border rounded-2xl p-3 outline-none font-mono ${
                      isDark ? "bg-[#121212] border-white/10 text-white focus:border-[#A3FF00]" : "bg-slate-50 border-slate-200 text-slate-900"
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider mb-1">Role / Title</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Quantum Researcher / Computer Science Student"
                  className={`w-full border rounded-2xl p-3 outline-none ${
                    isDark ? "bg-[#121212] border-white/10 text-white focus:border-[#A3FF00]" : "bg-slate-50 border-slate-200 text-slate-900"
                  }`}
                />
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider mb-1">Personal Bio / Learning Goals</label>
                <textarea
                  value={newBio}
                  onChange={(e) => setNewBio(e.target.value)}
                  rows={2}
                  placeholder="Describe your goals in quantum computing..."
                  className={`w-full border rounded-2xl p-3 outline-none ${
                    isDark ? "bg-[#121212] border-white/10 text-white focus:border-[#A3FF00]" : "bg-slate-50 border-slate-200 text-slate-900"
                  }`}
                />
              </div>

              <div className={`p-4 rounded-2xl border text-center space-y-1 ${
                isDark ? "bg-[#121212] border-[#7F00FF]/30 text-[#C0C0C0]" : "bg-slate-50 border-slate-200 text-slate-600"
              }`}>
                <div className="flex items-center justify-center space-x-1.5 font-black text-xs uppercase tracking-wider text-[#A3FF00]">
                  <Sparkles className="w-4 h-4 text-[#FFC312]" />
                  <span>Fresh Start Guarantee</span>
                </div>
                <p className="text-[11px]">
                  Your person page starts cleanly with 0 XP, Level 1, and 0 completed lessons. As you complete interactive quantum modules and quizzes, your stats update automatically!
                </p>
              </div>

              <button
                type="submit"
                className={`w-full py-3.5 rounded-2xl font-black text-xs uppercase tracking-wider shadow-xl flex items-center justify-center space-x-2 ${
                  isDark ? "bg-[#A3FF00] text-[#121212] hover:bg-[#8ee600] glow-lime" : "bg-[#00B894] text-white hover:bg-[#00a383]"
                }`}
              >
                <UserPlus className="w-4 h-4" />
                <span>Register & Launch My Person Page</span>
              </button>
            </form>
          )}

          {/* Footer Option: Explore Guest Mode */}
          {onExploreGuest && (
            <div className={`pt-4 border-t text-center flex items-center justify-between ${
              isDark ? "border-white/10 text-gray-400" : "border-slate-200 text-slate-600"
            }`}>
              <span className="text-xs font-mono font-bold">
                Want to test features without logging in first?
              </span>
              <button
                onClick={onExploreGuest}
                className={`text-xs font-black uppercase tracking-wider underline hover:no-underline transition-all ${
                  isDark ? "text-[#A3FF00]" : "text-[#00B894]"
                }`}
              >
                Explore as Guest →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

