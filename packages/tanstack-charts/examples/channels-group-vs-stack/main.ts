// Bars stack by default; layout group() puts the series side by side inside each category
import { barY, defineChart, group, mountChart } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const quarters = ['Q1', 'Q2', 'Q3', 'Q4'];
const rows = (['Hardware', 'Services'] as const).flatMap((line, l) =>
  quarters.map((quarter, q) => ({ id: `${line}-${quarter}`, quarter, line, amount: [32, 41, 38, 52][q]! * (l === 0 ? 1 : 0.6) })),
);
type Mode = 'stack' | 'group';
const modes: readonly (readonly [Mode, string])[] = [['stack', 'default (stacked)'], ['group', 'layout: group()']];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);

  const build = (mode: Mode) =>
    defineChart({
      marks: [barY(rows, { x: 'quarter', y: 'amount', z: 'line', ...(mode === 'group' ? { layout: group() } : {}) })],
      scales: {
        x: { scale: () => scaleBand<string>().padding(0.2) },
        y: { scale: scaleLinear, nice: true, grid: true },
      },
      tooltip,
    });

  const options = (mode: Mode) => ({ definition: build(mode), height: stage.height, ariaLabel: 'Revenue by quarter and line' });
  const host = stage.own(mountChart(stage.box, options('stack')));
  const show = (mode: Mode, label: string): void => {
    host.update(options(mode));
    stage.say(label);
  };
  if (stage.bar) select(stage.bar, 'layout', modes, (m) => show(m, ''));
  else stage.cycle(modes, 1800, ([m, label]) => show(m, label));
  return () => stage.dispose();
};

export default mount;
