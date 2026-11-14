// Grid line density: the ticks and tickSpacing options of gridX
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountPlot } from '../../shared/plot.ts';

const MODES = ['default', 'ticks: 4', 'ticks: 25', 'tickSpacing: 30', 'tickSpacing: 120', 'interval: 5'] as const;
type Mode = (typeof MODES)[number];

function options(mode: Mode): Plot.GridXOptions {
  const [name, value = ''] = mode.split(': ');
  if (name === 'ticks') return { ticks: Number(value) };
  if (name === 'tickSpacing') return { tickSpacing: Number(value) };
  if (name === 'interval') return { interval: Number(value) };
  return {};
}

const mount: Mount = (el, ctx) =>
  mountPlot<{ mode: Mode }>(el, ctx, {
    initial: { mode: 'default' },
    render: ({ mode }, { width, height }) =>
      Plot.gridX(options(mode)).plot({ width, height, x: { type: 'linear', domain: [0, 100] } }),
    step: ({ mode }) => ({ mode: MODES[(MODES.indexOf(mode) + 1) % MODES.length] }),
    previewMs: 1800,
    controls: (bar, live) => select(bar, 'option', MODES, live.state.mode, (mode) => live.set({ mode })),
  });

export default mount;
