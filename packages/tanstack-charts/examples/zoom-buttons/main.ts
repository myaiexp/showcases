// zoomX with keyboard: false and app-owned zoom in, zoom out, pan and reset buttons
import { defineChart, lineY, mountChart } from '@tanstack/charts';
import { zoomX, type ZoomXChange, type ZoomXWindow } from '@tanstack/charts/interaction/zoom';
import { controlledSignal } from '@tanstack/charts/interaction/signal';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { signal } from '../../shared/interact-data.ts';
import { createStage } from '../../shared/stage.ts';

const rows = signal(120, 6);
const max = 119;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Use the buttons, or the wheel and drag on the plot.' });
  if (stage.preview) stage.height -= 22; // leaves room for the caption lines under the chart
  let win: ZoomXWindow<number> = { start: 30, end: 90 };

  const options = () => ({
    definition: defineChart({
      clip: true,
      marks: [lineY(rows, { x: 't', y: 'value', key: 'id' })],
      scales: { x: { scale: scaleLinear().domain([win.start, win.end]) }, y: { scale: scaleLinear().domain([0, 100]), grid: true } },
      controls: [
        zoomX({
          window: controlledSignal<ZoomXWindow<number>, ZoomXChange<number>>(win, (next) => set(next)),
          extent: [0, max],
          scaleExtent: [1, 8],
          keyboard: false,
        }),
      ],
    }),
    height: stage.height,
    initialWidth: 640,
    ariaLabel: 'A signal with app-owned zoom buttons',
  });
  const host = stage.own(mountChart(stage.box, options()));
  function set(next: ZoomXWindow<number>): void {
    win = next;
    host.update(options());
    stage.say(`window: ${next.start.toFixed(1)} to ${next.end.toFixed(1)}`);
  }
  // Scale the window around its centre, then shift it back inside the extent.
  const zoom = (factor: number): void => {
    const mid = (win.start + win.end) / 2;
    const half = Math.min(max, Math.max(max / 16, ((win.end - win.start) / 2) * factor));
    const start = Math.min(max - 2 * half, Math.max(0, mid - half));
    set({ start, end: start + 2 * half });
  };
  const pan = (by: number): void => {
    const size = win.end - win.start;
    const start = Math.min(max - size, Math.max(0, win.start + by));
    set({ start, end: start + size });
  };
  set(win);

  if (stage.bar) {
    button(stage.bar, 'Zoom in', () => zoom(0.5));
    button(stage.bar, 'Zoom out', () => zoom(2));
    button(stage.bar, 'Pan left', () => pan(-(win.end - win.start) / 4));
    button(stage.bar, 'Pan right', () => pan((win.end - win.start) / 4));
    button(stage.bar, 'Reset', () => set({ start: 0, end: max }));
  } else {
    const steps = [() => zoom(0.5), () => pan(10), () => pan(10), () => zoom(2), () => pan(-10), () => pan(-10)];
    stage.cycle(steps, 1100, (fn) => fn());
  }
  return () => stage.dispose();
};

export default mount;
