// Hexbin text output: a text mark labels each hexagon centre with its count
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { csv, thin } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const all = await csv('athletes.csv');
  const olympians = ctx.preview ? thin(all, 3) : all;
  return mountPlot<{ hexes: boolean }>(el, ctx, {
    initial: { hexes: false },
    render: ({ hexes }, { width, height }) =>
      Plot.plot({
        width,
        height,
        marks: [
          hexes ? Plot.dot(olympians, Plot.hexbin({ fill: 'count' }, { x: 'weight', y: 'height' })) : null,
          Plot.text(olympians, Plot.hexbin({ text: 'count' }, { x: 'weight', y: 'height', fill: hexes ? 'white' : 'currentColor' })),
        ],
        color: { scheme: 'YlGnBu' },
      }),
    step: ({ hexes }) => ({ hexes: !hexes }),
    controls: (bar, live) => {
      toggle(bar, 'also draw hexagons', live.state.hexes, (hexes) => live.set({ hexes }));
    },
  });
};

export default mount;
