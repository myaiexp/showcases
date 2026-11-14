// Stand-in recordings rendered in code, so Player examples load no audio files
import * as Tone from 'tone';

/**
 * The docs load mp3s from tonejs.github.io; cards may not fetch, so these "recordings" are
 * rendered with Tone.Offline instead. It works inside a card render too: Tone.Offline nests,
 * saving and restoring whichever context is current. Each result is cached per sample
 * rate, and every call returns a fresh ToneAudioBuffer around the cached AudioBuffer, so an
 * example may dispose what it gets.
 */
export type SampleName = 'drums' | 'voice' | 'melody' | 'chord' | 'gong';

const RECIPES: Record<SampleName, { seconds: number; render(): void }> = {
  // Two bars-worth of a 120 BPM beat in 2 seconds: kick, snare and hi-hat.
  drums: {
    seconds: 2,
    render() {
      const kick = new Tone.MembraneSynth().toDestination();
      const snare = new Tone.NoiseSynth({ envelope: { attack: 0.001, decay: 0.15, sustain: 0 } }).toDestination();
      const hat = new Tone.MetalSynth({ envelope: { attack: 0.001, decay: 0.05, release: 0.01 }, volume: -18 }).toDestination();
      for (let i = 0; i < 8; i++) {
        const t = i * 0.25;
        if (i % 4 === 0 || i === 6) kick.triggerAttackRelease('C1', '8n', t);
        if (i % 4 === 2) snare.triggerAttackRelease('16n', t);
        hat.triggerAttackRelease('C6', '32n', t + 0.125);
      }
    },
  },
  // A sung "ah": a sawtooth with vibrato through three vowel-formant band-pass filters.
  voice: {
    seconds: 2,
    render() {
      const env = new Tone.AmplitudeEnvelope({ attack: 0.15, decay: 0.1, sustain: 0.9, release: 0.4 }).toDestination();
      const formants = ([[730, 8], [1090, 10], [2440, 12]] as const).map(([frequency, Q]) =>
        new Tone.Filter({ frequency, Q, type: 'bandpass' }).connect(env),
      );
      const osc = new Tone.Oscillator('A3', 'sawtooth');
      new Tone.LFO(5.5, 214, 226).start(0).connect(osc.frequency);
      osc.fan(...formants).start(0).stop(2);
      env.triggerAttackRelease(1.5, 0);
    },
  },
  // A plucked phrase, for time-stretching and pitch-shifting.
  melody: {
    seconds: 2,
    render() {
      const pluck = new Tone.PolySynth(Tone.FMSynth, { modulationIndex: 4, envelope: { decay: 0.4, sustain: 0.1 } }).toDestination();
      pluck.volume.value = -8;
      ['E4', 'G4', 'A4', 'B4', 'D5', 'B4', 'A4', 'G4'].forEach((n, i) => pluck.triggerAttackRelease(n, 0.2, i * 0.25));
    },
  },
  // A soft piano-like chord with a long tail.
  chord: {
    seconds: 3,
    render() {
      const keys = new Tone.PolySynth(Tone.Synth, { envelope: { attack: 0.005, decay: 1.2, sustain: 0.15, release: 1.2 } }).toDestination();
      keys.volume.value = -10;
      keys.triggerAttackRelease(['C4', 'E4', 'G4', 'B4'], 1.5, 0);
    },
  },
  // One struck metal note with a long ring, the stand-in for the docs' gong sample.
  gong: {
    seconds: 3,
    render() {
      const gong = new Tone.FMSynth({
        harmonicity: 1.41,
        modulationIndex: 12,
        envelope: { attack: 0.002, decay: 2.5, sustain: 0, release: 0.5 },
        modulationEnvelope: { attack: 0.002, decay: 1.5, sustain: 0, release: 0.5 },
      }).toDestination();
      gong.triggerAttackRelease('C3', 2.8, 0);
    },
  },
};

/** Scales the recording so its loudest sample is at 0.8: every stand-in plays at a similar level. */
function normalize(buffer: AudioBuffer): AudioBuffer {
  let peak = 0;
  for (let c = 0; c < buffer.numberOfChannels; c++) for (const v of buffer.getChannelData(c)) peak = Math.max(peak, Math.abs(v));
  if (peak > 0) for (let c = 0; c < buffer.numberOfChannels; c++) {
    const data = buffer.getChannelData(c);
    for (let i = 0; i < data.length; i++) data[i]! *= 0.8 / peak;
  }
  return buffer;
}

const cache = new Map<string, Promise<AudioBuffer>>();

/** A stand-in recording, at the current context's sample rate. */
export async function sample(name: SampleName): Promise<Tone.ToneAudioBuffer> {
  const rate = Tone.getContext().sampleRate;
  const key = `${name}@${rate}`;
  let pending = cache.get(key);
  if (!pending) {
    const recipe = RECIPES[name];
    pending = Tone.Offline(() => recipe.render(), recipe.seconds, 1, rate).then((b) => normalize(b.get()!));
    cache.set(key, pending);
    pending.catch(() => cache.delete(key));
  }
  return new Tone.ToneAudioBuffer(await pending);
}
