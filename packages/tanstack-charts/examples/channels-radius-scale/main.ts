// Dot radius: a constant, an accessor read as pixels, or a field through an explicit sqrt rScale
import { defineChart, dot, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scaleSqrt } from 'd3-scale';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { clusters } from '../../shared/concepts-data.ts';
import { createStage } from '../../shared/stage.ts';

const rows = clusters(4, 18);
type Mode = 'constant' | 'pixels' | 'scaled';
const modes: readonly (readonly [Mode, string])[] = [
  ['constant', 'r: 5 (pixels)'],
  ['pixels', 'r: size / 450 (accessor, pixels)'],
  ['scaled', "r: 'size' with rScale scaleSqrt().range([3, 16])"],
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);

  const build = (mode: Mode) =>
    defineChart({
      marks: [
        mode === 'constant'
          ? dot(rows, { x: 'x', y: 'y', r: 5, fill: '#60a5fa', fillOpacity: 0.7 })
          : mode === 'pixels'
            ? dot(rows, { x: 'x', y: 'y', r: (row) => row.size / 450, fill: '#60a5fa', fillOpacity: 0.7 })
            : dot(rows, { x: 'x', y: 'y', r: 'size', rScale: { scale: () => scaleSqrt().range([3, 16]) }, fill: '#60a5fa', fillOpacity: 0.7 }),
      ],
      scales: {
        x: { scale: scaleLinear, nice: true, grid: true },
        y: { scale: scaleLinear, nice: true, grid: true },
      },
      tooltip,
    });

  const options = (mode: Mode) => ({ definition: build(mode), height: stage.height, ariaLabel: 'Bubble scatter' });
  const host = stage.own(mountChart(stage.box, options('scaled')));
  const show = (mode: Mode, label: string): void => {
    host.update(options(mode));
    stage.say(label);
  };
  if (stage.bar) select(stage.bar, 'radius', modes, (m) => show(m, ''), 'scaled');
  else stage.cycle(modes, 1800, ([m, label]) => show(m, label));
  return () => stage.dispose();
};

export default mount;
