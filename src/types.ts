export type ModuleId =
  | "bits"
  | "qubits"
  | "superposition"
  | "entanglement"
  | "gates"
  | "circuits"
  | "algorithms";

export type SkillLevel = "Beginner" | "Intermediate" | "Advanced";

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  category?: string;
  confidence?: "hard" | "good" | "easy";
}

export interface MindMapNode {
  id: string;
  label: string;
  type: "root" | "branch" | "leaf";
  description?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  recommendedTopic: string;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  videoUrl?: string;
  summary: string;
  keyConcepts: string[];
  starterCode?: string;
  flashcards: Flashcard[];
  mindMapNodes?: MindMapNode[];
  quizQuestions: QuizQuestion[];
  completed?: boolean;
}

export interface Module {
  id: ModuleId;
  title: string;
  subtitle: string;
  icon: string;
  difficulty: SkillLevel;
  description: string;
  lessons: Lesson[];
  prerequisites?: string[];
}

export type GateType =
  | "H"
  | "X"
  | "Y"
  | "Z"
  | "S"
  | "T"
  | "CNOT"
  | "SWAP"
  | "MEASURE";

export interface PlacedGate {
  id: string;
  type: GateType;
  qubit: number; // Wire index 0, 1, 2
  column: number; // Time step 0..7
  controlQubit?: number; // Target for CNOT / SWAP
}

export interface StateVectorAmplitude {
  label: string; // e.g., "|000⟩"
  real: number;
  imag: number;
  magnitude: number;
  probability: number; // 0..100%
  phaseDeg: number; // 0..360
}

export interface BlochCoordinate {
  qubit: number;
  theta: number; // 0..PI
  phi: number; // 0..2PI
  x: number;
  y: number;
  z: number;
}

export interface CircuitSimulationResult {
  stateVector: StateVectorAmplitude[];
  blochCoordinates: BlochCoordinate[];
  probabilities: { [binaryState: string]: number };
  qiskitCode: string;
  cirqCode: string;
}

export interface CodingChallenge {
  id: string;
  title: string;
  difficulty: SkillLevel;
  points: number;
  description: string;
  qiskitTemplate: string;
  cirqTemplate: string;
  expectedCounts: { [state: string]: number }; // e.g., { "00": 512, "11": 512 }
  hints: string[];
  solved: boolean;
  category: "Bell State" | "Algorithms" | "Gates" | "Error Mitigation";
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  category: "streak" | "code" | "quiz" | "event" | "module";
  iconName: string;
  rarity: "Common" | "Rare" | "Epic" | "Legendary";
  unlocked: boolean;
  unlockedAt?: string;
}

export interface Certificate {
  id: string;
  title: string;
  date: string;
  credentialId: string;
  issuer: string;
}

export interface UserProfile {
  name: string;
  email?: string;
  authProvider?: "google" | "github" | "email" | "passkey";
  avatar: string;
  bio: string;
  title: string;
  streakDays: number;
  totalXP: number;
  level: number;
  githubUsername: string;
  leetcodeUsername: string;
  linkedinUrl: string;
  heatMapData: { [dateStr: string]: number }; // e.g., "2026-07-27": 4
  badges: Badge[];
  completedLessonIds: string[];
  solvedChallengeIds: string[];
  certificates: Certificate[];
}

export interface EventItem {
  id: string;
  title: string;
  hostName: string;
  verifiedHost: boolean;
  type: "Workshop" | "Hackathon" | "Seminar" | "Competition";
  date: string;
  time: string;
  location: string;
  description: string;
  tags: string[];
  rsvpCount: number;
  isRsvped: boolean;
  resourcesUrl?: string;
  speakerRole?: string;
}

export interface CareerPaper {
  id: string;
  title: string;
  authors: string[];
  journal: string;
  year: number;
  abstract: string;
  paperUrl: string;
  category: "Quantum Algorithms" | "Hardware & Hardware Engineering" | "Quantum Error Correction" | "Quantum Machine Learning";
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  avatar: string;
  xp: number;
  streak: number;
  badgesCount: number;
  title: string;
  isCurrentUser?: boolean;
}

export interface ResourceItem {
  id: string;
  title: string;
  type: "PDF" | "Video" | "Slide" | "Note";
  topic: string;
  url: string;
  addedAt: string;
  summaryNotes?: string;
  aiFlashcards?: Flashcard[];
}

export interface UserResourceNote {
  id: string;
  title: string;
  topic: string;
  content: string;
  type: "notes" | "slides" | "video_link" | "pdf_summary";
  dateAdded: string;
  aiSummary?: string;
  flashcards?: Flashcard[];
}
