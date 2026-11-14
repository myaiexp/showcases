// Retrigger: hitting an envelope mid-release restarts from the current level
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { ampVoice, type AmpVoice } from '../../shared/env-plot.ts';
import { toneStage } from '../../shared/stage.ts';
import { bigLabel, pads } from '../../shared/widgets.ts';

const NOTES = ['C4', 'E4', 'G4', 'C5', 'G4', 'E4'];
// Seconds between notes: far enough apart for each release to finish, or crowding it.
const GAPS = { 'spaced out': 1.1, 'rapid fire': 0.2 } as const;

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 3.2 });
  const grid = pads(stage.visual, NOTES.map((_, i) => `hit ${i + 1}`));
  const label = bigLabel(stage.visual);
  let gap: number = GAPS['spaced out'];

  return stage.run({
    build: () => ampVoice({ attack: 0.01, decay: 0.1, sustain: 0.6, release: 0.9 }, 'sawtooth'),

    play: ({ osc, env }, time) => {
      const count = gap > 0.5 ? 3 : NOTES.length;
      stage.show(time, () => (label.textContent = `${count} hits, ${gap} s apart\nrelease takes ${env.release} s`));
      NOTES.slice(0, count).forEach((note, i) => {
        const at = time + i * gap;
        osc.frequency.setValueAtTime(Tone.Frequency(note).toFrequency(), at);
        env.triggerAttackRelease(0.1, at);
        stage.show(at, () => grid.hit(i, 0.4));
      });
    },

    variants: (Object.keys(GAPS) as (keyof typeof GAPS)[]).map((name) => ({
      label: name,
      apply: (_: AmpVoice) => {
        gap = GAPS[name];
      },
    })),

    controls: (_, bar) => {
      select(bar, 'hits', Object.keys(GAPS) as (keyof typeof GAPS)[], (name) => {
        gap = GAPS[name];
      });
    },
  });
};

export default mount;
