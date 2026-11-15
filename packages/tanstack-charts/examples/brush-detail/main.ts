// Linked views: a brush on a small overview sets the x domain of a detail chart
import { defineChart, lineY, mountChart } from '@tanstack/charts';
import { brushX, type BrushRange, type BrushXChange } from '@tanstack/charts/interaction/brush';
import { controlledSignal } from '@tanstack/charts/interaction/signal';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { keys } from '../../shared/interact-drive.ts';
import { signal } from '../../shared/interact-data.ts';
import { createStage } from '../../shared/stage.ts';

const rows = signal(60, 8);
const values = rows.map((r) => r.t);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Brush the overview: the detail chart zooms to the same range.' });
  if (stage.preview) stage.height -= 22; // leaves room for the caption lines under the chart
  let range: BrushRange<number> = { start: 12, end: 30 };

  const overview = () => ({
    definition: defineChart({
      marks: [lineY(rows, { x: 't', y: 'value', key: 'id', strokeWidth: 1.5 })],
      scales: { x: { scale: scaleLinear().domain([0, 59]) }, y: { scale: scaleLinear().domain([20, 80]) } },
      controls: [
        brushX({
          range: controlledSignal<BrushRange<number>, BrushXChange<number>>(range, (next, { reason }) => {
            if (reason.type === 'commit' && next.end > next.start) set(next);
          }),
          handleSize: stage.preview ? 10 : 24,
          values,
          format: (t) => `t ${t}`,
          ariaLabel: 'Detail range',
        }),
      ],
    }),
    height: stage.height,
    initialWidth: 420,
    ariaLabel: 'Overview of the whole signal',
  });
  const detail = () => ({
    definition: defineChart({
      marks: [lineY(rows.filter((r) => r.t >= range.start && r.t <= range.end), { x: 't', y: 'value', key: 'id', points: true })],
      scales: { x: { scale: scaleLinear().domain([range.start, range.end]) }, y: { scale: scaleLinear().domain([20, 80]), grid: true } },
      tooltip,
    }),
    height: stage.height,
    initialWidth: 420,
    ariaLabel: 'Detail of the brushed range',
  });

  const overviewHost = stage.own(mountChart(stage.box, overview()));
  let detailHost: { update: (options: ReturnType<typeof detail>) => void } | null = null;
  if (!stage.preview) detailHost = stage.own(mountChart(stage.addBox(), detail()));
  function set(next: BrushRange<number>): void {
    range = next;
    overviewHost.update(overview());
    detailHost?.update(detail());
    stage.say(`detail range: t ${next.start} to ${next.end}`);
  }
  set(range);
  if (stage.preview) keys(stage, () => stage.box.querySelector('[data-chart-brush-handle="end"]'), ['ArrowRight', 'ArrowRight', 'ArrowRight', 'ArrowRight', 'ArrowLeft', 'ArrowLeft', 'ArrowLeft', 'ArrowLeft'], 500);
  return () => stage.dispose();
};

export default mount;
