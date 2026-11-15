// clip: true cuts marks at the plot rectangle; without it a line leaves the fixed y range
import { defineChart, dot, lineY, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { rng, walk } from '../../shared/random.ts';
import { createStage } from '../../shared/stage.ts';

const rows = walk(rng(19), 40, 50, 9).map((value, i) => ({ id: `p${i}`, i, value }));

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The y range is fixed to 30..70, so part of the data lies outside the plot.' });
  let clip = true;

  const build = () =>
    defineChart({
      marks: [lineY(rows, { x: 'i', y: 'value', stroke: '#60a5fa', strokeWidth: 2 }), dot(rows, { x: 'i', y: 'value', r: 3, fill: '#facc15' })],
      scales: {
        x: { scale: scaleLinear, grid: true },
        y: { scale: scaleLinear().domain([30, 70]), grid: true },
      },
      clip,
      margin: { top: 24, bottom: 24 },
    });

  const options = () => ({ definition: build(), height: stage.height, ariaLabel: 'Walk with a fixed range' });
  const host = stage.own(mountChart(stage.box, options()));
  const set = (v: boolean): void => {
    clip = v;
    host.update(options());
    stage.say(v ? 'clip: true' : 'clip omitted');
  };
  if (stage.bar) checkbox(stage.bar, 'clip: true', true, set);
  else stage.cycle([true, false], 2200, set);
  return () => stage.dispose();
};

export default mount;
