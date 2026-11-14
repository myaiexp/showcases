// setValueCurveAtTime: a list of values stretched over a duration
import type { Mount } from '@/types.ts';
import { automation, type AutoCase } from '../../shared/signal-auto.ts';
import { toneStage } from '../../shared/stage.ts';

const SECONDS = 3;

const curve = (label: string, values: number[]): AutoCase => ({
  label,
  caption: `[${values.join(', ')}] spread evenly over 2.5 seconds`,
  schedule: (f, t) => void f.setValueCurveAtTime(values, t, 2.5),
});

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: SECONDS });
  return stage.run(
    automation(stage, {
      seconds: SECONDS,
      yMin: 100,
      yMax: 900,
      guides: [200, 400, 800],
      cases: [
        curve('hill', [200, 400, 650, 800, 650, 400, 200]),
        curve('zigzag', [200, 800, 250, 750, 300, 700, 350]),
        curve('wobble', [400, 600, 300, 700, 250, 800, 400]),
      ],
    }),
  );
};

export default mount;
