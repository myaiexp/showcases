// Echoes that repeat and fade: FeedbackDelay on melody
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { DRY, fxSpec, type Source } from '../../shared/fx-kit.ts';
import { toneStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 3.5 });

  return stage.run(
    fxSpec(stage, {
      source: 'melody',
      stages: ['FeedbackDelay'],
      caption: 'FeedbackDelay: each echo feeds the next',
      create: (src: Source) => {
        const fx = new Tone.FeedbackDelay('8n', 0.5).toDestination();
        fx.wet.value = 0.5;
        src.out.connect(fx);
        return fx;
      },
      variants: [
        DRY,
        { label: 'feedback 0.2', detail: 'feedback 0.2: two short echoes', apply: (fx) => { fx.feedback.value = 0.2; } },
        { label: 'feedback 0.7', detail: 'feedback 0.7: a long trail of echoes', apply: (fx) => { fx.feedback.value = 0.7; } },
      ],
      controls: (fx, bar) => {
        slider(bar, 'delayTime', 0.05, 0.9, 0.01, 0.25, (v) => { fx.delayTime.value = v; }, (v) => `${v} s`);
        slider(bar, 'feedback', 0, 0.95, 0.01, 0.5, (v) => { fx.feedback.value = v; });
        slider(bar, 'wet', 0, 1, 0.01, fx.wet.value, (v) => { fx.wet.value = v; });
      },
    }),
  );
};

export default mount;
