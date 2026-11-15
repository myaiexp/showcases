// defineChart({ motion }): one policy for every mark and guide, read only by motion()
import { barY, defineChart } from '@tanstack/charts';
import { motion } from '@tanstack/charts/motion';
import { mountChartRenderer } from '@tanstack/charts/renderer';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { barStep } from '../../shared/style-data.ts';
import { createStage } from '../../shared/stage.ts';

const policies = [
  [{ type: 'tween', duration: 1200, easing: 'ease-in-out' }, 'chart motion: 1200 ms tween'],
  [{ type: 'spring', stiffness: 300, damping: 12 }, 'chart motion: springy'],
] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The y domain is inferred, so the axis ticks move together with the bars.' });
  let step = 0;
  let policy = 0;
  const options = () => ({
    definition: defineChart({
      motion: { transition: policies[policy]![0] },
      marks: [barY(barStep(step).map((r) => ({ ...r, value: r.value * (1 + (step % 2))})), { x: 'label', y: 'value', key: 'id', fill: '#34d399' })],
      scales: { x: { scale: () => scaleBand<string>().padding(0.2) }, y: { scale: scaleLinear, nice: true, grid: true } },
    }),
    renderer: motion(),
    height: stage.height,
    ariaLabel: 'Six values that change',
  });
  const host = stage.own(mountChartRenderer(stage.box, options()));
  const run = (): void => {
    step++;
    host.update(options());
  };
  if (stage.bar) {
    select(stage.bar, 'chart policy', policies.map(([, l], i) => [i, l] as const), (i) => { policy = i; run(); });
    stage.every(2400, run);
  } else stage.cycle(policies, 2600, ([, label], i) => { policy = i; run(); stage.say(label); });
  return () => stage.dispose();
};

export default mount;
