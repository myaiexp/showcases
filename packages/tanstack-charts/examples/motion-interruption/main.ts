// Rapid retargeting: the spring carries value and velocity into each new target
import { barY, defineChart } from '@tanstack/charts';
import { motion } from '@tanstack/charts/motion';
import { mountChartRenderer } from '@tanstack/charts/renderer';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { barStep } from '../../shared/style-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Speed up the updates: the bars never stop to restart.' });
  let step = 0;
  const options = () => ({
    definition: defineChart({
      motion: { transition: { type: 'spring', stiffness: 60, damping: 7, mass: 1 } },
      marks: [barY(barStep(step), { x: 'label', y: 'value', key: 'id', fill: '#818cf8' })],
      scales: { x: { scale: () => scaleBand<string>().padding(0.2) }, y: { scale: () => scaleLinear().domain([0, 110]), grid: true } },
    }),
    renderer: motion(),
    height: stage.height,
    ariaLabel: 'Six values updated faster than the spring settles',
  });
  const host = stage.own(mountChartRenderer(stage.box, options()));
  let timer: ReturnType<typeof setInterval> | undefined;
  const run = (ms: number): void => {
    if (timer) clearInterval(timer);
    timer = setInterval(() => {
      if (stage.disposed) return;
      step++;
      host.update(options());
    }, ms);
  };
  stage.onDispose(() => { if (timer) clearInterval(timer); });
  run(450);
  if (stage.bar) slider(stage.bar, 'update every', 150, 2000, 50, 450, run, (v) => `${v} ms`);
  else stage.say('new data every 450 ms');
  return () => stage.dispose();
};

export default mount;
