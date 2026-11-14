// plot.scale("projection") hands a rendered projection to a second plot
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { topojson, worldTopology } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const TYPES = ['mercator', 'equal-earth', 'orthographic', 'stereographic'] as const;

const mount: Mount = async (el, ctx) => {
  const world = await worldTopology();
  const land = topojson.feature(world, world.objects.land);
  return mountPlot<{ type: (typeof TYPES)[number] }>(el, ctx, {
    initial: { type: 'mercator' },
    render: ({ type }, { width, height }) => {
      const w = Math.floor(width / 2) - 4;
      const plot1 = Plot.plot({ width: w, height, projection: type, marks: [Plot.graticule()] });
      // The materialized projection is reused as plot2's projection option.
      const projection = plot1.scale('projection');
      const plot2 = Plot.plot({ width: w, height, projection: projection as Plot.ProjectionOptions, marks: [Plot.geo(land)] });
      const row = document.createElement('div');
      row.style.cssText = 'display:flex;gap:8px;justify-content:center';
      row.append(plot1, plot2);
      return row;
    },
    step: ({ type }) => ({ type: TYPES[(TYPES.indexOf(type) + 1) % TYPES.length] }),
    previewMs: 1800,
    controls: (bar, live) => {
      select(bar, 'plot 1 projection', TYPES, live.state.type, (type) => live.set({ type }));
    },
  });
};

export default mount;
