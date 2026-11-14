// Thicken a riff with extra harmonics: Chebyshev on riff
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { DRY, fxSpec, type Source } from '../../shared/fx-kit.ts';
import { toneStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 2.5 });

  return stage.run(
    fxSpec(stage, {
      source: 'riff',
      stages: ['Chebyshev'],
      caption: 'Chebyshev: order 2 doubles the octave',
      create: (src: Source) => {
        const fx = new Tone.Chebyshev(2).toDestination();
        src.out.connect(fx);
        return fx;
      },
      variants: [
        DRY,
        { label: 'order 2', detail: 'order 2: even, adds the octave', apply: (fx) => { fx.order = 2; } },
        { label: 'order 5', detail: 'order 5: odd, hollow and edgy', apply: (fx) => { fx.order = 5; } },
        { label: 'order 50', detail: 'order 50: harsh and buzzy', apply: (fx) => { fx.order = 50; } },
      ],
      controls: (fx, bar) => {
        slider(bar, 'order', 1, 100, 1, 2, (v) => { fx.order = v; });
        select(bar, 'oversample', ['none', '2x', '4x'] as const, (v) => { fx.oversample = v; });
        slider(bar, 'wet', 0, 1, 0.01, fx.wet.value, (v) => { fx.wet.value = v; });
      },
    }),
  );
};

export default mount;
