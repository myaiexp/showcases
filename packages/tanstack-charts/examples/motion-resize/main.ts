// motion({ resize }): size changes snap by default and animate when resize is true
import { barY, defineChart } from '@tanstack/charts';
import { motion } from '@tanstack/charts/motion';
import { mountChartRenderer } from '@tanstack/charts/renderer';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { steps } from '../../shared/style-box.ts';
import { revenue } from '../../shared/style-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The box width alternates between 100% and 40%.' });
  let resize = true;
  const options = () => ({
    definition: defineChart({
      marks: [barY(revenue, { x: 'month', y: 'revenue', key: 'id', fill: '#f97316' })],
      scales: { x: { scale: () => scaleBand<string>().padding(0.2) }, y: { scale: scaleLinear, nice: true, grid: true } },
    }),
    renderer: motion({ resize, transition: { type: 'spring', stiffness: 150, damping: 20 } }),
    initialWidth: 640,
    height: stage.height,
    ariaLabel: 'Monthly revenue',
  });
  const host = stage.own(mountChartRenderer(stage.box, options()));
  if (stage.bar) checkbox(stage.bar, 'resize: true', true, (v) => { resize = v; host.update(options()); });
  else stage.say('motion({ resize: true })');
  steps(stage, [100, 40], 2600);
  return () => stage.dispose();
};

export default mount;
