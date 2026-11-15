// Facets with a y domain computed once from all rows, against a domain fitted per cell
import { dot, facetChart, lineY } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { extent } from 'd3';
import type { Mount } from '@/types.ts';
import { regionRows } from '../../shared/marks2-regions.ts';
import { lab } from '../../shared/xform-lab.ts';
import { createStage } from '../../shared/stage.ts';

const [lo, hi] = extent(regionRows, (r) => r.value) as [number, number];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);

  const build = (shared: boolean) =>
    facetChart(regionRows, {
      by: 'region',
      columns: 2,
      axes: shared ? 'outer' : 'cell',
      chart: (data) => {
        const [cellLo, cellHi] = extent(data, (r) => r.value) as [number, number];
        return {
          marks: [lineY(data, { x: 'month', y: 'value', stroke: '#60a5fa', strokeWidth: 2 }), dot(data, { x: 'month', y: 'value', r: 2.5 })],
          scales: {
            x: { scale: scaleLinear().domain([0, 11]) },
            y: { scale: scaleLinear().domain(shared ? [lo, hi] : [cellLo, cellHi]).nice(), grid: true },
          },
        };
      },
    });
  const states = [[true, 'shared: one domain for all cells'], [false, 'independent: a domain per cell']] as const;
  lab(stage, { label: 'domains', ariaLabel: 'Regional values with shared or independent domains', states, build, ms: 2600, after: (_, name) => stage.say(name) });
  return () => stage.dispose();
};

export default mount;
