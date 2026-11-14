// The zero option on y: auto adds a rule at zero and includes it in the domain
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const industries = await csv('bls-industry-unemployment.csv');
  return mountPlot(el, ctx, {
    initial: { zero: true },
    render: ({ zero }, { width, height }) =>
      Plot.auto(industries, { x: 'date', y: { value: 'unemployed', zero }, color: 'industry' }).plot({ width, height }),
    step: ({ zero }) => ({ zero: !zero }),
    previewMs: 2800,
    controls: (bar, live) => toggle(bar, 'y: {zero}', live.state.zero, (zero) => live.set({ zero })),
  });
};

export default mount;
