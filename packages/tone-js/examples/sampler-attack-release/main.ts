// Sampler attack and release: fade a recording in or let it ring out
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { playable, playNotes } from '../../shared/instrument-phrase.ts';
import { sample } from '../../shared/samples.ts';
import { toneStage } from '../../shared/stage.ts';
import { bigLabel, keyboard } from '../../shared/widgets.ts';

const SHAPES = [
  { label: 'attack 0, release 0.05', attack: 0, release: 0.05 },
  { label: 'attack 0.6, release 0.05', attack: 0.6, release: 0.05 },
  { label: 'attack 0, release 1.5', attack: 0, release: 1.5 },
];

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 3 });
  const keys = keyboard(stage.visual, 'C4', 'C5');
  const label = bigLabel(stage.visual);

  return stage.run({
    // The "chord" stand-in recording rings for about three seconds, so there is a tail to cut or keep.
    build: async () => new Tone.Sampler({ urls: { C4: await sample('chord') }, volume: -4 }).toDestination(),

    play: (sampler, time) => {
      const text = `attack ${sampler.attack}s   release ${sampler.release}s`;
      stage.show(time, () => (label.textContent = text));
      playNotes(stage, keys, sampler, ['C4', 'F4'], time, { step: 1.5, hold: 0.7 });
    },
    stop: (sampler, time) => void sampler.releaseAll(time),

    variants: SHAPES.map((s) => ({
      label: s.label,
      apply: (sampler: Tone.Sampler) => Object.assign(sampler, { attack: s.attack, release: s.release }),
    })),

    controls: (sampler, bar) => {
      playable(keys, sampler, 0.7);
      slider(bar, 'attack', 0, 1, 0.01, 0, (v) => (sampler.attack = v), (v) => `${v}s`);
      slider(bar, 'release', 0, 3, 0.05, 0.1, (v) => (sampler.release = v), (v) => `${v}s`);
      select(bar, 'curve', ['exponential', 'linear'] as const, (v) => (sampler.curve = v));
    },
  });
};

export default mount;
