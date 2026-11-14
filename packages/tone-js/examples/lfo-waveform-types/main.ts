// LFO type: sine, triangle, square and sawtooth swings on pitch
import type { Mount } from '@/types.ts';
import { lfoPitch, type LfoCase } from '../../shared/lfo-pitch.ts';
import type { WaveType } from '../../shared/signal-kit.ts';
import { toneStage } from '../../shared/stage.ts';

const SECONDS = 3;
const NOTES: Record<WaveType, string> = {
  sine: 'glides smoothly back and forth',
  triangle: 'rises and falls at a steady speed',
  square: 'jumps between two pitches, a trill',
  sawtooth: 'climbs, then snaps back down',
};
const shape = (type: WaveType): LfoCase => ({
  label: type,
  caption: `type: '${type}': ${NOTES[type]}`,
  rate: 1.5,
  min: 250,
  max: 700,
  type,
  phase: 0,
});

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: SECONDS });
  return stage.run(lfoPitch(stage, SECONDS, (['sine', 'triangle', 'square', 'sawtooth'] as const).map(shape)));
};

export default mount;
