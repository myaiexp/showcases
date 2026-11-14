// One line per US state across ordinal age groups, normalized to a percent of the state
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { csv, thin } from '../../shared/data.ts';
import { mountStatic } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const data = await csv('us-population-state-age.csv');
  // Wide to tidy: the columns after the name are the age groups, in age order.
  const ages = Object.keys(data[0] ?? {}).slice(1);
  const stateage = (ctx.preview ? thin(data, 2) : data).flatMap((d) => ages.map((age) => ({ state: d.name, age, population: d[age] })));
  return mountStatic(el, ctx, ({ width, height, preview }) =>
    Plot.plot({
      width,
      height,
      x: preview ? { domain: ages, label: null, ticks: [] } : { domain: ages, label: 'Age range (years)', labelAnchor: 'right', labelArrow: true },
      y: { label: 'Population (%)', percent: true, grid: true },
      marks: [
        Plot.ruleY([0]),
        Plot.line(stateage, Plot.normalizeY('sum', { x: 'age', y: 'population', z: 'state', strokeWidth: 1 })),
      ],
    }),
  );
};

export default mount;
