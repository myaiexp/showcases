// How each stand-in recording is played, in plain Web Audio on an offline context
export type RecordingName =
  | 'drums'
  | 'bass'
  | 'keys'
  | 'melody'
  | 'voice'
  | 'scale'
  | 'kick'
  | 'snare'
  | 'hat'
  | 'clap'
  | 'room'
  | 'hall';

export interface Recipe {
  seconds: number;
  channels: number;
  render(ctx: OfflineAudioContext): void;
}

const hz = (midi: number): number => 440 * 2 ** ((midi - 69) / 12);

function noise(ctx: BaseAudioContext, seconds: number, channels = 1): AudioBuffer {
  const buffer = ctx.createBuffer(channels, Math.ceil(seconds * ctx.sampleRate), ctx.sampleRate);
  // Seeded, so every page renders the same recording.
  let seed = 7;
  for (let c = 0; c < channels; c++) {
    const data = buffer.getChannelData(c);
    for (let i = 0; i < data.length; i++) {
      seed = (seed * 16807) % 2147483647;
      data[i] = (seed / 2147483647) * 2 - 1;
    }
  }
  return buffer;
}

/** A tone with a fast attack and an exponential fade, through a low-pass. */
function note(ctx: BaseAudioContext, midi: number, t: number, length: number, type: OscillatorType, cutoff: number, level = 0.3): void {
  const osc = ctx.createOscillator();
  osc.type = type;
  osc.frequency.value = hz(midi);
  const filter = ctx.createBiquadFilter();
  filter.frequency.value = cutoff;
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0, t);
  gain.gain.linearRampToValueAtTime(level, t + 0.005);
  gain.gain.exponentialRampToValueAtTime(0.001, t + length);
  osc.connect(filter).connect(gain).connect(ctx.destination);
  osc.start(t);
  osc.stop(t + length + 0.05);
}

function hit(ctx: BaseAudioContext, buffer: AudioBuffer, t: number, length: number, type: BiquadFilterType, freq: number, level: number): void {
  const src = ctx.createBufferSource();
  src.buffer = buffer;
  const filter = ctx.createBiquadFilter();
  filter.type = type;
  filter.frequency.value = freq;
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(level, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + length);
  src.connect(filter).connect(gain).connect(ctx.destination);
  src.start(t);
  src.stop(t + length);
}

function kick(ctx: BaseAudioContext, t: number): void {
  const osc = ctx.createOscillator();
  osc.frequency.setValueAtTime(140, t);
  osc.frequency.exponentialRampToValueAtTime(42, t + 0.15);
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.9, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
  osc.connect(gain).connect(ctx.destination);
  osc.start(t);
  osc.stop(t + 0.45);
}

/** A room's echo as heard from one spot: noise fading out, slightly different per ear. */
function impulse(ctx: OfflineAudioContext, seconds: number, decay: number): void {
  const buffer = noise(ctx, seconds, 2);
  for (let c = 0; c < 2; c++) {
    const data = buffer.getChannelData(c);
    for (let i = 0; i < data.length; i++) data[i]! *= Math.exp((-decay * i) / ctx.sampleRate);
  }
  const src = ctx.createBufferSource();
  src.buffer = buffer;
  src.connect(ctx.destination);
  src.start(0);
}

