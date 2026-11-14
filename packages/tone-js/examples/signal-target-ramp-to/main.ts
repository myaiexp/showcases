// targetRampTo: a ramp that eases into the value, versus rampTo
import type { Mount } from '@/types.ts';
import { automation } from '../../shared/signal-auto.ts';
import { toneStage } from '../../shared/stage.ts';

const SECONDS = 3;

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: SECONDS });
  return stage.run(
    automation(stage, {
      seconds: SECONDS,
      yMin: 100,
      yMax: 900,
      guides: [200, 800],
      start: 800,
      cases: [
        {
          label: 'rampTo',
          caption: 'rampTo(200, 1.5): arrives exactly on time, then stops dead',
          schedule: (f, t) => void f.rampTo(200, 1.5, t),
        },
        {
          label: 'targetRampTo',
          caption: 'targetRampTo(200, 1.5): drops fast, then settles in, like a spring',
          schedule: (f, t) => void f.targetRampTo(200, 1.5, t),
        },
      ],
    }),
  );
};

export default mount;
