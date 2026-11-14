// Hexbin at the frame edge: scale inset or dot clip keep hexagons in
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { csv, thin } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const MODES = ['none', 'inset: 10', 'clip: true'] as const;
type Mode = (typeof MODES)[number];

const mount: Mount = async (el, ctx) => {
  const all = await csv('athletes.csv');
  const olympians = ctx.preview ? thin(all, 3) : all;
  return mountPlot<{ mode: Mode }>(el, ctx, {
    initial: { mode: 'inset: 10' },
    render: ({ mode }, { width, height }) =>
      Plot.dot(olympians, Plot.hexbin({ fill: 'count' }, { x: 'weight', y: 'height', clip: mode === 'clip: true' })).plot({
        width,
        height,
        inset: mode === 'inset: 10' ? 10 : 0,
        color: { scheme: 'YlGnBu' },
      }),
    step: ({ mode }) => ({ mode: MODES[(MODES.indexOf(mode) + 1) % MODES.length] ?? 'none' }),
    controls: (bar, live) => {
      select(bar, 'keep hexagons in the frame', MODES, live.state.mode, (mode) => live.set({ mode }));
    },
  });
};

export default mount;
