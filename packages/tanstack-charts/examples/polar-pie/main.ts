// pie then radialArc: the pie transform allocates angles, radialArc draws one arc per slice
import { defineChart, mountChart } from '@tanstack/charts';
import { pie, polar, radialArc } from '@tanstack/charts/polar';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { budget } from '../../shared/marks2-budget.ts';
import { createStage } from '../../shared/stage.ts';

// pie() does no drawing: it returns rows with startAngle, endAngle, fraction and the source row.
const slices = pie(budget, { value: 'amount' });

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover a slice: the tooltip shows its value and share.' });

  const definition = defineChart({
    marks: [
      polar({
        marks: [radialArc(slices, { key: 'name', color: 'name', stroke: '#0b0b0f', strokeWidth: 1 })],
        scales: { angle: null, radius: null },
      }),
    ],
    scales: { x: null, y: null },
    tooltip: {
      use: tooltip,
      format: (point) => `${point.datum.name}: ${point.datum.value} (${(point.datum.fraction * 100).toFixed(1)}%)`,
    },
  });

  stage.own(mountChart(stage.box, { definition, height: stage.height, ariaLabel: 'Pie chart of a household budget' }));
  if (stage.preview) stage.ghost((t) => [0.5 + 0.3 * Math.cos(t * 6.28), 0.5 + 0.3 * Math.sin(t * 6.28)]);
  return () => stage.dispose();
};

export default mount;
