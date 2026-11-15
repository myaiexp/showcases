// One cursor controller, two charts: the focused date is shared and each chart resolves its own point
import { crosshair, defineChart, lineY, mountChart } from '@tanstack/charts';
import { createChartCursor, cursorHost } from '@tanstack/charts/cursor';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scaleUtc } from '@tanstack/charts/scales/time';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { traffic } from '../../shared/interact-data.ts';
import { createStage } from '../../shared/stage.ts';

const throughput = traffic.filter((r) => r.series === 'Web');
const errors = throughput.map((r, i) => ({ id: `e${i}`, date: r.date, rate: Math.round((1.4 + 0.9 * Math.sin(i / 1.7) + i * 0.05) * 100) / 100 }));

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover either chart: the other follows by date.' });

  const sharedDate = createChartCursor<Date, number>();
  const cursor = { use: cursorHost, controller: sharedDate, mode: 'focus' as const, match: 'x' as const, pin: true };

  const requests = defineChart({
    marks: [lineY(throughput, { x: 'date', y: 'value', key: 'id', points: true }), crosshair({ x: { label: true }, y: false })],
    scales: { x: { scale: scaleUtc }, y: { scale: scaleLinear, nice: true, grid: true, axis: { label: 'Requests (k)' } } },
    focus: 'nearest-x',
    maxFocusDistance: Number.POSITIVE_INFINITY,
    tooltip,
    cursor,
  });
  const failures = defineChart({
    marks: [lineY(errors, { x: 'date', y: 'rate', key: 'id', points: true, stroke: '#f87171' }), crosshair({ x: { label: true }, y: false })],
    scales: { x: { scale: scaleUtc }, y: { scale: scaleLinear, nice: true, grid: true, axis: { label: 'Error rate (%)' } } },
    focus: 'nearest-x',
    maxFocusDistance: Number.POSITIVE_INFINITY,
    tooltip,
    cursor,
  });

  stage.own(mountChart(stage.box, { definition: requests, height: stage.height, initialWidth: 420, ariaLabel: 'Requests by month' }));
  stage.own(mountChart(stage.addBox(), { definition: failures, height: stage.height, initialWidth: 420, ariaLabel: 'Error rate by month' }));
  if (stage.preview) stage.ghost();
  return () => stage.dispose();
};

export default mount;
