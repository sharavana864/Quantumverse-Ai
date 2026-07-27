/**
 * Audio Synthesizer utilizing Web Audio API for gamification sound effects.
 * Lightweight, zero external dependencies, responsive audio feedback.
 */

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioCtxClass) {
      audioCtx = new AudioCtxClass();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

/**
 * Play a short chime for correct quiz answers
 */
export function playCorrectSound() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  // High note double chime (E5 -> B5)
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "sine";
  osc.frequency.setValueAtTime(659.25, now); // E5
  osc.frequency.setValueAtTime(987.77, now + 0.08); // B5

  gain.gain.setValueAtTime(0.15, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.3);
}

/**
 * Play a subtle low thud for incorrect answers
 */
export function playIncorrectSound() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "sawtooth";
  osc.frequency.setValueAtTime(160, now);
  osc.frequency.exponentialRampToValueAtTime(100, now + 0.2);

  gain.gain.setValueAtTime(0.1, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.25);
}

/**
 * Play an ascending sparkle sound when gaining XP
 */
export function playXpGainSound() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6

  notes.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(freq, now + idx * 0.06);

    gain.gain.setValueAtTime(0.12, now + idx * 0.06);
    gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.25);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now + idx * 0.06);
    osc.stop(now + idx * 0.06 + 0.25);
  });
}

/**
 * Play a grand, triumphant congrats / achievement fanfare sound when unlocking a badge or levelling up!
 */
export function playAchievementSound() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  // Major triadic arpeggio: C5, E5, G5, C6, E6
  const arpeggio = [
    { freq: 523.25, time: 0 },
    { freq: 659.25, time: 0.08 },
    { freq: 783.99, time: 0.16 },
    { freq: 1046.5, time: 0.24 },
    { freq: 1318.51, time: 0.35 },
  ];

  arpeggio.forEach(({ freq, time }) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(freq, now + time);

    gain.gain.setValueAtTime(0.15, now + time);
    gain.gain.exponentialRampToValueAtTime(0.001, now + time + 0.35);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now + time);
    osc.stop(now + time + 0.35);
  });

  // Sustained triumphant C-Major chord (C5 + G5 + C6 + E6)
  const chordFreqs = [523.25, 783.99, 1046.5, 1318.51];
  const chordStart = now + 0.35;

  chordFreqs.forEach((freq) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, chordStart);

    gain.gain.setValueAtTime(0.1, chordStart);
    gain.gain.exponentialRampToValueAtTime(0.001, chordStart + 0.85);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(chordStart);
    osc.stop(chordStart + 0.85);
  });
}

/**
 * Play a victory sound when completing a quiz successfully
 */
export function playQuizCompleteSound() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  // Victory motif: G4 -> C5 -> E5 -> G5
  const notes = [
    { freq: 392.0, duration: 0.1, delay: 0 },
    { freq: 523.25, duration: 0.1, delay: 0.1 },
    { freq: 659.25, duration: 0.1, delay: 0.2 },
    { freq: 783.99, duration: 0.4, delay: 0.3 },
  ];

  notes.forEach(({ freq, duration, delay }) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, now + delay);

    gain.gain.setValueAtTime(0.16, now + delay);
    gain.gain.exponentialRampToValueAtTime(0.001, now + delay + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now + delay);
    osc.stop(now + delay + duration);
  });
}
