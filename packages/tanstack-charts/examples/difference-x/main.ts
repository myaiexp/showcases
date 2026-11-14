// differenceX: lobes between two x channels along y
import { defineChart, mountChart } from '@tanstack/charts';
import { differenceX } from '@tanstack/charts/difference';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const rows = Array.from({ length: 26 }, (_, i) => ({
  depth: i * 4,
  target: 18 - i * 0.45,
  measured: Math.round((18 - i * 0.45 + 2.6 * Math.sin(i / 2.2)) * 10) / 10,
}));

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover to compare measured and target at a depth.' });

  const definition = defineChart({
    marks: [differenceX(rows, { y: 'depth', x1: 'target', x2: 'measured', fillOpacity: 0.3 })],
    scales: {
      x: { scale: scaleLinear, nice: true, grid: true, axis: { label: 'Temperature (°C)' } },
      y: { scale: scaleLinear, reverse: true, axis: { label: 'Depth (m)' } },
    },
    tooltip,
  });

  stage.own(mountChart(stage.box, { definition, height: stage.height, initialWidth: 640, ariaLabel: 'Measured temperature against target by depth' }));
  if (stage.preview) stage.ghost((t) => [0.5, 0.1 + 0.8 * t]);
  return () => stage.dispose();
};

export default mount;
