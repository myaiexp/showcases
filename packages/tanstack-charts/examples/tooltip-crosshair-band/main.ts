// Two crosshair marks around barY: a band underlay and a dashed y rule overlay
import { barY, crosshair, defineChart, mountChart } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { traffic } from '../../shared/interact-data.ts';
import { createStage } from '../../shared/stage.ts';

const rows = traffic.filter((r) => r.date.getUTCMonth() < 6);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover a column: the band sits behind it and the dashed rule marks the stack top.' });

  const definition = defineChart({
    marks: [
      crosshair({ x: { band: { inset: 0, radius: 3, fill: '#94a3b8', fillOpacity: 0.18 }, label: true }, y: false }),
      barY(rows, { x: 'month', y: 'value', color: 'series', inset: 4 }),
      crosshair({ x: false, y: { strokeDasharray: '4 4', label: true } }),
    ],
    scales: {
      x: { scale: () => scaleBand<string>().padding(0.2) },
      y: { scale: scaleLinear, nice: true, grid: true, axis: { label: 'Requests (thousands)' } },
    },
    focus: 'group-x',
    tooltip,
  });

  stage.own(mountChart(stage.box, { definition, height: stage.height, initialWidth: 640, ariaLabel: 'Stacked requests by month' }));
  if (stage.preview) stage.ghost();
  return () => stage.dispose();
};

export default mount;
