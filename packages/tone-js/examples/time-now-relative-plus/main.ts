// "+" times: "+0.5" means half a second from right now, whenever now is
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { hitSpec, num, type HitCase } from '../../shared/time-kit.ts';
import { toneStage } from '../../shared/stage.ts';

const SECONDS = 3;
const SETS: { label: string; times: string[] }[] = [
  { label: 'seconds', times: ['+0.5', '+1', '+1.5', '+2'] },
  { label: 'note lengths', times: ['+4n', '+2n', '+2n.', '+1m'] },
];

const cases: HitCase[] = SETS.map((s) => ({
  label: s.label,
  hits: () => {
    const base = Tone.now();
    return {
      caption: 'each hit is placed with a "+" time, counted from the moment play was pressed',
      // Time("+x") already adds now, so the hit's offset in the pass is that minus the start.
      hits: s.times.map((t) => {
        const abs = Tone.Time(t).toSeconds();
        return { at: abs - base, text: `"${t}" = ${num(abs - base)} s from now`, accent: false };
      }),
    };
  },
}));

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: SECONDS });
  return stage.run(hitSpec(stage, SECONDS, cases));
};

export default mount;
