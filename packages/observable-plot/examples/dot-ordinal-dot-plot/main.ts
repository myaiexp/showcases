// A dot plot with an ordinal y: each age group's share of a state's population
import * as d3 from 'd3';
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { csv, type Row } from '../../shared/data.ts';
import { mountStatic } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const wide = await csv('us-population-state-age.csv');
  // The docs melt the wide table to tidy rows {state, age, population}.
  const ages = Object.keys(wide[0] ?? {}).slice(1);
  const tidy: Row[] = ages.flatMap((age) => wide.map((d) => ({ state: d.name, age, population: d[age] })));
  // A card shows every fourth state so the labels have room.
  const keep = new Set(d3.range(0, wide.length, 4).map((i) => wide[i]?.name));
  const stateage = ctx.preview ? tidy.filter((d) => keep.has(d.state)) : tidy;
  const xy = Plot.normalizeX({ basis: 'sum', z: 'state', x: 'population', y: 'state' });
  return mountStatic(el, ctx, ({ width, height, preview }) =>
    Plot.plot({
      width,
      height: height ?? 660,
      axis: null,
      grid: true,
      x: { axis: 'top', label: 'Population (%)', percent: true },
      color: { scheme: 'spectral', domain: ages, legend: !preview },
      marks: [
        Plot.ruleX([0]),
        Plot.ruleY(stateage, Plot.groupY({ x1: 'min', x2: 'max' }, { ...xy, sort: { y: 'x1' } })),
        Plot.dot(stateage, { ...xy, fill: 'age', title: 'age' }),
        Plot.text(stateage, Plot.selectMinX({ ...xy, textAnchor: 'end', dx: -6, text: 'state' })),
      ],
    }),
  );
};

export default mount;
