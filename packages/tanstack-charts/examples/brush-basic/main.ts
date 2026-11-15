// brushX over weeks 1-8: a controlled range committed by drag or keyboard, with a reset button
import { defineChart, lineY, mountChart } from '@tanstack/charts';
import { brushX, type BrushRange, type BrushXChange } from '@tanstack/charts/interaction/brush';
import { controlledSignal } from '@tanstack/charts/interaction/signal';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { keys } from '../../shared/interact-drive.ts';
import { weekPoints } from '../../shared/interact-data.ts';
import { createStage } from '../../shared/stage.ts';

const weeks = weekPoints.map((p) => p.n);
const initial: BrushRange<number> = { start: 2, end: 5 };

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag the band or an edge. The keyboard works on the two handles.' });
  if (stage.preview) stage.height -= 22; // leaves room for the caption lines under the chart
  let range = initial;

  const options = () => ({
    definition: defineChart({
      marks: [lineY(weekPoints, { x: 'n', y: 'value', key: 'id', points: true, strokeWidth: 2.5 })],
      scales: { x: { scale: scaleLinear().domain([1, 8]), axis: { label: 'Week' } }, y: { scale: scaleLinear, nice: true, grid: true } },
      controls: [
        brushX({
          range: controlledSignal<BrushRange<number>, BrushXChange<number>>(range, (next, { reason }) => {
            if (reason.type === 'commit') set(next);
          }),
          handleSize: stage.preview ? 10 : 24,
          values: weeks,
          format: (week) => `Week ${week}`,
          ariaLabel: 'Reporting range',
          startAriaLabel: 'Range start',
          endAriaLabel: 'Range end',
        }),
      ],
    }),
    height: stage.height,
    initialWidth: 640,
    ariaLabel: 'Weekly users with a selectable range',
  });
  const host = stage.own(mountChart(stage.box, options()));
  function set(next: BrushRange<number>): void {
    range = next;
    host.update(options());
    stage.say(`range: weeks ${next.start} to ${next.end}`);
  }
  set(initial);

  if (stage.bar) button(stage.bar, 'Reset range', () => set(initial));
  else keys(stage, () => stage.box.querySelector('[data-chart-brush-handle="end"]'), ['ArrowRight', 'ArrowRight', 'ArrowRight', 'ArrowLeft', 'ArrowLeft', 'ArrowLeft'], 900);
  return () => stage.dispose();
};

export default mount;
