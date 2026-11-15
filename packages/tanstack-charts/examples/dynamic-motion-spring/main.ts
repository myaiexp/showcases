// motion() as the host renderer: springs retarget keyed bars on every update
import { barY, defineChart } from '@tanstack/charts';
import { motion } from '@tanstack/charts/motion';
import { mountChartRenderer } from '@tanstack/charts/renderer';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { barStep } from '../../shared/style-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Press new data: the bars overshoot and settle.' });
  let step = 0;
  const build = () =>
    defineChart({
      marks: [barY(barStep(step), { x: 'label', y: 'value', key: 'id', fill: '#60a5fa' })],
      scales: { x: { scale: () => scaleBand<string>().padding(0.2) }, y: { scale: () => scaleLinear().domain([0, 120]), grid: true } },
    });
  const options = () => ({
    definition: build(),
    renderer: motion({ transition: { type: 'spring', stiffness: 170, damping: 14, mass: 1 } }),
    height: stage.height,
    ariaLabel: 'Six values that change',
  });
  const host = stage.own(mountChartRenderer(stage.box, options()));
  const next = (): void => {
    step++;
    host.update(options());
  };
  if (stage.bar) button(stage.bar, 'new data', next);
  else stage.every(2000, next);
  return () => stage.dispose();
};

export default mount;
