// Time in hertz: "5hz" is a fifth of a second; fast clicks fuse to a pitch
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { evenHits, hitSpec, num, type HitCase } from '../../shared/time-kit.ts';
import { toneStage } from '../../shared/stage.ts';

const SECONDS = 3;

const cases: HitCase[] = [2, 5, 12, 40].map((hz) => ({
  label: `"${hz}hz"`,
  hits: () => {
    const gap = Tone.Time(`${hz}hz`).toSeconds();
    return { caption: `a click every "${hz}hz" = ${num(gap)} s${hz >= 30 ? ': so fast it fuses into a buzz' : ''}`, hits: evenHits(gap, SECONDS, () => `"${hz}hz" = ${num(gap)} s`) };
  },
}));

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: SECONDS });
  return stage.run(hitSpec(stage, SECONDS, cases));
};

export default mount;
