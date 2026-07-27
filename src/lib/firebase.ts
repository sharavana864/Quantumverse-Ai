import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported, Analytics } from "firebase/analytics";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import firebaseConfigFile from "../../firebase-applet-config.json";
import { UserProfile } from "../types";
import { INITIAL_BADGES } from "../data/badgesData";

// Structured & exported Firebase Configuration
export const firebaseConfig = {
  apiKey: firebaseConfigFile.apiKey || "AIzaSyAcRIuue53TgrLwIgEgZ0hJsgegFDe-tx0",
  authDomain: firebaseConfigFile.authDomain || "quantumverse-app.firebaseapp.com",
  projectId: firebaseConfigFile.projectId || "quantumverse-app",
  storageBucket: firebaseConfigFile.storageBucket || "quantumverse-app.firebasestorage.app",
  messagingSenderId: firebaseConfigFile.messagingSenderId || "67263678998",
  appId: firebaseConfigFile.appId || "1:67263678998:web:7a6897e29e87398b058337",
  measurementId: firebaseConfigFile.measurementId || "G-GXN701XY5V",
  firestoreDatabaseId: (firebaseConfigFile as { firestoreDatabaseId?: string }).firestoreDatabaseId || "ai-studio-quantumverseai-b1443510-769b-4601-987d-d266f812fa43",
};

// Initialize Firebase App
export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Analytics (safely in browser environments)
export let analytics: Analytics | null = null;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  }).catch(() => {});
}

// Initialize Auth
export const auth = getAuth(app);

// Initialize Firestore with custom database ID if present, or default
export const db = firebaseConfig.firestoreDatabaseId
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);

export const googleProvider = new GoogleAuthProvider();

export {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
};

export type { FirebaseUser };

/**
 * Helper to recursively strip `undefined` values so Firestore setDoc / updateDoc does not throw
 */
export function sanitizeForFirestore<T>(data: T): T {
  if (data === null || data === undefined) {
    return null as any;
  }
  if (Array.isArray(data)) {
    return data.map((item) => sanitizeForFirestore(item)) as any;
  }
  if (typeof data === "object") {
    const cleanObj: any = {};
    for (const [key, value] of Object.entries(data)) {
      if (value !== undefined) {
        cleanObj[key] = sanitizeForFirestore(value);
      }
    }
    return cleanObj;
  }
  return data;
}

/**
 * Sync or create user profile document in Firestore upon authentication
 */
export async function syncUserProfile(user: FirebaseUser, extraName?: string): Promise<UserProfile> {
  const userRef = doc(db, "users", user.uid);
  const snapshot = await getDoc(userRef);

  if (snapshot.exists()) {
    const data = snapshot.data();
    return {
      name: data.name || user.displayName || extraName || "Quantum Learner",
      email: data.email || user.email || "",
      authProvider: (data.authProvider as "google" | "github" | "email") || "email",
      avatar: data.avatar || user.photoURL || `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(user.uid)}`,
      bio: data.bio || "Exploring qubits & quantum computing algorithms.",
      title: data.title || "Quantum Scholar",
      streakDays: data.streakDays ?? 0,
      totalXP: data.totalXP ?? 0,
      level: data.level ?? 1,
      githubUsername: data.githubUsername || (user.email ? user.email.split("@")[0] : "user"),
      leetcodeUsername: data.leetcodeUsername || (user.email ? user.email.split("@")[0] : "user"),
      linkedinUrl: data.linkedinUrl || "https://linkedin.com",
      heatMapData: data.heatMapData || {},
      badges: data.badges || INITIAL_BADGES.map(({ unlockedAt, ...b }) => ({ ...b, unlocked: false })),
      completedLessonIds: data.completedLessonIds || [],
      solvedChallengeIds: data.solvedChallengeIds || [],
      certificates: data.certificates || [],
    };
  } else {
    // New User Document in Firestore
    const displayName = extraName || user.displayName || (user.email ? user.email.split("@")[0] : "Quantum Learner");
    const newProfile: UserProfile = {
      name: displayName,
      email: user.email || "",
      authProvider: user.providerData?.[0]?.providerId?.includes("google") ? "google" : "email",
      avatar: user.photoURL || `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(displayName)}`,
      bio: "Quantum computing learner starting the journey on QuantumVerse AI.",
      title: "Quantum Novice",
      streakDays: 0,
      totalXP: 0,
      level: 1,
      githubUsername: user.email ? user.email.split("@")[0] : "user",
      leetcodeUsername: user.email ? user.email.split("@")[0] : "user",
      linkedinUrl: "https://linkedin.com",
      heatMapData: {},
      badges: INITIAL_BADGES.map(({ unlockedAt, ...b }) => ({ ...b, unlocked: false })),
      completedLessonIds: [],
      solvedChallengeIds: [],
      certificates: [],
    };

    const payload = sanitizeForFirestore({
      ...newProfile,
      uid: user.uid,
      createdAt: new Date().toISOString(),
    });

    await setDoc(userRef, payload);

    return newProfile;
  }
}

/**
 * Save progress / profile changes to Firestore
 */
export async function saveUserProfileToFirestore(uid: string, updates: Partial<UserProfile>): Promise<void> {
  try {
    const userRef = doc(db, "users", uid);
    const cleanUpdates = sanitizeForFirestore(updates);
    await setDoc(userRef, cleanUpdates, { merge: true });
  } catch (err) {
    console.error("Failed to save profile to Firestore:", err);
  }
}
