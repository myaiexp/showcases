// Hexbin with axis marks drawn after the dots, on top of the hexagons
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { csv, thin } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const all = await csv('athletes.csv');
  const olympians = ctx.preview ? thin(all, 3) : all;
  return mountPlot<{ onTop: boolean }>(el, ctx, {
    initial: { onTop: true },
    render: ({ onTop }, { width, height }) =>
      Plot.plot({
        width,
        height,
        color: { scheme: 'YlGnBu' },
        marks: [Plot.dot(olympians, Plot.hexbin({ fill: 'count' }, { x: 'weight', y: 'height' })), onTop ? Plot.axisX() : null, onTop ? Plot.axisY() : null],
      }),
    step: ({ onTop }) => ({ onTop: !onTop }),
    controls: (bar, live) => {
      toggle(bar, 'axis marks on top', live.state.onTop, (onTop) => live.set({ onTop }));
    },
  });
};

export default mount;
