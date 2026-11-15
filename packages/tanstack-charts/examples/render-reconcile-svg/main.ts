// reconcileChartSvg: keyed morphing between two static markups, with duration and easing
import { barY, createChartScene, defineChart, renderChartSvg } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear as d3Linear } from 'd3-scale';
import { reconcileChartSvg } from '@tanstack/charts/reconcile';
import type { ChartAnimationOptions } from '@tanstack/charts';
import type { Mount } from '@/types.ts';
import { button, select, slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

type Row = { month: string; value: number };
const states: readonly (readonly Row[])[] = [
  [['Jan', 42], ['Feb', 58], ['Mar', 76], ['Apr', 64], ['May', 81]].map(([month, value]) => ({ month: month as string, value: value as number })),
  [['Mar', 40], ['Apr', 95], ['May', 30], ['Jun', 88], ['Jul', 66], ['Aug', 52]].map(([month, value]) => ({ month: month as string, value: value as number })),
];

const markup = (rows: readonly Row[]): string =>
  renderChartSvg(
    createChartScene(
      defineChart({
        marks: [barY(rows, { x: 'month', y: 'value', key: 'month', fill: '#60a5fa' })],
        // A fixed domain keeps the axis steady, so only bars and band positions move.
        scales: { x: { scale: () => scaleBand<string>().padding(0.2) }, y: { scale: d3Linear().domain([0, 100]), grid: true } },
      }),
      { width: 640, height: 300 },
    ),
    { ariaLabel: 'Bars between two states' },
  );

const easings: readonly (readonly [NonNullable<ChartAnimationOptions['easing']>, string])[] = [
  ['ease-out', 'ease-out'],
  ['linear', 'linear'],
  ['ease-in-out', 'ease-in-out'],
  [(t) => 1 - Math.cos((t * Math.PI) / 2), 'function: sine in'],
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Press next state: bars keep their keys, new ones fade in, old ones fade out.' });
  const anim: ChartAnimationOptions = { duration: 700, easing: 'ease-out' };
  let step = 0;
  let cancel: (() => void) | null = null;
  stage.box.innerHTML = markup(states[0]!);
  stage.onDispose(() => cancel?.());

  const go = (): void => {
    cancel?.();
    step = (step + 1) % states.length;
    cancel = reconcileChartSvg(stage.box, markup(states[step]!), anim);
  };
  if (stage.bar) {
    button(stage.bar, 'next state', go);
    slider(stage.bar, 'duration', 0, 1600, 100, 700, (v) => { anim.duration = v; }, (v) => `${v} ms`);
    select(stage.bar, 'easing', easings, (e) => { anim.easing = e; });
  } else stage.every(1800, go);
  return () => stage.dispose();
};

export default mount;
