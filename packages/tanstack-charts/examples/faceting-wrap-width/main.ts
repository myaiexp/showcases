// facetChart with minWidth: the column count follows the container width
import { facetChart, lineY, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { regionRows } from '../../shared/marks2-regions.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);

  const definition = facetChart(regionRows, {
    by: 'region',
    minWidth: 180,
    gap: 12,
    chart: (data) => ({
      marks: [lineY(data, { x: 'month', y: 'value', stroke: '#4ade80', strokeWidth: 2 })],
      scales: { x: { scale: scaleLinear().domain([0, 11]) }, y: { scale: scaleLinear().domain([0, 120]), grid: true } },
    }),
  });
  stage.own(mountChart(stage.box, { definition, height: stage.height, ariaLabel: 'Regional values, wrapping facets' }));

  const resize = (pct: number): void => {
    stage.box.style.width = `${pct}%`;
    stage.say(`container at ${pct}% width, minWidth 180`);
  };
  resize(100);
  if (stage.bar) slider(stage.bar, 'width', 30, 100, 5, 100, resize, (v) => `${v}%`);
  else stage.cycle([100, 55, 100, 40], 2200, resize);
  stage.onDispose(() => stage.box.style.removeProperty('width'));
  return () => stage.dispose();
};

export default mount;
