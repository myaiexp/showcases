// Tooltip styling through --ts-chart-tooltip-* variables set on the chart container
import { barY, defineChart, mountChart } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { revenue } from '../../shared/style-data.ts';
import { createStage } from '../../shared/stage.ts';

const looks: readonly (readonly [string, Record<string, string>])[] = [
  ['defaults of this gallery', {}],
  ['light card', { background: '#fffbeb', color: '#422006', border: '1px solid #fbbf24', 'border-radius': '0.75rem', shadow: '0 10px 30px rgb(251 191 36 / 0.35)' }],
  ['sharp and dark', { background: '#000', color: '#bbf7d0', border: '2px solid #22c55e', 'border-radius': '0', shadow: 'none' }],
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover a bar and switch the tooltip look.' });
  const definition = defineChart({
    marks: [barY(revenue, { x: 'month', y: 'revenue', fill: '#60a5fa' })],
    scales: { x: { scale: () => scaleBand<string>().padding(0.2) }, y: { scale: scaleLinear, nice: true, grid: true } },
    tooltip,
  });
  stage.own(mountChart(stage.box, { definition, height: stage.height, ariaLabel: 'Monthly revenue' }));
  const names = ['background', 'color', 'border', 'border-radius', 'shadow'];
  const apply = (i: number): void => {
    for (const n of names) {
      const v = looks[i]![1][n];
      if (v) stage.box.style.setProperty(`--ts-chart-tooltip-${n}`, v);
      else stage.box.style.removeProperty(`--ts-chart-tooltip-${n}`);
    }
    stage.say(looks[i]![0]);
  };
  if (stage.bar) select(stage.bar, 'tooltip', looks.map((l, i) => [i, l[0]] as const), apply);
  stage.cycle(looks, 2400, (_, i) => apply(i), stage.preview);
  stage.ghost(undefined, 4800);
  return () => stage.dispose();
};

export default mount;
