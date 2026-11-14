// FeedbackCombFilter: a very short echo makes a drum loop ring at one pitch
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { fxSpec, type Source } from '../../shared/fx-kit.ts';
import { toneStage } from '../../shared/stage.ts';

// The delay in seconds sets the pitch it rings at: 1 / delay.
const DELAYS = [0.01, 0.004, 0.0016] as const;

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 2.4 });

  return stage.run(
    fxSpec(stage, {
      source: 'drums',
      stages: ['FeedbackCombFilter'],
      caption: 'FeedbackCombFilter: delayTime sets the pitch',
      create: (src: Source) => {
        const comb = new Tone.FeedbackCombFilter({ delayTime: DELAYS[0], resonance: 0.8 }).toDestination();
        // The feedback piles up energy, so the source goes in quieter.
        src.out.gain.value = 0.25;
        src.out.connect(comb);
        return comb;
      },
      variants: DELAYS.map((d) => ({
        label: `${d * 1000} ms`,
        detail: `delayTime ${d * 1000} ms: rings at about ${Math.round(1 / d)} Hz`,
        apply: (comb: Tone.FeedbackCombFilter) => (comb.delayTime.value = d),
      })),
      controls: (comb, bar) => {
        slider(bar, 'delayTime', 0.5, 12, 0.5, 10, (v) => (comb.delayTime.value = v / 1000), (v) => `${v} ms`);
        slider(bar, 'resonance', 0, 0.95, 0.01, 0.8, (v) => (comb.resonance.value = v));
      },
    }),
  );
};

export default mount;
