// Rect: countries as rects stacked along x by poverty rate, area = people
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { csv } from '../../shared/data.ts';
import { mountStatic } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const povcalnet = await csv('povcalnet.csv');
  return mountStatic(el, ctx, ({ width, height, preview }) =>
    Plot.plot({
      width,
      height,
      x: { label: 'Population (millions)' },
      y: { percent: true, label: preview ? null : 'Proportion living on less than $30 per day (%)' },
      marks: [
        Plot.rectY(
          povcalnet,
          Plot.stackX({
            filter: (d) => ['N', 'A'].includes(d.CoverageType),
            x: 'ReqYearPopulation',
            order: 'HeadCount',
            reverse: true,
            y2: 'HeadCount', // y2 to avoid stacking by y
            title: (d) => `${d.CountryName}\n${(d.HeadCount * 100).toFixed(1)}%`,
            insetLeft: 0.2,
            insetRight: 0.2,
          }),
        ),
        Plot.ruleY([0]),
      ],
    }),
  );
};

export default mount;
