// ─── Pleasant click sound using Web Audio API ────────────────────
// No audio file needed — generated in the browser
export function playClickSound(type: 'nav' | 'chip' | 'open' | 'close' = 'nav') {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    // Different tones for different interactions
    const configs = {
      nav:   { freq: 880, type: 'sine'     as OscillatorType, duration: 0.08, volume: 0.12 },
      chip:  { freq: 660, type: 'sine'     as OscillatorType, duration: 0.06, volume: 0.10 },
      open:  { freq: 520, type: 'triangle' as OscillatorType, duration: 0.15, volume: 0.15 },
      close: { freq: 350, type: 'triangle' as OscillatorType, duration: 0.12, volume: 0.10 },
    };

    const c = configs[type];
    osc.type = c.type;
    osc.frequency.setValueAtTime(c.freq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(c.freq * 0.8, ctx.currentTime + c.duration);

    gain.gain.setValueAtTime(c.volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + c.duration);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + c.duration);
  } catch {
    // Silently fail if audio not supported
  }
}
