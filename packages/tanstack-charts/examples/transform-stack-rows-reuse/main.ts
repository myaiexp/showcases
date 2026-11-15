// stackRowsY endpoints shared by bars, segment labels and a line over the stack top
import { barY, defineChart, lineY, mountChart, stackRowsY, text } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { quarters } from '../../shared/xform-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);

  const rows = stackRowsY(quarters, { x: 'quarter', y: 'revenue', z: 'product' });
  const tops = rows.filter((r) => r.z === 'Team');
  const definition = defineChart({
    marks: [
      barY(rows, { x: 'x', y1: 'y1', y2: 'y2', color: 'z' }),
      text(rows, { x: 'x', y: (r) => (r.y1 + r.y2) / 2, text: (r) => String(r.revenue), fill: '#0b0b0f' }),
      lineY(tops, { x: 'x', y: 'y2', stroke: '#fbbf24', strokeWidth: 2 }),
    ],
    scales: {
      x: { scale: () => scaleBand<string>().padding(0.25) },
      y: { scale: scaleLinear, nice: true, grid: true, axis: { label: 'Revenue' } },
    },
  });
  stage.own(mountChart(stage.box, { definition, height: stage.height, ariaLabel: 'Stacked revenue with labels and a total line' }));
  stage.say('y1 and y2 from one stackRowsY call drive three marks.');
  return () => stage.dispose();
};

export default mount;
