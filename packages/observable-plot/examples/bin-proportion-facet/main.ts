// Weight distributions per sport as proportion-facet heat strips, sorted by median
import * as Plot from '@observablehq/plot';
import * as d3 from 'd3';
import type { Mount } from '@/types.ts';
import { csv, thin } from '../../shared/data.ts';
import { mountStatic } from '../../shared/plot.ts';

const CARD_SPORTS = ['gymnastics', 'aquatics', 'athletics', 'judo', 'rugby sevens', 'basketball'];

const mount: Mount = async (el, ctx) => {
  const all = await csv('athletes.csv');
  // Cards keep six sports and every third athlete; the full view plots every sport.
  const olympians = ctx.preview ? thin(all.filter((d) => CARD_SPORTS.includes(d.sport)), 2) : all;
  return mountStatic(el, ctx, ({ width, height }) =>
    Plot.plot({
      width,
      height,
      marginLeft: 100,
      padding: 0,
      x: { grid: true },
      fy: { domain: d3.groupSort(olympians.filter((d) => d.weight), (g) => d3.median(g, (d) => d.weight), (d) => d.sport) },
      color: { scheme: 'turbo' },
      marks: [Plot.rect(olympians, Plot.binX<Plot.RectOptions>({ fill: 'proportion-facet' }, { x: 'weight', fy: 'sport', inset: 0.5 }))],
    }),
  );
};

export default mount;
