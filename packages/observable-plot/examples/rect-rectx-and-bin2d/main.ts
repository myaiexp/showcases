// Rect: rect with bin on x and y, versus rectX with binY (horizontal histogram)
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { csv, thin } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const MODES = ['rect + bin', 'rectX + binY'] as const;
type Mode = (typeof MODES)[number];

const mount: Mount = async (el, ctx) => {
  const all = await csv('athletes.csv');
  const olympians = ctx.preview ? thin(all, 3) : all;
  return mountPlot<{ mode: Mode }>(el, ctx, {
    initial: { mode: MODES[0] },
    render: ({ mode }, { width, height }) =>
      Plot.plot({
        width,
        height,
        marks:
          mode === MODES[0]
            ? [Plot.rect(olympians, Plot.bin({ fill: 'count' }, { x: 'weight', y: 'height' }))]
            : // rectX stacks along x, so each bin of weight grows from x = 0.
              [Plot.rectX(olympians, Plot.binY<Plot.RectXOptions>({ x: 'count' }, { y: 'weight' })), Plot.ruleX([0])],
      }),
    step: (_s, i) => ({ mode: MODES[i % 2] ?? MODES[0] }),
    controls: (bar, live) => {
      select(bar, 'constructor', MODES, live.state.mode, (mode) => live.set({ mode }));
    },
  });
};

export default mount;
