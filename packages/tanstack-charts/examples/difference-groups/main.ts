// differenceY with z: one comparison pair per first-seen group
import { defineChart, mountChart } from '@tanstack/charts';
import { differenceY } from '@tanstack/charts/difference';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const rows = ['Harbor', 'Hilltop'].flatMap((store, s) =>
  Array.from({ length: 18 }, (_, week) => {
    const plan = s === 0 ? 70 + week : 30 + week * 0.5;
    return { store, week, plan, sales: Math.round(plan + (s === 0 ? 9 : 6) * Math.sin(week / 2 + s * 2)) };
  }),
);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover a line: each store has its own plan and sales lines.' });

  const definition = defineChart({
    marks: [differenceY(rows, { x: 'week', y1: 'plan', y2: 'sales', z: 'store', fillOpacity: 0.3 })],
    scales: {
      x: { scale: scaleLinear, axis: { label: 'Week' } },
      y: { scale: scaleLinear, nice: true, grid: true, axis: { label: 'Sales' } },
    },
    tooltip,
  });

  stage.own(mountChart(stage.box, { definition, height: stage.height, initialWidth: 640, ariaLabel: 'Sales against plan for two stores' }));
  if (stage.preview) stage.ghost();
  return () => stage.dispose();
};

export default mount;
