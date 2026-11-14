// Ramps: linearRampTo adds equal Hz, exponentialRampTo equal octaves
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
      guides: [200, 400, 800],
      cases: [
        {
          label: 'linear',
          caption: 'linearRampTo(800, 2.5): the same number of Hz every moment, so the pitch rises fast then seems to stall',
          schedule: (f, t) => void f.linearRampTo(800, 2.5, t),
        },
        {
          label: 'exponential',
          caption: 'exponentialRampTo(800, 2.5): the same ratio every moment, so the pitch climbs evenly to the ear',
          schedule: (f, t) => void f.exponentialRampTo(800, 2.5, t),
        },
      ],
    }),
  );
};

export default mount;
