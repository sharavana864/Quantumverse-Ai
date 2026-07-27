import React, { useState } from "react";
import {
  Github,
  Linkedin,
  Calendar,
  Share2,
  CheckCircle2,
  Trophy,
  Flame,
  Award,
  Edit3,
  Mail,
  ShieldCheck,
  UserCheck
} from "lucide-react";
import { UserProfile } from "../types";

import { LogOut } from "lucide-react";

interface ProfileViewProps {
  userProfile: UserProfile;
  onUpdateProfile?: (updated: Partial<UserProfile>) => void;
  onLogout?: () => void;
  theme?: "dark" | "light";
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  userProfile,
  onUpdateProfile,
  onLogout,
  theme = "dark",
}) => {
  const isDark = theme === "dark";
  const [showExportModal, setShowExportModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  // Edit form state
  const [name, setName] = useState(userProfile.name);
  const [title, setTitle] = useState(userProfile.title);
  const [bio, setBio] = useState(userProfile.bio);
  const [email, setEmail] = useState(userProfile.email || "sharavanakumar864@gmail.com");
  const [github, setGithub] = useState(userProfile.githubUsername);
  const [linkedin, setLinkedin] = useState(userProfile.linkedinUrl);
  const [avatar, setAvatar] = useState(userProfile.avatar);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const today = new Date("2026-07-27");
  const datesMatrix: { dateStr: string; count: number }[] = [];

  for (let i = 363; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split("T")[0];
    const count = userProfile.heatMapData[dateStr] || 0;
    datesMatrix.push({ dateStr, count });
  }

  const getHeatMapColor = (count: number) => {
    if (count === 0) return isDark ? "bg-[#121212]" : "bg-slate-200";
    if (count === 1) return isDark ? "bg-[#7F00FF]/40 text-purple-200" : "bg-[#00B894]/30 text-slate-800";
    if (count === 2) return isDark ? "bg-[#7F00FF]/70 text-white" : "bg-[#00B894]/60 text-white";
    if (count === 3) return isDark ? "bg-[#7F00FF] text-white glow-violet" : "bg-[#00B894] text-white";
    return isDark ? "bg-[#A3FF00] text-[#121212] font-bold glow-lime" : "bg-[#00B894] text-white font-bold";
  };

  const handleSharePortfolio = () => {
    navigator.clipboard.writeText(`https://quantumverse.ai/portfolio/${userProfile.githubUsername}`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (onUpdateProfile) {
      onUpdateProfile({
        name,
        title,
        bio,
        email,
        githubUsername: github,
        linkedinUrl: linkedin,
        avatar,
      });
    }
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      setShowEditModal(false);
    }, 1200);
  };

  return (
    <div className={`space-y-8 max-w-7xl mx-auto transition-colors ${isDark ? "text-white" : "text-[#1C1C1C]"}`}>
      {/* Profile Header Banner */}
      <div className={`border rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden transition-all ${
        isDark ? "bg-[#1C1C1C] border-[#7F00FF]/30" : "bg-white border-slate-200"
      }`}>
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#7F00FF]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-start sm:items-center space-x-5">
            <img
              src={userProfile.avatar}
              alt={userProfile.name}
              className={`w-20 h-20 sm:w-24 sm:h-24 rounded-2xl ring-4 object-cover shadow-2xl shrink-0 ${
                isDark ? "ring-[#A3FF00]/50 glow-lime" : "ring-[#00B894]/50"
              }`}
            />
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-wider">{userProfile.name}</h2>
                <span className={`text-xs px-3 py-0.5 rounded-full font-bold border ${
                  isDark ? "bg-[#7F00FF]/30 text-[#A3FF00] border-[#FF66CC]/30" : "bg-[#333333] text-white border-slate-300"
                }`}>
                  {userProfile.title}
                </span>
                <span className={`text-xs px-3 py-0.5 rounded-full font-mono font-bold border flex items-center space-x-1 ${
                  isDark ? "bg-[#A3FF00]/10 text-[#A3FF00] border-[#A3FF00]/30" : "bg-[#00B894]/10 text-[#00B894] border-[#00B894]/30"
                }`}>
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{userProfile.authProvider === "google" ? "Google SSO Verified" : "Verified Account"}</span>
                </span>
              </div>

              <p className={`text-xs max-w-xl leading-relaxed ${isDark ? "text-[#C0C0C0]" : "text-slate-600"}`}>{userProfile.bio}</p>

              {/* Email & Social Handles */}
              <div className={`flex flex-wrap items-center gap-4 pt-1 text-xs font-mono ${isDark ? "text-gray-400" : "text-slate-600"}`}>
                <span className={`flex items-center space-x-1 font-bold ${isDark ? "text-[#A3FF00]" : "text-[#00B894]"}`}>
                  <Mail className="w-3.5 h-3.5" />
                  <span>{userProfile.email || "sharavanakumar864@gmail.com"}</span>
                </span>
                <a
                  href={`https://github.com/${userProfile.githubUsername}`}
                  target="_blank"
                  rel="noreferrer"
                  className={`flex items-center space-x-1 transition-all ${
                    isDark ? "hover:text-[#A3FF00] text-gray-300" : "hover:text-[#00B894] text-slate-700"
                  }`}
                >
                  <Github className="w-4 h-4" />
                  <span>@{userProfile.githubUsername}</span>
                </a>
                <a
                  href={userProfile.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={`flex items-center space-x-1 transition-all ${
                    isDark ? "hover:text-[#FF66CC] text-gray-300" : "hover:text-[#9B59B6] text-slate-700"
                  }`}
                >
                  <Linkedin className="w-4 h-4 text-[#FF66CC]" />
                  <span>LinkedIn Profile</span>
                </a>
              </div>
            </div>
          </div>

          {/* Action Buttons: Edit Profile & Export Portfolio */}
          <div className="flex flex-wrap items-center gap-3">
            <div className={`border rounded-2xl px-4 py-2.5 text-center ${
              isDark ? "bg-[#121212] border-white/10" : "bg-slate-50 border-slate-200"
            }`}>
              <span className={`text-[10px] uppercase font-mono font-bold block ${isDark ? "text-gray-400" : "text-slate-500"}`}>
                Coherence Streak
              </span>
              <span className="text-lg font-bold font-mono text-[#FFC312] flex items-center justify-center space-x-1">
                <Flame className="w-5 h-5 fill-current text-[#FFC312]" />
                <span>{userProfile.streakDays} Days</span>
              </span>
            </div>

            <button
              onClick={() => setShowEditModal(true)}
              className={`px-4 py-3 rounded-2xl font-bold text-xs uppercase tracking-wider shadow-md transition-all border flex items-center space-x-2 ${
                isDark ? "bg-white/10 hover:bg-white/20 text-white border-white/10" : "bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300"
              }`}
            >
              <Edit3 className={`w-4 h-4 ${isDark ? "text-[#A3FF00]" : "text-[#00B894]"}`} />
              <span>Edit Profile</span>
            </button>

            <button
              onClick={() => setShowExportModal(true)}
              className={`px-4 py-3 rounded-2xl text-white text-xs font-bold uppercase tracking-wider shadow-lg transition-all border flex items-center space-x-2 ${
                isDark ? "bg-[#7F00FF] border-[#FF66CC]/30 hover:bg-[#6b00db] glow-violet" : "bg-[#333333] border-slate-400"
              }`}
            >
              <Share2 className={`w-4 h-4 ${isDark ? "text-[#A3FF00]" : "text-[#FFC312]"}`} />
              <span>Export Portfolio</span>
            </button>

            {onLogout && (
              <button
                onClick={onLogout}
                className={`px-4 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider shadow-md transition-all border flex items-center space-x-2 ${
                  isDark ? "bg-[#121212] hover:bg-rose-950/40 text-rose-400 border-rose-500/30" : "bg-rose-50 hover:bg-rose-100 text-rose-700 border-rose-200"
                }`}
                title="Log out and switch person profile"
              >
                <LogOut className="w-4 h-4 text-rose-500" />
                <span>Switch Person / Logout</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 365-Day Contribution Heatmap Matrix */}
      <div className={`border rounded-3xl p-6 shadow-2xl space-y-4 ${
        isDark ? "bg-[#1C1C1C] border-[#7F00FF]/30" : "bg-white border-slate-200"
      }`}>
        <div className={`flex items-center justify-between border-b pb-3 ${isDark ? "border-white/10" : "border-slate-200"}`}>
          <div className="flex items-center space-x-2">
            <Calendar className={`w-5 h-5 ${isDark ? "text-[#A3FF00]" : "text-[#00B894]"}`} />
            <h3 className="text-base font-bold uppercase tracking-wider">Quantum Contributions & Activity Matrix (365 Days)</h3>
          </div>
          <span className={`text-xs font-mono font-bold ${isDark ? "text-[#C0C0C0]" : "text-slate-500"}`}>
            {datesMatrix.reduce((acc, curr) => acc + curr.count, 0)} total commits & circuit submissions
          </span>
        </div>

        <div className="overflow-x-auto pt-2">
          <div className="inline-grid grid-rows-7 grid-flow-col gap-1.5 min-w-[720px]">
            {datesMatrix.map((item, idx) => (
              <div
                key={idx}
                title={`${item.dateStr}: ${item.count} quantum study commits`}
                className={`w-3.5 h-3.5 rounded-sm transition-all hover:scale-125 ${getHeatMapColor(item.count)}`}
              />
            ))}
          </div>
        </div>

        {/* Heat Map Legend */}
        <div className={`flex items-center justify-end space-x-2 text-[10px] font-mono pt-2 ${isDark ? "text-gray-400" : "text-slate-500"}`}>
          <span>Less</span>
          <div className={`w-3 h-3 rounded-sm ${isDark ? "bg-[#121212]" : "bg-slate-200"}`} />
          <div className="w-3 h-3 rounded-sm bg-[#7F00FF]/40" />
          <div className="w-3 h-3 rounded-sm bg-[#7F00FF]/70" />
          <div className="w-3 h-3 rounded-sm bg-[#7F00FF]" />
          <div className="w-3 h-3 rounded-sm bg-[#A3FF00]" />
          <span>More</span>
        </div>
      </div>

      {/* Badges Gallery & Certificates Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Unlocked Badges */}
        <div className={`lg:col-span-7 border rounded-3xl p-6 space-y-4 shadow-2xl ${
          isDark ? "bg-[#1C1C1C] border-white/10" : "bg-white border-slate-200"
        }`}>
          <div className={`flex items-center justify-between border-b pb-3 ${isDark ? "border-white/10" : "border-slate-200"}`}>
            <div className="flex items-center space-x-2">
              <Trophy className="w-5 h-5 text-[#FFC312]" />
              <h3 className="text-base font-bold uppercase tracking-wider">Dedication Badges & Milestones</h3>
            </div>
            <span className={`text-xs font-mono font-bold ${isDark ? "text-[#A3FF00]" : "text-[#00B894]"}`}>
              {userProfile.badges.filter((b) => b.unlocked).length} / {userProfile.badges.length} Unlocked
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {userProfile.badges.map((badge) => (
              <div
                key={badge.id}
                className={`p-4 rounded-2xl border text-xs space-y-1.5 transition-all ${
                  badge.unlocked
                    ? isDark ? "bg-[#121212] border-[#7F00FF]/40 text-white" : "bg-slate-50 border-[#00B894]/30 text-slate-900"
                    : isDark ? "bg-[#121212]/50 border-white/5 text-gray-500 opacity-60" : "bg-slate-100 border-slate-200 text-slate-400 opacity-60"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`font-bold uppercase tracking-wider ${isDark ? "text-[#A3FF00]" : "text-[#00B894]"}`}>{badge.title}</span>
                  <span
                    className={`text-[9px] font-mono px-2 py-0.5 rounded-md uppercase font-bold ${
                      badge.rarity === "Legendary"
                        ? "bg-[#FFC312]/20 text-[#FFC312] border border-[#FFC312]/40"
                        : badge.rarity === "Epic"
                        ? "bg-[#FF66CC]/20 text-[#FF66CC] border border-[#FF66CC]/40"
                        : "bg-[#00B894]/20 text-[#00B894]"
                    }`}
                  >
                    {badge.rarity}
                  </span>
                </div>
                <p className={`text-[11px] leading-normal ${isDark ? "text-[#C0C0C0]" : "text-slate-600"}`}>{badge.description}</p>
                {badge.unlockedAt && (
                  <span className={`text-[9px] font-mono block ${isDark ? "text-gray-400" : "text-slate-500"}`}>
                    Unlocked: {badge.unlockedAt}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Certificates & Achievements */}
        <div className={`lg:col-span-5 border rounded-3xl p-6 space-y-4 shadow-2xl ${
          isDark ? "bg-[#1C1C1C] border-white/10" : "bg-white border-slate-200"
        }`}>
          <div className={`flex items-center justify-between border-b pb-3 ${isDark ? "border-white/10" : "border-slate-200"}`}>
            <div className="flex items-center space-x-2">
              <Award className={`w-5 h-5 ${isDark ? "text-[#FF66CC]" : "text-[#9B59B6]"}`} />
              <h3 className="text-base font-bold uppercase tracking-wider">Verified Certificates</h3>
            </div>
          </div>

          <div className="space-y-3">
            {userProfile.certificates.map((cert) => (
              <div
                key={cert.id}
                className={`border rounded-2xl p-4 text-xs space-y-2 transition-all ${
                  isDark ? "bg-[#121212] border-[#7F00FF]/40 hover:border-[#FF66CC]" : "bg-purple-50 border-purple-200 hover:border-purple-300"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm uppercase tracking-wider">{cert.title}</span>
                  <CheckCircle2 className={`w-4 h-4 ${isDark ? "text-[#A3FF00]" : "text-[#00B894]"}`} />
                </div>
                <div className={`text-[11px] font-mono space-y-0.5 ${isDark ? "text-[#C0C0C0]" : "text-slate-600"}`}>
                  <p>Issuer: {cert.issuer}</p>
                  <p>Issue Date: {cert.date}</p>
                  <p className={`font-bold ${isDark ? "text-[#FF66CC]" : "text-[#9B59B6]"}`}>Credential ID: {cert.credentialId}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className={`border rounded-3xl w-full max-w-lg p-6 space-y-5 shadow-2xl ${
            isDark ? "bg-[#1C1C1C] border-[#7F00FF]/40 text-white" : "bg-white border-slate-200 text-[#1C1C1C]"
          }`}>
            <div className={`flex items-center justify-between border-b pb-3 ${isDark ? "border-white/10" : "border-slate-200"}`}>
              <div className="flex items-center space-x-2">
                <Edit3 className={`w-5 h-5 ${isDark ? "text-[#A3FF00]" : "text-[#00B894]"}`} />
                <h3 className="font-extrabold text-base uppercase tracking-wider">Edit Personalized Profile</h3>
              </div>
              <button
                onClick={() => setShowEditModal(false)}
                className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 text-gray-400"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold uppercase tracking-wider mb-1">Display Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className={`w-full border rounded-2xl p-3 outline-none ${
                    isDark ? "bg-[#121212] border-white/10 text-white placeholder-gray-500 focus:border-[#A3FF00]" : "bg-slate-50 border-slate-200 text-slate-900"
                  }`}
                />
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider mb-1">Title / Headline</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className={`w-full border rounded-2xl p-3 outline-none ${
                    isDark ? "bg-[#121212] border-white/10 text-white placeholder-gray-500 focus:border-[#A3FF00]" : "bg-slate-50 border-slate-200 text-slate-900"
                  }`}
                />
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={`w-full border rounded-2xl p-3 outline-none font-mono ${
                    isDark ? "bg-[#121212] border-white/10 text-white placeholder-gray-500 focus:border-[#A3FF00]" : "bg-slate-50 border-slate-200 text-slate-900"
                  }`}
                />
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider mb-1">Bio / Research Focus</label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={2}
                  className={`w-full border rounded-2xl p-3 outline-none ${
                    isDark ? "bg-[#121212] border-white/10 text-white placeholder-gray-500 focus:border-[#A3FF00]" : "bg-slate-50 border-slate-200 text-slate-900"
                  }`}
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold uppercase tracking-wider mb-1">GitHub Username</label>
                  <input
                    type="text"
                    value={github}
                    onChange={(e) => setGithub(e.target.value)}
                    className={`w-full border rounded-2xl p-3 outline-none font-mono ${
                      isDark ? "bg-[#121212] border-white/10 text-white placeholder-gray-500 focus:border-[#A3FF00]" : "bg-slate-50 border-slate-200 text-slate-900"
                    }`}
                  />
                </div>
                <div>
                  <label className="block font-bold uppercase tracking-wider mb-1">LinkedIn URL</label>
                  <input
                    type="text"
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                    className={`w-full border rounded-2xl p-3 outline-none font-mono ${
                      isDark ? "bg-[#121212] border-white/10 text-white placeholder-gray-500 focus:border-[#A3FF00]" : "bg-slate-50 border-slate-200 text-slate-900"
                    }`}
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider ${
                    isDark ? "bg-white/10 text-white hover:bg-white/20" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center space-x-1.5 shadow-lg ${
                    isDark ? "bg-[#A3FF00] text-[#121212] hover:bg-[#8ee600] glow-lime" : "bg-[#00B894] text-white hover:bg-[#00a383]"
                  }`}
                >
                  {savedSuccess ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Profile Saved!</span>
                    </>
                  ) : (
                    <>
                      <UserCheck className="w-4 h-4" />
                      <span>Save Changes</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Share Showcase Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className={`border rounded-3xl w-full max-w-lg p-6 space-y-6 shadow-2xl ${
            isDark ? "bg-[#1C1C1C] border-[#7F00FF]/40 text-white" : "bg-white border-slate-200 text-[#1C1C1C]"
          }`}>
            <div className={`flex items-center justify-between border-b pb-3 ${isDark ? "border-white/10" : "border-slate-200"}`}>
              <div className="flex items-center space-x-2">
                <Share2 className={`w-5 h-5 ${isDark ? "text-[#A3FF00]" : "text-[#00B894]"}`} />
                <h3 className="font-extrabold text-base uppercase tracking-wider">Export Quantum Portfolio</h3>
              </div>
              <button
                onClick={() => setShowExportModal(false)}
                className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 text-gray-400"
              >
                ✕
              </button>
            </div>

            <p className={`text-xs leading-relaxed ${isDark ? "text-[#C0C0C0]" : "text-slate-600"}`}>
              Share your verified QuantumVerse AI achievements, GitHub heat map, and Qiskit challenge badges directly with recruiters or on LinkedIn.
            </p>

            <div className={`border rounded-2xl p-3 font-mono text-xs flex items-center justify-between ${
              isDark ? "bg-[#121212] border-white/10 text-[#A3FF00]" : "bg-slate-100 border-slate-200 text-[#00B894]"
            }`}>
              <span className="truncate">https://quantumverse.ai/portfolio/{userProfile.githubUsername}</span>
              <button
                onClick={handleSharePortfolio}
                className={`px-3.5 py-1.5 rounded-xl font-black text-xs uppercase tracking-wider shrink-0 ml-2 shadow-sm ${
                  isDark ? "bg-[#A3FF00] text-[#121212]" : "bg-[#00B894] text-white"
                }`}
              >
                {copiedLink ? "Copied!" : "Copy Link"}
              </button>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setShowExportModal(false)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider ${
                  isDark ? "bg-white/10 text-white hover:bg-white/20" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
