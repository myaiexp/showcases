// color.nice: round the inferred extent of a continuous color scale
import { colorLegend, defineChart, dot, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scaleSequential } from 'd3-scale';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { rng } from '../../shared/random.ts';
import { createStage } from '../../shared/stage.ts';

const random = rng(77);
const rows = Array.from({ length: 50 }, (_, i) => ({ id: `p${i}`, x: random() * 10, y: random() * 10, level: 3.7 + random() * 92.5 }));
const ramp = (t: number): string => `hsl(${Math.round(160 - 120 * t)} 75% ${Math.round(70 - 30 * t)}%)`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The legend end labels show the extent the scale used.' });
  const build = (nice: boolean) =>
    defineChart({
      marks: [dot(rows, { x: 'x', y: 'y', color: 'level', r: 6 })],
      scales: { x: { scale: scaleLinear, nice: true, grid: true }, y: { scale: scaleLinear, nice: true, grid: true } },
      color: { scale: () => scaleSequential(ramp), nice, legend: colorLegend({ label: 'Level', placement: 'bottom', width: 260, format: (v) => String(Math.round(v * 10) / 10) }) },
    });
  const options = (nice: boolean) => ({ definition: build(nice), height: stage.height, ariaLabel: 'Scatter colored by level' });
  const host = stage.own(mountChart(stage.box, options(true)));
  const apply = (v: boolean): void => {
    host.update(options(v));
    stage.say(`color.nice: ${v}`);
  };
  if (stage.bar) checkbox(stage.bar, 'color.nice', true, apply);
  else stage.cycle([false, true], 2200, apply);
  return () => stage.dispose();
};

export default mount;
