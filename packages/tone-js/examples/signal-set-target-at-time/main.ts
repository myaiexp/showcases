// setTargetAtTime: the pitch eases toward a target and slows as it arrives
import type { Mount } from '@/types.ts';
import { automation, type AutoCase } from '../../shared/signal-auto.ts';
import { toneStage } from '../../shared/stage.ts';

const SECONDS = 3;

const target = (constant: number): AutoCase => ({
  label: `constant ${constant}`,
  caption: `setTargetAtTime(800, 0.3, ${constant}): a bigger time constant approaches the target more slowly`,
  schedule: (f, t) => void f.setTargetAtTime(800, t + 0.3, constant),
});

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: SECONDS });
  return stage.run(automation(stage, { seconds: SECONDS, yMin: 100, yMax: 900, guides: [200, 800], cases: [target(0.1), target(0.4), target(1)] }));
};

export default mount;
