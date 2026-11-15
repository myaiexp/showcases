// viewGrid: one named view per grid cell, with links written on the view itself
import { areaY, defineChart, lineY, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { viewGrid } from '@tanstack/charts/view';
import type { Mount } from '@/types.ts';
import { makeSeries } from '../../shared/xform-data.ts';
import { createStage } from '../../shared/stage.ts';

const series = makeSeries(60).filter((r) => r.series === 'beta');

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);

  const topDefinition = defineChart({
    marks: [areaY(series, { x: 'day', y: 'value', fill: '#64748b', fillOpacity: 0.5 })],
    scales: { x: { scale: scaleLinear().domain([0, 59]), axis: false }, y: { scale: scaleLinear().domain([0, 70]), axis: false } },
    margin: { top: 4, right: 12, bottom: 0, left: 40 },
  });
  const mainDefinition = defineChart({
    marks: [lineY(series, { x: 'day', y: 'value', stroke: '#4ade80', strokeWidth: 2.5 })],
    scales: { x: { scale: scaleLinear().domain([0, 59]) }, y: { scale: scaleLinear().domain([0, 70]), grid: true } },
    margin: { top: 4, right: 12, bottom: 28, left: 40 },
  });

  const definition = viewGrid({
    rows: [{ id: 'top', size: 72 }, { id: 'main', grow: 1 }],
    columns: [{ id: 'main', grow: 1 }],
    gap: 8,
    views: [
      { id: 'top', row: 'top', column: 'main', share: { x: 'main' }, chart: topDefinition },
      { id: 'main', row: 'main', column: 'main', chart: mainDefinition },
    ],
  });
  stage.own(mountChart(stage.box, { definition, height: stage.height, ariaLabel: 'Two views from viewGrid' }));
  stage.say("viewGrid({ views: [{ share: { x: 'main' } }, ...] })");
  return () => stage.dispose();
};

export default mount;
