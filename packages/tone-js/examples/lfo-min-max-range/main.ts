// LFO min and max: the range of the swing, steering pitch
import type { Mount } from '@/types.ts';
import { lfoPitch, type LfoCase } from '../../shared/lfo-pitch.ts';
import { toneStage } from '../../shared/stage.ts';

const SECONDS = 3;
const range = (label: string, min: number, max: number): LfoCase => ({
  label,
  caption: `new Tone.LFO(1.5, ${min}, ${max}): pitch swings between ${min} and ${max} Hz`,
  rate: 1.5,
  min,
  max,
  type: 'sine',
  phase: 0,
});

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: SECONDS });
  return stage.run(lfoPitch(stage, SECONDS, [range('narrow', 380, 460), range('medium', 300, 600), range('wide', 150, 850)]));
};

export default mount;
