// Basic synthesis: an oscillator plus an envelope, then packaged as Tone.Synth
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { toneStage } from '../../shared/stage.ts';
import { bigLabel, keyboard } from '../../shared/widgets.ts';

const NOTES = ['C4', 'E4', 'G4', 'C5'];
type Stage3 = 'bare' | 'envelope' | 'packaged';
const STAGES: [Stage3, string, string][] = [
  ['bare', 'oscillator only', 'OmniOscillator -> speakers: every start and stop clicks'],
  ['envelope', '+ AmplitudeEnvelope', 'OmniOscillator -> AmplitudeEnvelope -> speakers'],
  ['packaged', 'Tone.Synth', 'the same two parts in one Tone.Synth'],
];

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 2.4 });
  const keys = keyboard(stage.visual, 'C4', 'C5');
  const label = bigLabel(stage.visual);
  let which: Stage3 = 'bare';

  return stage.run({
    build: () => {
      const bare = new Tone.OmniOscillator({ type: 'square', volume: -16 }).toDestination();
      const env = new Tone.AmplitudeEnvelope({ attack: 0.02, decay: 0.1, sustain: 0.6, release: 0.2 }).toDestination();
      const shaped = new Tone.OmniOscillator({ type: 'square', volume: -16 }).connect(env);
      const synth = new Tone.Synth({ oscillator: { type: 'square' }, volume: -16 }).toDestination();
      return { bare, env, shaped, synth };
    },

    play: (p, time) => {
      const text = STAGES.find((s) => s[0] === which)![2];
      stage.show(time, () => (label.textContent = text));
      NOTES.forEach((note, i) => {
        const at = time + i * 0.6;
        if (which === 'bare') {
          p.bare.frequency.setValueAtTime(note, at);
          p.bare.start(at).stop(at + 0.4);
        } else if (which === 'envelope') {
          p.shaped.frequency.setValueAtTime(note, at);
          p.env.triggerAttackRelease(0.4, at);
        } else p.synth.triggerAttackRelease(note, 0.4, at);
        stage.show(at, () => keys.press(note, 0.4));
      });
      // The shaped oscillator runs the whole pass; the envelope decides when it is heard.
      if (which === 'envelope') p.shaped.start(time).stop(time + 2.4);
    },
    stop: (p, time) => {
      p.synth.triggerRelease(time);
      p.env.triggerRelease(time);
    },

    variants: STAGES.map(([w, name]) => ({ label: name, apply: () => (which = w) })),

    controls: (p, bar) => {
      slider(bar, 'attack', 0.005, 1, 0.005, 0.02, (v) => (p.env.attack = v), (v) => `${v}s`);
      slider(bar, 'release', 0.01, 1.5, 0.01, 0.2, (v) => (p.env.release = v), (v) => `${v}s`);
    },
  });
};

export default mount;
