// Tick: a barcode of age-bracket shares per state with tickX and normalizeX
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const wide = await csv('us-population-state-age.csv');
  const ages = Object.keys(wide[0] ?? {}).slice(1);
  // Wide to tidy: one row per state and age bracket.
  const stateage = ages.flatMap((age) => wide.map((d) => ({ state: d.name, age, population: d[age] })));
  return mountPlot<{ reverse: boolean }>(el, ctx, {
    initial: { reverse: true },
    render: ({ reverse }, { width, height, preview }) =>
      Plot.plot({
        width,
        height,
        x: { grid: true, label: 'Population (%)', percent: true },
        y: { domain: ages, reverse, label: 'Age (years)', labelAnchor: preview ? undefined : 'top' },
        marks: [Plot.ruleX([0]), Plot.tickX(stateage, Plot.normalizeX('sum', { z: 'state', x: 'population', y: 'age' }))],
      }),
    step: ({ reverse }) => ({ reverse: !reverse }),
    controls: (bar, live) => {
      toggle(bar, 'youngest at top (y reverse)', live.state.reverse, (reverse) => live.set({ reverse }));
    },
  });
};

export default mount;
