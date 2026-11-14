// FMSynth: harmonicity and modulationIndex give a bell or a brass
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { playable, playNotes } from '../../shared/instrument-phrase.ts';
import { toneStage } from '../../shared/stage.ts';
import { bigLabel, keyboard } from '../../shared/widgets.ts';

const KINDS = {
  bell: {
    harmonicity: 3.01,
    modulationIndex: 14,
    envelope: { attack: 0.001, decay: 2, sustain: 0.1, release: 2 },
    modulationEnvelope: { attack: 0.002, decay: 0.3, sustain: 0, release: 0.3 },
    hold: 0.3,
  },
  brass: {
    harmonicity: 1,
    modulationIndex: 5,
    envelope: { attack: 0.08, decay: 0.1, sustain: 0.8, release: 0.3 },
    modulationEnvelope: { attack: 0.12, decay: 0.3, sustain: 0.6, release: 0.3 },
    hold: 0.7,
  },
} as const;
type Kind = keyof typeof KINDS;
const NOTES = ['G4', 'C5', 'E5'];

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 3 });
  const keys = keyboard(stage.visual, 'C4', 'E5');
  const label = bigLabel(stage.visual);
  let kind: Kind = 'bell';
  const shape = (synth: Tone.FMSynth, k: Kind): void => {
    const { hold: _hold, ...opts } = KINDS[k];
    kind = k;
    synth.set(opts);
  };

  return stage.run({
    build: () => {
      const synth = new Tone.FMSynth().toDestination();
      shape(synth, 'bell');
      return synth;
    },

    play: (synth, time) => {
      const text = `harmonicity ${synth.harmonicity.value}\nmodulation index ${synth.modulationIndex.value}`;
      stage.show(time, () => (label.textContent = text));
      playNotes(stage, keys, synth, NOTES, time, { step: 0.9, hold: KINDS[kind].hold });
    },

    variants: (Object.keys(KINDS) as Kind[]).map((k) => ({ label: k, apply: (synth: Tone.FMSynth) => shape(synth, k) })),

    controls: (synth, bar) => {
      playable(keys, synth, KINDS[kind].hold);
      slider(bar, 'harmonicity', 0.25, 8, 0.01, 3.01, (v) => (synth.harmonicity.value = v));
      slider(bar, 'modulation index', 0, 40, 0.5, 14, (v) => (synth.modulationIndex.value = v));
      slider(bar, 'decay', 0.1, 3, 0.1, 2, (v) => (synth.envelope.decay = v), (v) => `${v}s`);
    },
  });
};

export default mount;
