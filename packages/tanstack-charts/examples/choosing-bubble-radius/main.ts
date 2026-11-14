// Bubble size should follow area: a linear radius overstates large values, a sqrt radius scale does not
import { defineChart, dot, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleSqrt } from 'd3-scale';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const rows = [1, 2, 4, 8].map((v) => ({ id: `v${v}`, label: `${v}x`, v, one: 1 }));
type Mode = 'linear' | 'sqrt';
const modes: readonly (readonly [Mode, string])[] = [['linear', 'radius proportional to value (area grows with the square)'], ['sqrt', 'scaleSqrt radius (area proportional to value)']];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The bubble for 8x should cover eight times the area of the one for 1x.' });
  const build = (mode: Mode) =>
    defineChart({
      marks: [
        dot(rows, {
          x: 'label',
          y: 'one',
          r: 'v',
          rScale: { scale: mode === 'linear' ? () => scaleLinear().range([0, 12 * 8]) : () => scaleSqrt().range([0, 12 * Math.sqrt(8)]) },
          fillOpacity: 0.7,
        }),
      ],
      scales: {
        x: { scale: () => scaleBand<string>().padding(0.2) },
        y: { scale: scaleLinear().domain([0, 2]), axis: false },
      },
    });
  const options = (mode: Mode) => ({ definition: build(mode), height: stage.height, ariaLabel: 'Bubbles of 1x to 8x' });
  const host = stage.own(mountChart(stage.box, options('sqrt')));
  const show = (mode: Mode, label: string): void => {
    host.update(options(mode));
    stage.say(label);
  };
  if (stage.bar) select(stage.bar, 'radius', modes, (m) => show(m, ''), 'sqrt');
  else stage.cycle(modes, 2200, ([m, l]) => show(m, l));
  return () => stage.dispose();
};

export default mount;
