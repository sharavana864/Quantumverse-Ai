import { UserProfile } from "../types";
import { INITIAL_BADGES } from "./badgesData";

export function generateHeatMapData(): { [dateStr: string]: number } {
  const heatMap: { [dateStr: string]: number } = {};
  const today = new Date("2026-07-27");

  // Generate 365 days of activity data with realistic clusters
  for (let i = 0; i < 365; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split("T")[0];

    // Seeded pseudo-random activity simulation
    const dayOfWeek = d.getDay();
    let count = 0;

    if (i < 30) {
      // Recent active month
      count = (i * 3 + dayOfWeek) % 5;
    } else if (i % 7 === 0 || i % 11 === 0) {
      count = (i % 4) + 1;
    } else if (i % 3 === 0 && dayOfWeek !== 0) {
      count = (i % 3) + 1;
    }

    if (count > 0) {
      heatMap[dateStr] = count;
    }
  }

  // Ensure recent streak days are populated
  for (let s = 0; s < 7; s++) {
    const d = new Date(today);
    d.setDate(d.getDate() - s);
    heatMap[d.toISOString().split("T")[0]] = Math.floor(Math.random() * 3) + 2;
  }

  return heatMap;
}

export function createNewUserProfile(name: string, email: string, provider: "google" | "github" | "email" = "email"): UserProfile {
  const cleanName = name.trim() || "Quantum Learner";
  const cleanEmail = email.trim() || "user@quantumverse.io";
  const username = cleanName.toLowerCase().replace(/\s+/g, "_");

  return {
    name: cleanName,
    email: cleanEmail,
    authProvider: provider,
    avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(cleanName)}`,
    bio: "Quantum computing enthusiast starting the learning journey on QuantumVerse AI.",
    title: "Quantum Novice",
    streakDays: 0,
    totalXP: 0,
    level: 1,
    githubUsername: username,
    leetcodeUsername: username,
    linkedinUrl: `https://linkedin.com/in/${username}`,
    heatMapData: {},
    badges: INITIAL_BADGES.map((b) => ({ ...b, unlocked: false, unlockedAt: undefined })),
    completedLessonIds: [],
    solvedChallengeIds: [],
    certificates: [],
  };
}

export const INITIAL_USER_PROFILE: UserProfile = {
  name: "Sharavanakumar",
  email: "sharavanakumar864@gmail.com",
  authProvider: "google",
  avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Sharavanakumar",
  bio: "Quantum Learner exploring qubits, circuit synthesis & quantum algorithms on QuantumVerse AI.",
  title: "Quantum Novice",
  streakDays: 0,
  totalXP: 0,
  level: 1,
  githubUsername: "sharavanakumar",
  leetcodeUsername: "sharavanakumar",
  linkedinUrl: "https://linkedin.com/in/sharavanakumar",
  heatMapData: {},
  badges: INITIAL_BADGES.map((b) => ({ ...b, unlocked: false, unlockedAt: undefined })),
  completedLessonIds: [],
  solvedChallengeIds: [],
  certificates: [],
};


export const PRESET_ACCOUNTS: UserProfile[] = [
  INITIAL_USER_PROFILE,
  {
    name: "Dr. Elena Rostova",
    email: "elena.rostova@quantum-lab.org",
    authProvider: "google",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=256",
    bio: "Senior Quantum Research Fellow specializing in Superconducting Qubit Error Correction.",
    title: "Senior Quantum Fellow",
    streakDays: 14,
    totalXP: 4200,
    level: 9,
    githubUsername: "elenarostova",
    leetcodeUsername: "elena_quantum",
    linkedinUrl: "https://linkedin.com/in/elena-rostova",
    heatMapData: generateHeatMapData(),
    badges: INITIAL_BADGES.map(b => ({ ...b, unlocked: true, unlockedAt: "2026-07-20" })),
    completedLessonIds: ["bits-1", "bits-2", "qubits-1", "qubits-2", "sup-1", "ent-1", "gates-1", "circuits-1"],
    solvedChallengeIds: ["ch-1", "ch-2", "ch-3"],
    certificates: [
      {
        id: "cert-qv-301",
        title: "Quantum Error Mitigation & Surface Codes",
        date: "2026-07-20",
        credentialId: "QV-2026-77810-C",
        issuer: "QuantumVerse AI Academy",
      }
    ],
  },
  {
    name: "Alex Chen",
    email: "alex.chen@qiskit-dev.io",
    authProvider: "github",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=256",
    bio: "Computer Science undergrad & Qiskit open source contributor building quantum circuits.",
    title: "Qiskit Developer",
    streakDays: 4,
    totalXP: 1450,
    level: 3,
    githubUsername: "alexchen_qiskit",
    leetcodeUsername: "alexchen",
    linkedinUrl: "https://linkedin.com/in/alexchen",
    heatMapData: generateHeatMapData(),
    badges: INITIAL_BADGES,
    completedLessonIds: ["bits-1", "qubits-1"],
    solvedChallengeIds: ["ch-1"],
    certificates: [],
  },
];
