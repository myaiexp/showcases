// cancelScheduledValues erases a ramp; cancelAndHoldAtTime stops it midway
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
      guides: [200, 500, 800],
      cases: [
        {
          label: 'untouched',
          caption: 'two ramps: 200 to 500 Hz, then 500 to 800 Hz',
          schedule: (f, t) => {
            f.linearRampToValueAtTime(500, t + 1);
            f.linearRampToValueAtTime(800, t + 2.5);
          },
        },
        {
          label: 'cancelScheduledValues',
          caption: 'cancelScheduledValues(1.5 s): the second ramp is erased, the signal stays at 500',
          schedule: (f, t) => {
            f.linearRampToValueAtTime(500, t + 1);
            f.linearRampToValueAtTime(800, t + 2.5);
            f.cancelScheduledValues(t + 1.5);
          },
        },
        {
          label: 'cancelAndHoldAtTime',
          caption: 'cancelAndHoldAtTime(1.75 s): the second ramp stops halfway and holds there',
          schedule: (f, t) => {
            f.linearRampToValueAtTime(500, t + 1);
            f.linearRampToValueAtTime(800, t + 2.5);
            f.cancelAndHoldAtTime(t + 1.75);
          },
        },
      ],
    }),
  );
};

export default mount;
