// focus: a strategy object that always picks the highest point at the nearest x
import { defineChart, lineY, mountChart } from '@tanstack/charts';
import type { ChartPoint, ChartValue } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scaleUtc } from '@tanstack/charts/scales/time';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { traffic } from '../../shared/interact-data.ts';
import { createStage } from '../../shared/stage.ts';

type Pt<D, X extends ChartValue, Y extends ChartValue> = ChartPoint<D, X, Y>;

// Points share a column when their pixel x is equal; screen y grows downward, so the smallest y is highest.
const highestInColumn = {
  resolve<D, X extends ChartValue, Y extends ChartValue>(points: readonly Pt<D, X, Y>[], context: { x: number; maxDistance: number }): Pt<D, X, Y>[] {
    let best: Pt<D, X, Y> | undefined;
    for (const p of points) if (!best || Math.abs(p.x - context.x) < Math.abs(best.x - context.x)) best = p;
    if (!best || Math.abs(best.x - context.x) > context.maxDistance) return [];
    const column = best.x;
    return points.filter((p) => p.x === column).sort((a, b) => a.y - b.y);
  },
  group<D, X extends ChartValue, Y extends ChartValue>(points: readonly Pt<D, X, Y>[], context: { point: Pt<D, X, Y> }): Pt<D, X, Y>[] {
    return points.filter((p) => p.x === context.point.x).sort((a, b) => a.y - b.y);
  },
  navigation<D, X extends ChartValue, Y extends ChartValue>(points: readonly Pt<D, X, Y>[]): Pt<D, X, Y>[] {
    const tops = new Map<number, Pt<D, X, Y>>();
    for (const p of points) {
      const top = tops.get(p.x);
      if (!top || p.y < top.y) tops.set(p.x, p);
    }
    return [...tops.values()].sort((a, b) => a.x - b.x);
  },
};

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover anywhere in a month: the highest line is always the primary point.' });

  const definition = defineChart({
    marks: [lineY(traffic, { x: 'date', y: 'value', color: 'series', key: 'id', points: true })],
    scales: {
      x: { scale: scaleUtc },
      y: { scale: scaleLinear, nice: true, grid: true },
    },
    focus: highestInColumn,
    maxFocusDistance: Number.POSITIVE_INFINITY,
    tooltip,
  });

  stage.own(mountChart(stage.box, { definition, height: stage.height, initialWidth: 640, ariaLabel: 'Requests by channel' }));
  if (stage.preview) stage.ghost((t) => [0.1 + 0.8 * t, 0.9]);
  return () => stage.dispose();
};

export default mount;
