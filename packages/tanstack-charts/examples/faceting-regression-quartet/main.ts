// A facet per point set, each with dots and its own least-squares line on shared domains
import { dot, facetChart, linearRegressionY, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { makeQuartet } from '../../shared/xform-data.ts';
import { createStage } from '../../shared/stage.ts';

const quartet = makeQuartet();

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);

  const definition = facetChart(quartet, {
    by: 'set',
    columns: 2,
    chart: (data) => ({
      marks: [dot(data, { x: 'x', y: 'y', fill: '#60a5fa', r: 3.5 }), linearRegressionY(data, { x: 'x', y: 'y', stroke: '#f59e0b' })],
      scales: { x: { scale: scaleLinear().domain([2, 20]) }, y: { scale: scaleLinear().domain([2, 14]), grid: true } },
    }),
  });
  stage.own(mountChart(stage.box, { definition, height: stage.height, ariaLabel: 'Four point sets with fitted lines' }));
  stage.say('Same axes in every cell; the fits look alike, the points do not.');
  return () => stage.dispose();
};

export default mount;
