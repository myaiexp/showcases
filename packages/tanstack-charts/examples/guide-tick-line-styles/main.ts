// axis.line, axis.ticks.line and grid take separate ChartGuideLineStyle objects
import { barY, defineChart, mountChart } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { revenue } from '../../shared/style-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hide the stubs: the baseline and grid are unchanged.' });
  const build = (stubs: boolean) =>
    defineChart({
      marks: [barY(revenue, { x: 'month', y: 'revenue', fill: '#334155' })],
      scales: {
        x: {
          scale: () => scaleBand<string>().padding(0.25),
          axis: { line: { stroke: '#38bdf8', strokeWidth: 2 }, ticks: { size: 9, line: stubs ? { stroke: '#fb923c', strokeWidth: 3, lineCap: 'round' } : false } },
        },
        y: {
          scale: scaleLinear,
          nice: true,
          grid: { stroke: '#94a3b8', strokeOpacity: 0.5, strokeDasharray: '3 5' },
          axis: { line: { stroke: '#38bdf8', strokeWidth: 2 }, ticks: { line: stubs ? { stroke: '#fb923c', strokeWidth: 3 } : false } },
        },
      },
    });
  const options = (stubs: boolean) => ({ definition: build(stubs), height: stage.height, ariaLabel: 'Monthly revenue' });
  const host = stage.own(mountChart(stage.box, options(true)));
  if (stage.bar) checkbox(stage.bar, 'tick stubs', true, (v) => host.update(options(v)));
  else stage.cycle([true, false], 2000, (v) => host.update(options(v)));
  return () => stage.dispose();
};

export default mount;
