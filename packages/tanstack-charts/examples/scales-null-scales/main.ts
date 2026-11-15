// A null scale entry means "no such dimension": thresholds need only y, a bare frame needs neither
import { defineChart, frame, mountChart, ruleY } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Left: scales: { x: null, y }. Right: scales: { x: null, y: null }.' });
  const right = stage.addBox();

  const thresholds = defineChart({
    marks: [ruleY([25, 50, 75], { stroke: '#fb923c' })],
    scales: { x: null, y: { scale: scaleLinear().domain([0, 100]), grid: true, axis: { label: 'Thresholds' } } },
  });
  const border = defineChart({
    marks: [frame()],
    scales: { x: null, y: null },
  });

  stage.own(mountChart(stage.box, { definition: thresholds, height: stage.height, ariaLabel: 'Horizontal thresholds' }));
  stage.own(mountChart(right, { definition: border, height: stage.height, ariaLabel: 'A bare frame' }));
  return () => stage.dispose();
};

export default mount;
