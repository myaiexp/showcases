// brushX policy: a zero-width commit from a blank click is widened to a three-week window
import { defineChart, lineY, mountChart } from '@tanstack/charts';
import { brushX, type BrushRange, type BrushXChange } from '@tanstack/charts/interaction/brush';
import { controlledSignal } from '@tanstack/charts/interaction/signal';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { weekPoints } from '../../shared/interact-data.ts';
import { createStage } from '../../shared/stage.ts';

const weeks = weekPoints.map((p) => p.n);
const windowSize = 2;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click once on the plot: the brush becomes a three-week window from that week.' });
  if (stage.preview) stage.height -= 22; // leaves room for the caption lines under the chart
  let range: BrushRange<number> = { start: 2, end: 4 };

  const options = () => ({
    definition: defineChart({
      marks: [lineY(weekPoints, { x: 'n', y: 'value', key: 'id', points: true })],
      scales: { x: { scale: scaleLinear().domain([1, 8]), axis: { label: 'Week' } }, y: { scale: scaleLinear, nice: true, grid: true } },
      controls: [
        brushX({
          range: controlledSignal<BrushRange<number>, BrushXChange<number>>(range, (next, { reason }) => {
            if (reason.type !== 'commit') return;
            // A blank click arrives with start === end: expand it, keeping inside the data.
            if (next.start === next.end) {
              const start = Math.min(next.start, weeks[weeks.length - 1]! - windowSize);
              set({ start, end: start + windowSize });
            } else set(next);
          }),
          handleSize: stage.preview ? 10 : 24,
          values: weeks,
          format: (w) => `Week ${w}`,
          ariaLabel: 'Window',
        }),
      ],
    }),
    height: stage.height,
    initialWidth: 640,
    ariaLabel: 'Weekly users with a window brush',
  });
  const host = stage.own(mountChart(stage.box, options()));
  function set(next: BrushRange<number>): void {
    range = next;
    host.update(options());
    stage.say(`window: weeks ${next.start} to ${next.end}`);
  }
  set(range);
  if (stage.preview) stage.cycle([{ start: 1, end: 3 }, { start: 3, end: 5 }, { start: 5, end: 7 }, { start: 6, end: 8 }], 1500, set);
  return () => stage.dispose();
};

export default mount;
