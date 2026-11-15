// facetChart: the one-call wrapper that returns a complete definition of small multiples
import { facetChart, lineY, dot, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { regionRows } from '../../shared/marks2-regions.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);

  // facetChart wraps facet() in a definition with margin 0; no defineChart call is needed.
  const definition = facetChart(regionRows, {
    by: 'region',
    minWidth: 160,
    chart: (rows, { key }) => ({
      marks: [lineY(rows, { x: 'month', y: 'value', stroke: key === 'West' ? '#fbbf24' : '#60a5fa' }), dot(rows, { x: 'month', y: 'value', r: 2 })],
      scales: {
        x: { scale: scaleLinear().domain([0, 11]) },
        y: { scale: scaleLinear().domain([0, 120]), grid: true },
      },
    }),
  });

  stage.own(mountChart(stage.box, { definition, height: stage.height, ariaLabel: 'Small multiples by region' }));
  stage.say('minWidth 160 sets how many columns fit; the chart callback also receives the group key.');
  return () => stage.dispose();
};

export default mount;
