import React, { useState } from "react";
import {
  Trophy,
  Swords,
  Zap,
  Users,
  Sparkles
} from "lucide-react";
import { LeaderboardEntry, UserProfile } from "../types";

interface GamificationViewProps {
  userProfile?: UserProfile;
  theme?: "dark" | "light";
}

export const GamificationView: React.FC<GamificationViewProps> = ({ userProfile, theme = "dark" }) => {
  const isDark = theme === "dark";

  const userXP = userProfile?.totalXP ?? 0;
  const userName = userProfile?.name ?? "Sharavanakumar";
  const userAvatar = userProfile?.avatar ?? "https://api.dicebear.com/7.x/bottts/svg?seed=Sharavanakumar";
  const userTitle = userProfile?.title ?? "Quantum Scholar";
  const userStreak = userProfile?.streakDays ?? 0;

  const leaderboardData: LeaderboardEntry[] = [
    {
      rank: 1,
      name: "Dr. Evelyn Reed",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256",
      xp: 4200,
      streak: 14,
      badgesCount: 8,
      title: "Senior Quantum Fellow",
    },
    {
      rank: userXP >= 4200 ? 1 : userXP >= 2620 ? 2 : userXP >= 2410 ? 3 : 4,
      name: userName,
      avatar: userAvatar,
      xp: userXP,
      streak: userStreak,
      badgesCount: userProfile?.badges.filter(b => b.unlocked).length ?? 0,
      title: userTitle,
      isCurrentUser: true,
    },
    {
      rank: 3,
      name: "Alex Chen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=256",
      xp: 2620,
      streak: 14,
      badgesCount: 6,
      title: "IBM Qiskit Developer",
    },
    {
      rank: 4,
      name: "Sophia Martinez",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=256",
      xp: 2410,
      streak: 5,
      badgesCount: 4,
      title: "PennyLane QML Fellow",
    },
    {
      rank: 5,
      name: "Marcus Vance",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=256",
      xp: 2180,
      streak: 11,
      badgesCount: 4,
      title: "Hardware Researcher",
    },
  ].sort((a, b) => b.xp - a.xp).map((item, idx) => ({ ...item, rank: idx + 1 }));

  const [battleActive, setBattleActive] = useState<boolean>(false);
  const [battleResult, setBattleResult] = useState<string | null>(null);

  const handleStartDuel = () => {
    setBattleActive(true);
    setBattleResult(null);

    setTimeout(() => {
      setBattleActive(false);
      setBattleResult(
        `VICTORY! You created a Bell state in 1.2s with 100% fidelity vs Alex Chen. +150 XP awarded to ${userName}!`
      );
    }, 1800);
  };


  return (
    <div className={`space-y-8 max-w-7xl mx-auto transition-colors ${isDark ? "text-white" : "text-slate-900"}`}>
      {/* Header */}
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between border-b pb-4 gap-4 ${
        isDark ? "border-white/10" : "border-slate-200"
      }`}>
        <div>
          <div className="flex items-center space-x-2">
            <Trophy className={`w-6 h-6 ${isDark ? "text-[#FFC312]" : "text-[#FFC312]"}`} />
            <h2 className="text-xl font-extrabold uppercase tracking-wider">Gamification & Peer Duels Arena</h2>
          </div>
          <p className={`text-xs mt-1 ${isDark ? "text-[#C0C0C0]" : "text-slate-600"}`}>
            Compete on global leaderboards, initiate peer coding battles, earn XP, and unlock verified certificates.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Global Leaderboard Table */}
        <div className={`lg:col-span-7 border rounded-3xl p-6 shadow-2xl space-y-4 ${
          isDark ? "bg-[#1C1C1C] border-[#7F00FF]/30" : "bg-white border-slate-200 shadow-sm"
        }`}>
          <div className={`flex items-center justify-between border-b pb-3 ${isDark ? "border-white/10" : "border-slate-200"}`}>
            <h3 className="font-extrabold text-base flex items-center space-x-2 uppercase tracking-wider">
              <Users className={`w-5 h-5 ${isDark ? "text-[#A3FF00]" : "text-[#00B894]"}`} />
              <span>Global Quantum Scholar Leaderboard</span>
            </h3>
            <span className="text-xs text-[#C0C0C0] font-mono font-bold">Season 4</span>
          </div>

          <div className={`divide-y ${isDark ? "divide-white/10" : "divide-slate-200"}`}>
            {leaderboardData.map((user) => (
              <div
                key={user.rank}
                className={`p-3.5 rounded-2xl flex items-center justify-between transition-all ${
                  user.isCurrentUser
                    ? isDark
                      ? "bg-[#7F00FF]/20 border border-[#7F00FF]/50 glow-violet"
                      : "bg-[#00B894]/10 border border-[#00B894]/30"
                    : isDark ? "hover:bg-white/5" : "hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <span
                    className={`w-6 text-center font-mono font-black text-sm ${
                      user.rank === 1
                        ? "text-[#FFC312]"
                        : user.rank === 2
                        ? "text-slate-400"
                        : user.rank === 3
                        ? "text-[#FF66CC]"
                        : "text-slate-500"
                    }`}
                  >
                    #{user.rank}
                  </span>

                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-9 h-9 rounded-full object-cover ring-2 ring-[#A3FF00]/40"
                  />

                  <div>
                    <div className="flex items-center space-x-2">
                      <span className={`font-bold text-xs ${isDark ? "text-white" : "text-slate-900"}`}>{user.name}</span>
                      {user.isCurrentUser && (
                        <span className={`text-[9px] font-mono font-black px-2 py-0.5 rounded-full ${
                          isDark ? "bg-[#A3FF00] text-[#121212]" : "bg-[#00B894] text-white"
                        }`}>
                          YOU
                        </span>
                      )}
                    </div>
                    <span className={`text-[10px] block ${isDark ? "text-[#C0C0C0]" : "text-slate-500"}`}>{user.title}</span>
                  </div>
                </div>

                <div className="text-right font-mono">
                  <span className={`text-xs font-black block ${isDark ? "text-[#A3FF00]" : "text-[#00B894]"}`}>{user.xp} XP</span>
                  <span className="text-[10px] text-[#FFC312] flex items-center justify-end space-x-0.5 font-bold">
                    <Zap className="w-3 h-3 fill-[#FFC312]" />
                    <span>{user.streak}d Streak</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Peer Coding Duels & Battles Simulator */}
        <div className={`lg:col-span-5 border rounded-3xl p-6 shadow-2xl space-y-6 flex flex-col justify-between ${
          isDark ? "bg-[#1C1C1C] border-[#7F00FF]/30" : "bg-white border-slate-200 shadow-sm"
        }`}>
          <div className="space-y-4">
            <div className={`flex items-center space-x-2 border-b pb-3 ${isDark ? "border-white/10" : "border-slate-200"}`}>
              <Swords className={`w-5 h-5 ${isDark ? "text-[#FF66CC]" : "text-[#9B59B6]"}`} />
              <h3 className="font-extrabold text-base uppercase tracking-wider">Peer Quantum Coding Duel</h3>
            </div>

            <p className={`text-xs leading-relaxed ${isDark ? "text-[#C0C0C0]" : "text-slate-600"}`}>
              Challenge a fellow scholar to a real-time 60-second circuit creation battle. Speed, gate fidelity, and minimal depth earn bonus XP!
            </p>

            <div className={`border rounded-2xl p-4 text-xs space-y-2 ${
              isDark ? "bg-[#121212] border-[#7F00FF]/40" : "bg-slate-50 border-slate-200"
            }`}>
              <span className={`font-black uppercase tracking-wider block ${isDark ? "text-[#FF66CC]" : "text-[#9B59B6]"}`}>Current Duel Prompt:</span>
              <p className={isDark ? "text-gray-200" : "text-slate-800"}>
                Create a 2-qubit Quantum Teleportation state correction circuit using minimal CNOT gates.
              </p>
            </div>

            {battleResult && (
              <div className={`border rounded-2xl p-4 text-xs font-mono space-y-1 animate-in fade-in ${
                isDark ? "bg-[#A3FF00]/10 border-[#A3FF00]/40 text-[#A3FF00]" : "bg-[#00B894]/10 border-[#00B894]/40 text-[#00B894]"
              }`}>
                <div className="flex items-center space-x-2 font-black uppercase">
                  <Sparkles className="w-4 h-4 text-[#FFC312]" />
                  <span>Battle Outcome</span>
                </div>
                <p>{battleResult}</p>
              </div>
            )}
          </div>

          <button
            onClick={handleStartDuel}
            disabled={battleActive}
            className={`w-full py-3.5 rounded-2xl text-white font-black text-xs uppercase tracking-wider shadow-xl transition-all disabled:opacity-50 flex items-center justify-center space-x-2 ${
              isDark
                ? "bg-[#7F00FF] hover:bg-[#6b00db] glow-violet"
                : "bg-[#333333] hover:bg-slate-700"
            }`}
          >
            <Swords className="w-4 h-4 text-[#A3FF00]" />
            <span>{battleActive ? "Matchmaking & Simulating..." : "Initiate Quantum Duel"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
