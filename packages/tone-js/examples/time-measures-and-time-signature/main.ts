// "1m" is one measure: its seconds depend on tempo and time signature
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { evenHits, hitSpec, num, type HitCase } from '../../shared/time-kit.ts';
import { toneStage } from '../../shared/stage.ts';

const SECONDS = 4;

const cases: HitCase[] = [3, 4, 5].map((beats) => ({
  label: `${beats} beats`,
  setup: () => {
    Tone.getTransport().timeSignature = beats;
  },
  hits: () => {
    const beat = Tone.Time('4n').toSeconds();
    const measure = Tone.Time('1m').toSeconds();
    return {
      caption: `timeSignature = ${beats}: "1m" = ${num(measure)} s`,
      hits: evenHits(beat, SECONDS, (i) => `bar ${Math.floor(i / beats) + 1}, beat ${(i % beats) + 1}`, beats).map((h, i) => ({ ...h, accent: i % beats === 0 })),
    };
  },
}));

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: SECONDS });
  return stage.run(hitSpec(stage, SECONDS, cases));
};

export default mount;
