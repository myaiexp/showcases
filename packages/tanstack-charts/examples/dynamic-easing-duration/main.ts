// svgAnimation duration and named easing curves, replayed on the same data change
import { barY, defineChart, mountChart } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { barStep } from '../../shared/style-data.ts';
import { createStage } from '../../shared/stage.ts';

type Easing = 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out';
const easings: readonly Easing[] = ['linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pick an easing and a duration, then the bars alternate between two data sets.' });
  let easing: Easing = 'ease-in-out';
  let duration = 900;
  let flip = 0;
  const build = () =>
    defineChart({
      svgAnimation: { duration, easing },
      marks: [barY(barStep(flip % 2), { x: 'label', y: 'value', key: 'id', fill: '#f472b6' })],
      scales: { x: { scale: () => scaleBand<string>().padding(0.2) }, y: { scale: scaleLinear().domain([0, 110]), grid: true } },
    });
  const options = () => ({ definition: build(), height: stage.height, ariaLabel: 'Six values that alternate' });
  const host = stage.own(mountChart(stage.box, options()));
  const replay = (): void => {
    flip++;
    host.update(options());
  };
  if (stage.bar) {
    select(stage.bar, 'easing', easings.map((e) => [e, e] as const), (v) => { easing = v; replay(); }, easing);
    slider(stage.bar, 'duration', 100, 2500, 100, duration, (v) => { duration = v; }, (v) => `${v} ms`);
    stage.every(2800, replay);
  } else {
    stage.cycle(easings, 1700, (e) => { easing = e; replay(); stage.say(`easing: ${e}`); });
  }
  return () => stage.dispose();
};

export default mount;
