// theme: explicit scene colours in the definition, swapped with host.update
import { areaY, defineChart, lineY, mountChart } from '@tanstack/charts';
import type { ChartTheme } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scalePoint } from '@tanstack/charts/scales/point';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { downloads } from '../../shared/style-data.ts';
import { createStage } from '../../shared/stage.ts';

const themes: readonly (readonly [string, Partial<ChartTheme>])[] = [
  ['night slate', { foreground: '#e5e7eb', muted: '#94a3b8', grid: '#334155', background: '#0f172a', palette: ['#38bdf8', '#fb7185', '#4ade80'] }],
  ['paper', { foreground: '#1f2937', muted: '#6b7280', grid: '#e5e7eb', background: '#fffdf7', palette: ['#b45309', '#1d4ed8', '#047857'] }],
  ['terminal', { foreground: '#86efac', muted: '#4ade80', grid: '#14532d', background: '#031a0c', palette: ['#86efac', '#fde047', '#67e8f9'] }],
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pick a theme: the chart background is drawn by the chart itself.' });
  const build = (theme: Partial<ChartTheme>) =>
    defineChart({
      theme,
      marks: [
        areaY(downloads, { x: 'week', y: 'downloads', z: 'package', fillOpacity: 0.12 }),
        lineY(downloads, { x: 'week', y: 'downloads', z: 'package', strokeWidth: 2.5 }),
      ],
      scales: {
        x: { scale: () => scalePoint<string>().padding(0.2) },
        y: { scale: scaleLinear, grid: true, axis: { label: 'Downloads' } },
      },
    });
  const options = (theme: Partial<ChartTheme>) => ({ definition: build(theme), height: stage.height, ariaLabel: 'Weekly downloads for three packages' });
  const host = stage.own(mountChart(stage.box, options(themes[0]![1])));
  const apply = (i: number): void => {
    host.update(options(themes[i]![1]));
    stage.say(`theme: ${themes[i]![0]}`);
  };
  if (stage.bar) select(stage.bar, 'theme', themes.map((t, i) => [i, t[0]] as const), apply);
  else stage.cycle(themes, 2000, (_, i) => apply(i));
  return () => stage.dispose();
};

export default mount;
