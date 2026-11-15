// lineX: numeric x values connected along a depth axis on y
import { defineChart, lineX, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const profile = (season: string, surface: number, drop: number) =>
  Array.from({ length: 11 }, (_, i) => ({
    season,
    depth: i * 20,
    temperature: Math.round((surface - drop * (1 - Math.exp(-i / 3))) * 10) / 10,
  }));
const rows = [...profile('Summer', 21, 15), ...profile('Winter', 7, 2)];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover a profile to read its temperature and depth.' });

  const definition = defineChart({
    marks: [lineX(rows, { x: 'temperature', y: 'depth', z: 'season', points: true })],
    scales: {
      x: { scale: scaleLinear, nice: true, grid: true, axis: { label: 'Temperature (°C)' } },
      y: { scale: scaleLinear, reverse: true, axis: { label: 'Depth (m)' } },
    },
    tooltip,
  });

  stage.own(mountChart(stage.box, { definition, height: stage.height, initialWidth: 640, ariaLabel: 'Temperature by depth in two seasons' }));
  if (stage.preview) stage.ghost((t) => [0.3 + 0.4 * t, 0.15 + 0.7 * t]);
  return () => stage.dispose();
};

export default mount;
