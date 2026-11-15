// facetChart chart(): rows and key per cell, with a rule at the cell's own mean
import { dot, facetChart, mountChart, ruleY } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { mean } from 'd3';
import type { Mount } from '@/types.ts';
import { regionRows } from '../../shared/marks2-regions.ts';
import { createStage } from '../../shared/stage.ts';

const palette: Record<string, string> = { North: '#60a5fa', South: '#fb923c', East: '#4ade80', West: '#c084fc' };

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);

  const definition = facetChart(regionRows, {
    by: 'region',
    columns: 2,
    chart: (data, { key }) => ({
      marks: [
        dot(data, { x: 'month', y: 'value', fill: palette[String(key)], r: 3.5 }),
        ruleY([mean(data, (r) => r.value) ?? 0], { stroke: palette[String(key)], strokeDasharray: '4 3' }),
      ],
      scales: { x: { scale: scaleLinear().domain([0, 11]) }, y: { scale: scaleLinear().domain([0, 120]), grid: true } },
    }),
  });
  stage.own(mountChart(stage.box, { definition, height: stage.height, ariaLabel: 'Regional values with their means' }));
  stage.say('Dashed rule: the mean of that cell only.');
  return () => stage.dispose();
};

export default mount;
