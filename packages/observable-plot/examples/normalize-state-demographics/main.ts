// Normalize transform with sum: age groups as shares of state population
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { mountPlot } from '../../shared/plot.ts';
import { stateAge } from '../../shared/normalize-stocks.ts';

const mount: Mount = async (el, ctx) => {
  const { rows, ages } = await stateAge();
  // Shared options: normalizeX sums population within each state (z), then divides.
  const xy = Plot.normalizeX('sum', { z: 'state', x: 'population', y: 'state' });
  const data = ctx.preview ? rows.filter((d) => d.state < 'F') : rows;
  return mountPlot<{ spread: boolean }>(el, ctx, {
    initial: { spread: true },
    render: ({ spread }, { width, height, preview }) =>
      Plot.plot({
        width,
        height: preview ? height : 660,
        axis: null,
        grid: true,
        x: { axis: 'top', label: 'Population (%)', percent: true },
        color: { scheme: 'spectral', domain: ages, legend: !preview },
        marks: [
          Plot.ruleX([0]),
          spread ? Plot.ruleY(data, Plot.groupY({ x1: 'min', x2: 'max' }, { ...xy, sort: { y: 'x1' } })) : null,
          Plot.dot(data, { ...xy, fill: 'age', title: 'age' }),
          Plot.text(data, Plot.selectMinX({ ...xy, textAnchor: 'end', dx: -6, text: 'state' })),
        ],
      }),
    step: ({ spread }) => ({ spread: !spread }),
    controls: (bar, live) => {
      toggle(bar, 'range rule per state', live.state.spread, (spread) => live.set({ spread }));
    },
  });
};

export default mount;
