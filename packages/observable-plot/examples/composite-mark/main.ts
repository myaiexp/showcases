// A custom composite mark: arealineY = rule + area + line through Plot.marks
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { csv, type Row } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

// The docs' definition: three marks returned as one, usable like any built-in mark.
function arealineY(
  data: Row[],
  { color, fillOpacity = 0.1, ...options }: { color?: string; fillOpacity?: number } & Plot.AreaYOptions = {},
): Plot.CompoundMark {
  return Plot.marks(
    Plot.ruleY([0]),
    Plot.areaY(data, { fill: color, fillOpacity, ...options }),
    Plot.lineY(data, { stroke: color, ...options }),
  );
}

const COLORS = ['steelblue', 'orange', 'seagreen'] as const;

const mount: Mount = async (el, ctx) => {
  const aapl = await csv('aapl.csv');
  return mountPlot<{ color: string }>(el, ctx, {
    initial: { color: 'steelblue' },
    render: ({ color }, { width, height }) => arealineY(aapl, { x: 'Date', y: 'Close', color }).plot({ width, height }),
    step: ({ color }) => ({ color: COLORS[(COLORS.indexOf(color as (typeof COLORS)[number]) + 1) % COLORS.length] }),
    controls: (bar, live) => {
      select(bar, 'color', COLORS, 'steelblue', (color) => live.set({ color }));
    },
  });
};

export default mount;
