import React, { useState } from "react";
import { ShieldCheck, Flame, Zap, CheckCircle2, X, Mail, Sparkles, UserCheck } from "lucide-react";
import { UserProfile } from "../types";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile;
  onUpdateProfile: (updated: Partial<UserProfile>) => void;
  theme?: "dark" | "light";
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  userProfile,
  onUpdateProfile,
  theme = "dark",
}) => {
  const isDark = theme === "dark";
  const [activeTab, setActiveTab] = useState<"status" | "login" | "edit">("status");
  const [emailInput, setEmailInput] = useState(userProfile.email || "sharavanakumar864@gmail.com");
  const [passwordInput, setPasswordInput] = useState("••••••••••••");
  
  // Edit profile state
  const [name, setName] = useState(userProfile.name);
  const [title, setTitle] = useState(userProfile.title);
  const [bio, setBio] = useState(userProfile.bio);
  const [github, setGithub] = useState(userProfile.githubUsername);
  const [linkedin, setLinkedin] = useState(userProfile.linkedinUrl);
  const [avatar, setAvatar] = useState(userProfile.avatar);
  const [isSaved, setIsSaved] = useState(false);
  const [authSuccessMsg, setAuthSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGoogleSignIn = () => {
    onUpdateProfile({
      name: "Sharavanakumar",
      email: "sharavanakumar864@gmail.com",
      authProvider: "google",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256",
      title: "Quantum Scholar & Google Verified",
    });
    setAuthSuccessMsg("Successfully signed in with Google account!");
    setTimeout(() => {
      setAuthSuccessMsg(null);
      setActiveTab("status");
    }, 1500);
  };

  const handleGitHubSignIn = () => {
    onUpdateProfile({
      name: "Sharavanakumar",
      email: "sharavanakumar864@gmail.com",
      authProvider: "github",
      githubUsername: "sharavanakumar",
      title: "Quantum Qiskit Contributor",
    });
    setAuthSuccessMsg("Successfully authenticated with GitHub!");
    setTimeout(() => {
      setAuthSuccessMsg(null);
      setActiveTab("status");
    }, 1500);
  };

  const handleEmailSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      email: emailInput,
      authProvider: "email",
    });
    setAuthSuccessMsg(`Logged in as ${emailInput}`);
    setTimeout(() => {
      setAuthSuccessMsg(null);
      setActiveTab("status");
    }, 1500);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      name,
      title,
      bio,
      githubUsername: github,
      linkedinUrl: linkedin,
      avatar,
      email: emailInput,
    });
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      setActiveTab("status");
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className={`border rounded-3xl w-full max-w-lg p-6 space-y-6 shadow-2xl relative overflow-hidden transition-colors ${
        isDark ? "bg-[#1C1C1C] border-[#7F00FF]/40 text-white" : "bg-white border-slate-200 text-[#1C1C1C]"
      }`}>
        {/* Glow backdrop */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-[#7F00FF]/20 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className={`flex items-center justify-between border-b pb-4 relative z-10 ${
          isDark ? "border-white/10" : "border-slate-200"
        }`}>
          <div className="flex items-center space-x-3">
            <div className={`p-2.5 rounded-2xl border shadow-md ${
              isDark ? "bg-[#7F00FF]/20 border-[#FF66CC]/30 text-[#A3FF00] glow-lime" : "bg-slate-100 border-slate-200 text-[#00B894]"
            }`}>
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base uppercase tracking-wider">
                Personalized Quantum Account
              </h3>
              <p className={`text-[11px] font-mono ${isDark ? "text-[#C0C0C0]" : "text-slate-500"}`}>
                {userProfile.authProvider === "google"
                  ? "Google Verified SSO Active"
                  : userProfile.authProvider === "github"
                  ? "GitHub OAuth Connected"
                  : "Sync progress across devices"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`p-1.5 rounded-xl transition-all ${
              isDark ? "hover:bg-white/10 text-gray-400 hover:text-white" : "hover:bg-slate-100 text-slate-500 hover:text-slate-900"
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Auth Mode Tabs */}
        <div className={`flex items-center justify-between p-1 border rounded-2xl text-xs font-bold relative z-10 ${
          isDark ? "bg-[#121212] border-white/10" : "bg-slate-100 border-slate-200"
        }`}>
          <button
            onClick={() => setActiveTab("status")}
            className={`flex-1 py-2 rounded-xl transition-all text-center uppercase tracking-wider text-[11px] ${
              activeTab === "status"
                ? isDark ? "bg-[#7F00FF] text-white shadow-md glow-violet" : "bg-[#333333] text-white shadow-md"
                : isDark ? "text-gray-400 hover:text-white" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Account Overview
          </button>
          <button
            onClick={() => setActiveTab("login")}
            className={`flex-1 py-2 rounded-xl transition-all text-center uppercase tracking-wider text-[11px] ${
              activeTab === "login"
                ? isDark ? "bg-[#7F00FF] text-white shadow-md glow-violet" : "bg-[#333333] text-white shadow-md"
                : isDark ? "text-gray-400 hover:text-white" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Google & SSO
          </button>
          <button
            onClick={() => setActiveTab("edit")}
            className={`flex-1 py-2 rounded-xl transition-all text-center uppercase tracking-wider text-[11px] ${
              activeTab === "edit"
                ? isDark ? "bg-[#7F00FF] text-white shadow-md glow-violet" : "bg-[#333333] text-white shadow-md"
                : isDark ? "text-gray-400 hover:text-white" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Edit Profile
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "status" && (
          <div className="space-y-5 text-xs relative z-10">
            {/* Account Card */}
            <div className={`p-4 rounded-2xl border flex items-center space-x-4 shadow-md ${
              isDark ? "bg-[#121212] border-[#7F00FF]/40" : "bg-slate-50 border-slate-200"
            }`}>
              <img
                src={userProfile.avatar}
                alt={userProfile.name}
                className={`w-14 h-14 rounded-2xl ring-2 object-cover shadow-md ${
                  isDark ? "ring-[#A3FF00] glow-lime" : "ring-[#00B894]"
                }`}
              />
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="font-extrabold text-base uppercase tracking-wider">
                    {userProfile.name}
                  </span>
                  <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full font-bold border ${
                    isDark ? "bg-[#A3FF00]/10 text-[#A3FF00] border-[#A3FF00]/40" : "bg-[#00B894]/10 text-[#00B894] border-[#00B894]/40"
                  }`}>
                    {userProfile.authProvider === "google" ? "Google Connected" : "Authenticated"}
                  </span>
                </div>
                <p className={`text-xs font-bold ${isDark ? "text-[#FF66CC]" : "text-[#9B59B6]"}`}>{userProfile.title}</p>
                <p className={`text-[11px] font-mono ${isDark ? "text-[#C0C0C0]" : "text-slate-600"}`}>
                  {userProfile.email || "sharavanakumar864@gmail.com"}
                </p>
              </div>
            </div>

            {/* Streak & Progress */}
            <div className="grid grid-cols-2 gap-3">
              <div className={`p-3.5 rounded-2xl border space-y-1 ${
                isDark ? "bg-[#121212] border-white/10" : "bg-slate-50 border-slate-200"
              }`}>
                <span className={`text-[10px] uppercase font-mono font-bold block ${isDark ? "text-gray-400" : "text-slate-500"}`}>
                  Coherence Streak
                </span>
                <span className="text-base font-bold font-mono text-[#FFC312] flex items-center space-x-1">
                  <Flame className="w-4 h-4 fill-current text-[#FFC312]" />
                  <span>{userProfile.streakDays} Days</span>
                </span>
              </div>

              <div className={`p-3.5 rounded-2xl border space-y-1 ${
                isDark ? "bg-[#121212] border-white/10" : "bg-slate-50 border-slate-200"
              }`}>
                <span className={`text-[10px] uppercase font-mono font-bold block ${isDark ? "text-gray-400" : "text-slate-500"}`}>
                  Total Quantum XP
                </span>
                <span className={`text-base font-bold font-mono flex items-center space-x-1 ${
                  isDark ? "text-[#A3FF00]" : "text-[#00B894]"
                }`}>
                  <Zap className="w-4 h-4 fill-current" />
                  <span>{userProfile.totalXP} XP</span>
                </span>
              </div>
            </div>

            <div className={`p-3.5 rounded-2xl border text-[11px] leading-relaxed flex items-center space-x-2.5 ${
              isDark ? "bg-[#121212] border-[#7F00FF]/30 text-[#C0C0C0]" : "bg-slate-50 border-slate-200 text-slate-700"
            }`}>
              <Sparkles className={`w-4 h-4 shrink-0 ${isDark ? "text-[#A3FF00]" : "text-[#00B894]"}`} />
              <span>
                Personalized profile synchronized. Badges, certificates, and circuit projects are secured under your verified account.
              </span>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => setActiveTab("login")}
                className={`px-4 py-2.5 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all border ${
                  isDark ? "bg-white/10 hover:bg-white/20 text-white border-white/10" : "bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300"
                }`}
              >
                Switch Account / Login
              </button>
              <button
                onClick={onClose}
                className={`px-6 py-2.5 rounded-2xl font-black text-xs uppercase tracking-wider shadow-lg ${
                  isDark ? "bg-[#A3FF00] text-[#121212] hover:bg-[#8ee600] glow-lime" : "bg-[#00B894] text-white hover:bg-[#00a383]"
                }`}
              >
                Close Window
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Login with Google & OAuth Providers */}
        {activeTab === "login" && (
          <div className="space-y-4 text-xs relative z-10">
            {authSuccessMsg && (
              <div className={`p-3 rounded-2xl border font-bold flex items-center space-x-2 animate-in fade-in ${
                isDark ? "bg-[#A3FF00]/10 border-[#A3FF00]/30 text-[#A3FF00]" : "bg-[#00B894]/10 border-[#00B894]/30 text-[#00B894]"
              }`}>
                <CheckCircle2 className="w-4 h-4" />
                <span>{authSuccessMsg}</span>
              </div>
            )}

            <p className={`text-xs ${isDark ? "text-[#C0C0C0]" : "text-slate-600"}`}>
              Sign in or create your personalized QuantumVerse account using Google or social single-sign-on:
            </p>

            {/* Google Sign In Button */}
            <button
              onClick={handleGoogleSignIn}
              className={`w-full py-3 px-4 rounded-2xl border font-black text-xs uppercase tracking-wider flex items-center justify-center space-x-3 shadow-md transition-all ${
                isDark
                  ? "bg-white text-slate-900 border-white hover:bg-slate-100"
                  : "bg-white text-slate-900 border-slate-300 hover:bg-slate-50"
              }`}
            >
              {/* Google SVG Icon */}
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
              <span>Continue with Google</span>
            </button>

            {/* GitHub Sign In Button */}
            <button
              onClick={handleGitHubSignIn}
              className={`w-full py-3 px-4 rounded-2xl border font-black text-xs uppercase tracking-wider flex items-center justify-center space-x-3 shadow-md transition-all ${
                isDark
                  ? "bg-[#121212] text-white border-white/20 hover:bg-black"
                  : "bg-slate-900 text-white border-slate-900 hover:bg-slate-800"
              }`}
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              <span>Continue with GitHub</span>
            </button>

            <div className="flex items-center my-3">
              <div className={`flex-1 border-t ${isDark ? "border-white/10" : "border-slate-200"}`} />
              <span className={`px-3 text-[10px] font-mono font-bold uppercase ${isDark ? "text-gray-400" : "text-slate-400"}`}>
                OR Sign In via Email
              </span>
              <div className={`flex-1 border-t ${isDark ? "border-white/10" : "border-slate-200"}`} />
            </div>

            {/* Email Form */}
            <form onSubmit={handleEmailSignIn} className="space-y-3">
              <div>
                <label className={`block font-bold uppercase tracking-wider mb-1 ${isDark ? "text-[#C0C0C0]" : "text-slate-700"}`}>Email Address</label>
                <div className={`flex items-center space-x-2 border rounded-2xl px-3 py-2.5 ${
                  isDark ? "bg-[#121212] border-white/10" : "bg-slate-50 border-slate-200"
                }`}>
                  <Mail className={`w-4 h-4 ${isDark ? "text-[#A3FF00]" : "text-[#00B894]"}`} />
                  <input
                    type="email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    required
                    className={`w-full bg-transparent outline-none text-xs ${
                      isDark ? "text-white" : "text-slate-900"
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className={`block font-bold uppercase tracking-wider mb-1 ${isDark ? "text-[#C0C0C0]" : "text-slate-700"}`}>Password</label>
                <input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  required
                  className={`w-full border rounded-2xl p-3 outline-none text-xs ${
                    isDark ? "bg-[#121212] border-white/10 text-white" : "bg-slate-50 border-slate-200 text-slate-900"
                  }`}
                />
              </div>

              <button
                type="submit"
                className={`w-full py-3 rounded-2xl text-white font-black text-xs uppercase tracking-wider shadow-lg transition-all border ${
                  isDark ? "bg-[#7F00FF] border-[#FF66CC]/30 hover:bg-[#6b00db] glow-violet" : "bg-[#333333] border-slate-400"
                }`}
              >
                Sign In with Email
              </button>
            </form>
          </div>
        )}

        {/* Tab 3: Edit Profile Form */}
        {activeTab === "edit" && (
          <form onSubmit={handleSaveProfile} className="space-y-3 text-xs relative z-10">
            <div>
              <label className={`block font-bold uppercase tracking-wider mb-1 ${isDark ? "text-[#C0C0C0]" : "text-slate-700"}`}>Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className={`w-full border rounded-2xl p-3 outline-none text-xs ${
                  isDark ? "bg-[#121212] border-white/10 text-white" : "bg-slate-50 border-slate-200 text-slate-900"
                }`}
              />
            </div>

            <div>
              <label className={`block font-bold uppercase tracking-wider mb-1 ${isDark ? "text-[#C0C0C0]" : "text-slate-700"}`}>Title / Role</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className={`w-full border rounded-2xl p-3 outline-none text-xs ${
                  isDark ? "bg-[#121212] border-white/10 text-white" : "bg-slate-50 border-slate-200 text-slate-900"
                }`}
              />
            </div>

            <div>
              <label className={`block font-bold uppercase tracking-wider mb-1 ${isDark ? "text-[#C0C0C0]" : "text-slate-700"}`}>Profile Avatar Image URL</label>
              <input
                type="text"
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
                className={`w-full border rounded-2xl p-3 outline-none font-mono text-[11px] ${
                  isDark ? "bg-[#121212] border-white/10 text-white" : "bg-slate-50 border-slate-200 text-slate-900"
                }`}
              />
            </div>

            <div>
              <label className={`block font-bold uppercase tracking-wider mb-1 ${isDark ? "text-[#C0C0C0]" : "text-slate-700"}`}>Bio / Summary</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={2}
                className={`w-full border rounded-2xl p-3 outline-none text-xs ${
                  isDark ? "bg-[#121212] border-white/10 text-white" : "bg-slate-50 border-slate-200 text-slate-900"
                }`}
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className={`block font-bold uppercase tracking-wider mb-1 ${isDark ? "text-[#C0C0C0]" : "text-slate-700"}`}>GitHub Handle</label>
                <input
                  type="text"
                  value={github}
                  onChange={(e) => setGithub(e.target.value)}
                  className={`w-full border rounded-2xl p-3 outline-none font-mono text-xs ${
                    isDark ? "bg-[#121212] border-white/10 text-white" : "bg-slate-50 border-slate-200 text-slate-900"
                  }`}
                />
              </div>

              <div>
                <label className={`block font-bold uppercase tracking-wider mb-1 ${isDark ? "text-[#C0C0C0]" : "text-slate-700"}`}>LinkedIn URL</label>
                <input
                  type="text"
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                  className={`w-full border rounded-2xl p-3 outline-none font-mono text-xs ${
                    isDark ? "bg-[#121212] border-white/10 text-white" : "bg-slate-50 border-slate-200 text-slate-900"
                  }`}
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-3">
              <button
                type="button"
                onClick={() => setActiveTab("status")}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider ${
                  isDark ? "bg-white/10 text-white hover:bg-white/20" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider flex items-center space-x-1 shadow-lg ${
                  isDark ? "bg-[#A3FF00] text-[#121212] hover:bg-[#8ee600] glow-lime" : "bg-[#00B894] text-white hover:bg-[#00a383]"
                }`}
              >
                {isSaved ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Saved!</span>
                  </>
                ) : (
                  <>
                    <UserCheck className="w-4 h-4" />
                    <span>Save Profile Changes</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
