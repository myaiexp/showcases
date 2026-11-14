// Time in samples: seconds depend on the sample rate
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { evenHits, hitSpec, num, type HitCase } from '../../shared/time-kit.ts';
import { toneStage } from '../../shared/stage.ts';

const SECONDS = 3;

const cases: HitCase[] = [22050, 8820, 2205, 441].map((n) => ({
  label: `${n}`,
  hits: () => {
    const gap = Tone.Time(`${n}samples`).toSeconds();
    const rate = Tone.getContext().sampleRate;
    return { caption: `"${n}samples" at this sample rate (${rate} Hz) = ${num(gap, 4)} s`, hits: evenHits(gap, SECONDS, () => `${n} samples = ${num(gap, 4)} s`) };
  },
}));

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: SECONDS });
  return stage.run(hitSpec(stage, SECONDS, cases));
};

export default mount;
