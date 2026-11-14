// One-dimensional dots: letter frequency as dot area, along x or y
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const AXES = ['x', 'y'] as const;

const mount: Mount = async (el, ctx) => {
  const alphabet = await csv('alphabet.csv');
  return mountPlot<{ axis: (typeof AXES)[number] }>(el, ctx, {
    initial: { axis: 'x' },
    render: ({ axis }, { width, height }) =>
      Plot.plot({
        width,
        height,
        marks: [Plot.dot(alphabet, axis === 'x' ? { x: 'letter', r: 'frequency' } : { y: 'letter', r: 'frequency' })],
      }),
    step: ({ axis }) => ({ axis: axis === 'x' ? 'y' : 'x' }),
    controls: (bar, live) => select(bar, 'ordinal axis', AXES, live.state.axis, (axis) => live.set({ axis })),
  });
};

export default mount;
