// Opting out of the reducer: reduce null draws every row on one axis
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const penguins = await csv('penguins.csv');
  return mountPlot(el, ctx, {
    initial: { barcode: true },
    render: ({ barcode }, { width, height }) =>
      barcode
        ? Plot.auto(penguins, { x: 'body_mass_g', y: { reduce: null } }).plot({ width, height })
        : Plot.auto(penguins, { x: 'body_mass_g' }).plot({ width, height }),
    step: ({ barcode }) => ({ barcode: !barcode }),
    previewMs: 2800,
    controls: (bar, live) => toggle(bar, 'y: {reduce: null}', live.state.barcode, (barcode) => live.set({ barcode })),
  });
};

export default mount;
