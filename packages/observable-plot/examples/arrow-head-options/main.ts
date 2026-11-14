// Arrowhead shape and inset on the metro inequality arrows
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

interface Head {
  headAngle: number;
  headLength: number;
  inset: number;
}

const mount: Mount = async (el, ctx) => {
  const metros = await csv('metros.csv');
  const heads: Head[] = [
    { headAngle: 60, headLength: 8, inset: 0 },
    { headAngle: 25, headLength: 14, inset: 0 },
    { headAngle: 120, headLength: 6, inset: 0 },
    { headAngle: 60, headLength: 8, inset: 6 },
  ];
  return mountPlot(el, ctx, {
    initial: heads[0] as Head,
    render: ({ headAngle, headLength, inset }, { width, height }) =>
      Plot.plot({
        width,
        height,
        grid: true,
        inset: 10,
        x: { type: 'log', label: 'Population' },
        y: { label: 'Inequality', ticks: 4 },
        marks: [
          // inset trims both ends of each arrow (insetStart and insetEnd set them apart).
          Plot.arrow(metros, { x1: 'POP_1980', y1: 'R90_10_1980', x2: 'POP_2015', y2: 'R90_10_2015', bend: true, headAngle, headLength, inset }),
        ],
      }),
    step: (_s, i) => heads[i % heads.length] as Head,
    previewMs: 2200,
    controls: (bar, live) => {
      slider(bar, 'headAngle', [10, 170, 5], live.state.headAngle, (headAngle) => live.set({ headAngle }));
      slider(bar, 'headLength', [0, 30, 1], live.state.headLength, (headLength) => live.set({ headLength }));
      slider(bar, 'inset', [0, 20, 1], live.state.inset, (inset) => live.set({ inset }));
    },
  });
};

export default mount;
