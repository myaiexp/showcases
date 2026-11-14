// Custom curve: attackCurve and releaseCurve accept an array of levels
import type * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { ampVoice, envView, type AmpVoice } from '../../shared/env-plot.ts';
import { toneStage } from '../../shared/stage.ts';

// Each array is the path from silent (0) to full (1), spread evenly over the attack time.
const SHAPES = {
  staircase: [0, 0, 0.25, 0.25, 0.5, 0.5, 0.75, 0.75, 1, 1],
  stutter: [0, 0.8, 0.1, 0.9, 0.2, 1, 0.4, 1],
  'swoop and settle': [0, 0.5, 0.9, 1, 0.94, 1],
} as const;
type Name = keyof typeof SHAPES;

const apply = (g: AmpVoice, name: Name): void => {
  // The release is the same path read backwards, so the note ends as it began.
  g.env.attackCurve = [...SHAPES[name]];
  g.env.releaseCurve = [...SHAPES[name]].reverse();
};

const describe = (env: Tone.Envelope): string => `attackCurve: [${(env.attackCurve as number[]).join(', ')}]`;

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 3 });
  const view = envView(stage);

  return stage.run({
    build: () => ampVoice({ attack: 0.9, decay: 0.1, sustain: 0.8, release: 0.9 }, 'sawtooth'),

    play: ({ env }, time) => {
      const { hold } = view.show(env, time, describe(env));
      env.triggerAttackRelease(hold, time);
    },

    variants: (Object.keys(SHAPES) as Name[]).map((name) => ({ label: name, apply: (g: AmpVoice) => apply(g, name) })),

    frame: (t) => view.frame(t),

    controls: (g, bar) => {
      apply(g, 'staircase');
      view.preview(g.env, describe(g.env));
      select(bar, 'curve', Object.keys(SHAPES) as Name[], (name) => apply(g, name));
    },
  });
};

export default mount;