const RECIPES: Record<RecordingName, Recipe> = {
  // One bar of a 120 BPM beat: kick, snare and hi-hat, two seconds long.
  drums: {
    seconds: 2,
    channels: 1,
    render(ctx) {
      const buffer = noise(ctx, 0.3);
      for (let i = 0; i < 8; i++) {
        const t = i * 0.25;
        if (i % 4 === 0 || i === 6) kick(ctx, t);
        if (i % 4 === 2) hit(ctx, buffer, t, 0.2, 'bandpass', 1800, 0.8);
        hit(ctx, buffer, t + 0.125, 0.05, 'highpass', 7000, 0.25);
      }
    },
  },
  // A bass line under the drums: C, C, Eb, F.
  bass: {
    seconds: 2,
    channels: 1,
    render(ctx) {
      [36, 36, 39, 41].forEach((m, i) => note(ctx, m, i * 0.5, 0.45, 'sawtooth', 500, 0.5));
    },
  },
  // Two chords on an electric-piano-like tone: C minor, then F.
  keys: {
    seconds: 2,
    channels: 1,
    render(ctx) {
      [60, 63, 67].forEach((m) => note(ctx, m, 0, 0.95, 'triangle', 2500, 0.2));
      [60, 65, 69].forEach((m) => note(ctx, m, 1, 0.95, 'triangle', 2500, 0.2));
    },
  },
  // A plucked phrase of eight notes, a quarter second apart.
  melody: {
    seconds: 2,
    channels: 1,
    render(ctx) {
      [64, 67, 69, 71, 74, 71, 69, 67].forEach((m, i) => note(ctx, m, i * 0.25, 0.3, 'sawtooth', 3000));
    },
  },
  // A sung "ah": a buzzy tone with vibrato through three vowel-shaped band-pass filters.
  voice: {
    seconds: 2,
    channels: 1,
    render(ctx) {
      const osc = ctx.createOscillator();
      osc.type = 'sawtooth';
      osc.frequency.value = 220;
      const lfo = ctx.createOscillator();
      lfo.frequency.value = 5.5;
      const depth = ctx.createGain();
      depth.gain.value = 6;
      lfo.connect(depth).connect(osc.frequency);
      const env = ctx.createGain();
      env.gain.setValueAtTime(0, 0);
      env.gain.linearRampToValueAtTime(0.5, 0.15);
      env.gain.setValueAtTime(0.5, 1.5);
      env.gain.linearRampToValueAtTime(0, 1.9);
      env.connect(ctx.destination);
      for (const [frequency, Q] of [[730, 8], [1090, 10], [2440, 12]] as const) {
        const f = ctx.createBiquadFilter();
        f.type = 'bandpass';
        f.frequency.value = frequency;
        f.Q.value = Q;
        osc.connect(f).connect(env);
      }
      osc.start(0);
      lfo.start(0);
      osc.stop(2);
      lfo.stop(2);
    },
  },
  // Eight rising notes, half a second each: easy to hear where in the file you are.
  scale: {
    seconds: 4,
    channels: 1,
    render(ctx) {
      [60, 62, 64, 65, 67, 69, 71, 72].forEach((m, i) => note(ctx, m, i * 0.5, 0.45, 'square', 2200, 0.2));
    },
  },
  // Single drum hits, for pads.
  kick: { seconds: 0.5, channels: 1, render: (ctx) => kick(ctx, 0) },
  snare: { seconds: 0.4, channels: 1, render: (ctx) => hit(ctx, noise(ctx, 0.4), 0, 0.25, 'bandpass', 1800, 0.8) },
  hat: { seconds: 0.2, channels: 1, render: (ctx) => hit(ctx, noise(ctx, 0.2), 0, 0.08, 'highpass', 7000, 0.6) },
  // Three quick noise bursts close together, the way a handclap smears.
  clap: {
    seconds: 0.4,
    channels: 1,
    render(ctx) {
      const buffer = noise(ctx, 0.4);
      [0, 0.012, 0.024].forEach((t, i) => hit(ctx, buffer, t, i === 2 ? 0.18 : 0.03, 'bandpass', 1200, 0.7));
    },
  },
  // Impulse responses for Convolver: a small room and a large hall.
  room: { seconds: 0.8, channels: 2, render: (ctx) => impulse(ctx, 0.8, 7) },
  hall: { seconds: 3, channels: 2, render: (ctx) => impulse(ctx, 3, 1.8) },
};

export function recipe(name: RecordingName): Recipe {
  return RECIPES[name];
}
