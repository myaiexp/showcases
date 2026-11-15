// controller.setState({ anchor: 'value', ... }) from a slider; the chart resolves the point itself
import { crosshair, defineChart, lineY, mountChart } from '@tanstack/charts';
import { createChartCursor, cursorHost } from '@tanstack/charts/cursor';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scaleUtc } from '@tanstack/charts/scales/time';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { traffic } from '../../shared/interact-data.ts';
import { createStage } from '../../shared/stage.ts';

const rows = traffic.filter((r) => r.series === 'Mobile');

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag the slider: the chart shows that month without any pointer input.' });
  if (stage.preview) stage.height -= 22; // leaves room for the caption lines under the chart

  const cursorState = createChartCursor<Date, number>();
  const definition = defineChart({
    marks: [lineY(rows, { x: 'date', y: 'value', key: 'id', points: true }), crosshair({ x: { label: true }, y: false })],
    scales: { x: { scale: scaleUtc }, y: { scale: scaleLinear, nice: true, grid: true } },
    focus: 'nearest-x',
    maxFocusDistance: Number.POSITIVE_INFINITY,
    tooltip,
    cursor: { use: cursorHost, controller: cursorState, mode: 'focus', match: 'x' },
  });
  stage.own(mountChart(stage.box, { definition, height: stage.height, initialWidth: 640, ariaLabel: 'Mobile requests by month' }));

  const show = (i: number): void => {
    cursorState.setState({ anchor: 'value', value: { x: rows[i]!.date }, source: 'programmatic', pinned: true });
    stage.say(`setState({ anchor: 'value', value: { x: ${rows[i]!.date.toISOString().slice(0, 10)} } })`);
  };
  if (stage.bar) slider(stage.bar, 'month', 0, rows.length - 1, 1, 4, show, (v) => rows[v]!.month);
  if (stage.preview) stage.cycle(rows.map((_, i) => i), 900, (i) => show(i));
  else show(4);
  return () => stage.dispose();
};

export default mount;
