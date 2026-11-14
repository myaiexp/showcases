// boxX, a composite of rule, bar, tick and dot marks, over penguin measures
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const MEASURES = ['body_mass_g', 'flipper_length_mm', 'culmen_length_mm', 'culmen_depth_mm'] as const;
type Measure = (typeof MEASURES)[number];

const mount: Mount = async (el, ctx) => {
  const penguins = await csv('penguins.csv');
  return mountPlot<{ x: Measure }>(el, ctx, {
    initial: { x: 'body_mass_g' },
    render: ({ x }, { width, height }) =>
      Plot.boxX(penguins, { x, y: 'species' }).plot({ width, height, marginLeft: 60, y: { label: null } }),
    step: ({ x }) => ({ x: MEASURES[(MEASURES.indexOf(x) + 1) % MEASURES.length] }),
    controls: (bar, live) => {
      select(bar, 'x', MEASURES, live.state.x, (x) => live.set({ x }));
    },
  });
};

export default mount;
