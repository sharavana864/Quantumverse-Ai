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

export const INITIAL_USER_PROFILE: UserProfile = {
  name: "Sharavanakumar",
  email: "sharavanakumar864@gmail.com",
  authProvider: "google",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256",
  bio: "Quantum Engineer & Duolingo Quantum Explorer | Mastering Qiskit, Bloch Spheres & Quantum Algorithms.",
  title: "Quantum Scholar & Explorer",
  streakDays: 7,
  totalXP: 2850,
  level: 6,
  githubUsername: "sharavanakumar",
  leetcodeUsername: "sharavanakumar",
  linkedinUrl: "https://linkedin.com/in/sharavanakumar",
  heatMapData: generateHeatMapData(),
  badges: INITIAL_BADGES,
  completedLessonIds: ["bits-1", "bits-2", "qubits-1", "qubits-2", "sup-1", "ent-1"],
  solvedChallengeIds: ["ch-1", "ch-2"],
  certificates: [
    {
      id: "cert-qv-101",
      title: "Quantum Computing Foundations & Dirac Vector Calculus",
      date: "2026-07-25",
      credentialId: "QV-2026-98421-A",
      issuer: "QuantumVerse AI Academy",
    },
    {
      id: "cert-qv-201",
      title: "Bell Pair Entanglement & Quantum Teleportation Mastery",
      date: "2026-07-26",
      credentialId: "QV-2026-98422-B",
      issuer: "QuantumVerse AI Academy",
    },
  ],
};
