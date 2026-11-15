// Palette tokens: --ts-chart-1..6 on the container recolour the default series paint
import { barY, defineChart, mountChart } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { downloads } from '../../shared/style-data.ts';
import { createStage } from '../../shared/stage.ts';

const palettes: readonly (readonly [string, readonly string[]])[] = [
  ['brand blue and orange', ['#2563eb', '#f97316', '#10b981', '#8b5cf6', '#ec4899', '#06b6d4']],
  ['warm', ['#fbbf24', '#fb7185', '#f97316', '#facc15', '#f43f5e', '#fdba74']],
  ['greens', ['#14532d', '#16a34a', '#86efac', '#4d7c0f', '#bef264', '#065f46']],
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Switch palette: the definition stays the same, only CSS variables change.' });
  const latest = downloads.filter((d) => d.week === 'Jun 8');
  const definition = defineChart({
    marks: [barY(latest, { x: 'package', y: 'downloads', color: 'package' })],
    scales: {
      x: { scale: () => scaleBand<string>().padding(0.25) },
      y: { scale: scaleLinear, nice: true, grid: true },
    },
  });
  stage.own(mountChart(stage.box, { definition, height: stage.height, ariaLabel: 'Downloads by package, latest week' }));
  const apply = (i: number): void => {
    palettes[i]![1].forEach((c, k) => stage.box.style.setProperty(`--ts-chart-${k + 1}`, c));
    stage.say(`--ts-chart-1: ${palettes[i]![1][0]}   (${palettes[i]![0]})`);
  };
  if (stage.bar) select(stage.bar, 'palette', palettes.map((p, i) => [i, p[0]] as const), apply);
  stage.cycle(palettes, 1800, (_, i) => apply(i), stage.preview);
  return () => stage.dispose();
};

export default mount;
