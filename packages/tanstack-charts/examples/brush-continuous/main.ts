// brushX without values: keyboard false, a continuous numeric range, plus sliders as the accessible control
import { defineChart, lineY, mountChart } from '@tanstack/charts';
import { brushX, type BrushRange, type BrushXChange } from '@tanstack/charts/interaction/brush';
import { controlledSignal } from '@tanstack/charts/interaction/signal';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { signal } from '../../shared/interact-data.ts';
import { createStage } from '../../shared/stage.ts';

const rows = signal(40, 4);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag on the plot to brush any range, not only whole steps.' });
  if (stage.preview) stage.height -= 22; // leaves room for the caption lines under the chart
  let range: BrushRange<number> = { start: 8, end: 22 };

  const options = () => ({
    definition: defineChart({
      marks: [lineY(rows, { x: 't', y: 'value', key: 'id' })],
      scales: { x: { scale: scaleLinear().domain([0, 39]), axis: { label: 't' } }, y: { scale: scaleLinear().domain([20, 80]), grid: true } },
      controls: [
        brushX({
          range: controlledSignal<BrushRange<number>, BrushXChange<number>>(range, (next, { reason }) => {
            if (reason.type === 'commit') set(next);
          }),
          handleSize: stage.preview ? 10 : 24,
          keyboard: false,
          ariaLabel: 'Time range',
        }),
      ],
    }),
    height: stage.height,
    initialWidth: 640,
    ariaLabel: 'A signal with a continuous brush',
  });
  const host = stage.own(mountChart(stage.box, options()));
  const inputs: HTMLInputElement[] = [];
  function set(next: BrushRange<number>): void {
    range = next;
    host.update(options());
    stage.say(`range: ${next.start.toFixed(1)} to ${next.end.toFixed(1)}`);
    if (inputs[0]) {
      inputs[0].value = String(next.start);
      inputs[1]!.value = String(next.end);
    }
  }
  if (stage.bar) {
    inputs.push(slider(stage.bar, 'start', 0, 39, 0.5, range.start, (v) => set({ start: Math.min(v, range.end), end: range.end }), (v) => v.toFixed(1)));
    inputs.push(slider(stage.bar, 'end', 0, 39, 0.5, range.end, (v) => set({ start: range.start, end: Math.max(v, range.start) }), (v) => v.toFixed(1)));
  }
  set(range);
  if (stage.preview) stage.cycle([{ start: 4, end: 14 }, { start: 10, end: 28 }, { start: 22, end: 36 }, { start: 8, end: 22 }], 1500, set);
  return () => stage.dispose();
};

export default mount;
