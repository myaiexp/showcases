// continuousCursor driven by sliders: the controlled position is the single source of truth
import { defineChart, lineY, mountChart } from '@tanstack/charts';
import { continuousCursor, type ContinuousCursorChange, type ContinuousCursorPosition } from '@tanstack/charts/interaction/cursor';
import { controlledSignal } from '@tanstack/charts/interaction/signal';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { signal } from '../../shared/interact-data.ts';
import { createStage } from '../../shared/stage.ts';

type Position = ContinuousCursorPosition<number, number>;
type Change = ContinuousCursorChange<number, number>;
const rows = signal(40, 2);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Use the sliders, or click the plot to place the cursor yourself.' });
  if (stage.preview) stage.height -= 22; // leaves room for the caption lines under the chart
  let position: Position = { x: 12, y: 55 };

  const options = () => ({
    definition: defineChart({
      marks: [lineY(rows, { x: 't', y: 'value', key: 'id' })],
      scales: { x: { scale: scaleLinear().domain([0, 39]), axis: { label: 't' } }, y: { scale: scaleLinear().domain([20, 80]), grid: true } },
      controls: [
        continuousCursor({
          position: controlledSignal<Position | null, Change>(position, (next, { reason }) => {
            if (reason.type === 'preview') return;
            if (next) set(next);
          }),
          xLabel: { background: '#334155', color: '#f8fafc', format: (v) => v.toFixed(1) },
          yLabel: { background: '#334155', color: '#f8fafc', format: (v) => v.toFixed(1) },
        }),
      ],
    }),
    height: stage.height,
    initialWidth: 640,
    ariaLabel: 'A signal with a cursor set from sliders',
  });
  const host = stage.own(mountChart(stage.box, options()));
  const sliders: HTMLInputElement[] = [];
  function set(next: Position): void {
    position = next;
    host.update(options());
    stage.say(`position: x ${next.x.toFixed(1)}, y ${next.y.toFixed(1)}`);
    if (sliders[0]) {
      sliders[0].value = String(next.x);
      sliders[1]!.value = String(next.y);
    }
  }
  if (stage.bar) {
    sliders.push(slider(stage.bar, 'x', 0, 39, 0.5, position.x, (x) => set({ ...position, x }), (v) => v.toFixed(1)));
    sliders.push(slider(stage.bar, 'y', 20, 80, 0.5, position.y, (y) => set({ ...position, y }), (v) => v.toFixed(1)));
  }
  set(position);
  if (stage.preview) stage.cycle([{ x: 6, y: 60 }, { x: 18, y: 40 }, { x: 30, y: 65 }, { x: 36, y: 30 }], 1200, set);
  return () => stage.dispose();
};

export default mount;
