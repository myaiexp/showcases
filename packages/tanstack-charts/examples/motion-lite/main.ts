// motionLite: a whole-chart fade on entrance and a plain keyed tween on updates
import { barY, defineChart } from '@tanstack/charts';
import { motionLite } from '@tanstack/charts/motion/lite';
import { mountChartRenderer } from '@tanstack/charts/renderer';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { barStep } from '../../shared/style-data.ts';
import { createStage } from '../../shared/stage.ts';

type Easing = 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out';
const easings: readonly Easing[] = ['linear', 'ease-in', 'ease-out', 'ease-in-out'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Duration and easing are the only timing options of motionLite.' });
  let step = 0;
  let duration = 700;
  let easing: Easing = 'ease-out';
  const options = () => ({
    definition: defineChart({
      marks: [barY(barStep(step), { x: 'label', y: 'value', key: 'id', fill: '#4ade80' })],
      scales: { x: { scale: () => scaleBand<string>().padding(0.2) }, y: { scale: scaleLinear().domain([0, 110]), grid: true } },
    }),
    renderer: motionLite({ duration, easing }),
    height: stage.height,
    ariaLabel: 'Six values that change',
  });
  const host = stage.own(mountChartRenderer(stage.box, options()));
  const run = (): void => {
    step++;
    host.update(options());
  };
  stage.every(stage.preview ? 1800 : 2600, run);
  if (stage.bar) {
    slider(stage.bar, 'duration', 0, 2000, 50, duration, (v) => { duration = v; }, (v) => `${v} ms`);
    select(stage.bar, 'easing', easings.map((e) => [e, e] as const), (v) => { easing = v; }, easing);
  } else stage.say('motionLite({ duration: 700, easing: "ease-out" })');
  return () => stage.dispose();
};

export default mount;
