// LFO phase: where in its cycle the wobble starts
import type { Mount } from '@/types.ts';
import { lfoPitch, type LfoCase } from '../../shared/lfo-pitch.ts';
import { toneStage } from '../../shared/stage.ts';

const SECONDS = 3;
const START: Record<number, string> = { 0: 'starts in the middle, rising', 90: 'starts at the bottom', 180: 'starts in the middle, falling', 270: 'starts at the top' };
const at = (phase: number): LfoCase => ({
  label: `phase ${phase}`,
  caption: `phase: ${phase}: ${START[phase]}`,
  rate: 1,
  min: 250,
  max: 700,
  type: 'sine',
  phase,
});

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: SECONDS });
  return stage.run(lfoPitch(stage, SECONDS, [0, 90, 180, 270].map(at)));
};

export default mount;
