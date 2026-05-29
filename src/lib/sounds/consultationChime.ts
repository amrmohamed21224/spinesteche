let audioContext: AudioContext | null = null;

/**
 * Short bell chime via Web Audio (no external asset).
 * Plays on user gesture; fails silently if audio is blocked.
 */
export function playConsultationChime(): void {
  if (typeof window === "undefined") return;

  try {
    audioContext ??= new AudioContext();
    if (audioContext.state === "suspended") {
      void audioContext.resume();
    }

    const ctx = audioContext;
    const t0 = ctx.currentTime;

    const tones = [
      { freq: 784, gain: 0.14, delay: 0 },
      { freq: 988, gain: 0.1, delay: 0.06 },
      { freq: 1318, gain: 0.07, delay: 0.1 },
    ];

    tones.forEach(({ freq, gain, delay }) => {
      const osc = ctx.createOscillator();
      const env = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, t0 + delay);

      env.gain.setValueAtTime(0.0001, t0 + delay);
      env.gain.exponentialRampToValueAtTime(gain, t0 + delay + 0.02);
      env.gain.exponentialRampToValueAtTime(0.0001, t0 + delay + 0.55);

      osc.connect(env);
      env.connect(ctx.destination);

      osc.start(t0 + delay);
      osc.stop(t0 + delay + 0.6);
    });
  } catch {
    // Autoplay policy or unsupported environment
  }
}
