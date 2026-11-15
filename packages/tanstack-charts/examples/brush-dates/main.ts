// brushX with Date values: snapping to month starts on a UTC axis
import { defineChart, lineY, mountChart } from '@tanstack/charts';
import { brushX, type BrushRange, type BrushXChange } from '@tanstack/charts/interaction/brush';
import { controlledSignal } from '@tanstack/charts/interaction/signal';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scaleUtc } from '@tanstack/charts/scales/time';
import type { Mount } from '@/types.ts';
import { keys } from '../../shared/interact-drive.ts';
import { traffic } from '../../shared/interact-data.ts';
import { createStage } from '../../shared/stage.ts';

const rows = traffic.filter((r) => r.series === 'API');
const months = rows.map((r) => r.date);
const label = (d: Date): string => d.toLocaleDateString('en', { month: 'short', year: 'numeric', timeZone: 'UTC' });

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag the band; the range snaps to month starts.' });
  if (stage.preview) stage.height -= 22; // leaves room for the caption lines under the chart
  let range: BrushRange<Date> = { start: months[2]!, end: months[6]! };

  const options = () => ({
    definition: defineChart({
      marks: [lineY(rows, { x: 'date', y: 'value', key: 'id', points: true })],
      scales: { x: { scale: scaleUtc().domain([months[0]!, months[11]!]) }, y: { scale: scaleLinear, nice: true, grid: true } },
      controls: [
        brushX({
          range: controlledSignal<BrushRange<Date>, BrushXChange<Date>>(range, (next, { reason }) => {
            if (reason.type === 'commit') set(next);
          }),
          handleSize: stage.preview ? 10 : 24,
          values: months,
          format: label,
          ariaLabel: 'Month range',
        }),
      ],
    }),
    height: stage.height,
    initialWidth: 640,
    ariaLabel: 'API requests by month with a date range',
  });
  const host = stage.own(mountChart(stage.box, options()));
  function set(next: BrushRange<Date>): void {
    range = next;
    host.update(options());
    stage.say(`range: ${label(next.start)} to ${label(next.end)}`);
  }
  set(range);
  if (stage.preview) keys(stage, () => stage.box.querySelector('[data-chart-brush-handle="start"]'), ['ArrowLeft', 'ArrowLeft', 'ArrowRight', 'ArrowRight'], 1000);
  return () => stage.dispose();
};

export default mount;
