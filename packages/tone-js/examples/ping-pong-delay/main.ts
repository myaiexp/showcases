// Echo that bounces left and right: PingPongDelay on drums
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { DRY, fxSpec, type Source } from '../../shared/fx-kit.ts';
import { toneStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 3.5, channels: 2 });

  return stage.run(
    fxSpec(stage, {
      source: 'drums',
      stages: ['PingPongDelay'],
      caption: 'PingPongDelay: left, right, left, right',
      create: (src: Source) => {
        const fx = new Tone.PingPongDelay('8n', 0.5).toDestination();
        fx.wet.value = 0.5;
        src.out.connect(fx);
        return fx;
      },
      variants: [
        DRY,
        { label: '8th note', detail: 'delayTime 8n, feedback 0.5', apply: () => undefined },
        { label: '16th note', detail: 'delayTime 16n, feedback 0.7', apply: (fx) => { fx.delayTime.value = '16n'; fx.feedback.value = 0.7; } },
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
