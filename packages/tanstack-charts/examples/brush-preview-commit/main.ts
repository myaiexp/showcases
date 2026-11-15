// brushX reasons: preview (live), commit (release) and cancel (Escape), read back separately
import { defineChart, lineY, mountChart } from '@tanstack/charts';
import { brushX, type BrushRange, type BrushXChange } from '@tanstack/charts/interaction/brush';
import { controlledSignal } from '@tanstack/charts/interaction/signal';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { keys } from '../../shared/interact-drive.ts';
import { weekPoints } from '../../shared/interact-data.ts';
import { reader } from '../../shared/interact-read.ts';
import { createStage } from '../../shared/stage.ts';

const weeks = weekPoints.map((p) => p.n);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag the band and watch the two lines; press Escape mid-drag to cancel.' });
  if (stage.preview) stage.height -= 52; // leaves room for the caption lines under the chart
  const show = reader(stage);
  let range: BrushRange<number> = { start: 3, end: 6 };
  let live = 'none';
  let last = 'none yet';
  const paint = (): void => show(`live preview: ${live}\ncommitted: ${range.start} to ${range.end}\nlast reason: ${last}`);

  const options = () => ({
    definition: defineChart({
      marks: [lineY(weekPoints, { x: 'n', y: 'value', key: 'id', points: true })],
      scales: { x: { scale: scaleLinear().domain([1, 8]) }, y: { scale: scaleLinear, nice: true, grid: true } },
      controls: [
        brushX({
          range: controlledSignal<BrushRange<number>, BrushXChange<number>>(range, (next, { reason }) => {
            last = `${reason.type} (${reason.source}, ${reason.target})`;
            if (reason.type === 'preview') live = `${next.start} to ${next.end}`;
            else {
              live = 'none';
              if (reason.type === 'commit') {
                range = next;
                host.update(options());
              }
            }
            paint();
          }),
          handleSize: stage.preview ? 10 : 24,
          values: weeks,
          format: (w) => `Week ${w}`,
        }),
      ],
    }),
    height: stage.height,
    initialWidth: 640,
    ariaLabel: 'Weekly users with a brush',
  });
  const host = stage.own(mountChart(stage.box, options()));
  paint();
  if (stage.preview) keys(stage, () => stage.box.querySelector('[data-chart-brush-handle="end"]'), ['ArrowRight', 'ArrowRight', 'ArrowLeft', 'ArrowLeft'], 1000);
  return () => stage.dispose();
};

export default mount;
