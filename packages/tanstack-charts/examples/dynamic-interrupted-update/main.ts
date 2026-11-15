// Retargeting mid-transition: each update starts from the geometry on screen, not from the previous data
import { barY, defineChart, mountChart } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { barStep } from '../../shared/style-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The tween lasts 1800 ms but new data arrives sooner: change the interval.' });
  let step = 0;
  const build = () =>
    defineChart({
      svgAnimation: { duration: 1800, easing: 'ease-in-out' },
      marks: [barY(barStep(step), { x: 'label', y: 'value', key: 'id', fill: '#a78bfa' })],
      scales: { x: { scale: () => scaleBand<string>().padding(0.2) }, y: { scale: () => scaleLinear().domain([0, 110]), grid: true } },
    });
  const options = () => ({ definition: build(), height: stage.height, ariaLabel: 'Six values updated faster than the tween' });
  const host = stage.own(mountChart(stage.box, options()));
  const next = (): void => {
    step++;
    host.update(options());
  };
  const interval = stage.preview ? 400 : 700;
  let timer: ReturnType<typeof setInterval> | undefined;
  const run = (ms: number): void => {
    if (timer) clearInterval(timer);
    timer = setInterval(() => { if (!stage.disposed) next(); }, ms);
  };
  stage.onDispose(() => { if (timer) clearInterval(timer); });
  run(interval);
  if (stage.bar) slider(stage.bar, 'update every', 200, 2400, 100, interval, run, (v) => `${v} ms`);
  else stage.say('new data every 400 ms, tween 1800 ms');
  return () => stage.dispose();
};

export default mount;
