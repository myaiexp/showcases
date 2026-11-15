// zoomX plus application policy: the y domain follows the rows inside the window
import { defineChart, lineY, mountChart } from '@tanstack/charts';
import { zoomX, type ZoomXChange, type ZoomXWindow } from '@tanstack/charts/interaction/zoom';
import { controlledSignal } from '@tanstack/charts/interaction/signal';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { keys } from '../../shared/interact-drive.ts';
import { signal } from '../../shared/interact-data.ts';
import { createStage } from '../../shared/stage.ts';

const rows = signal(120, 6);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Zoom in and watch the y axis rescale to the visible rows.' });
  if (stage.preview) stage.height -= 22; // leaves room for the caption lines under the chart
  let win: ZoomXWindow<number> = { start: 10, end: 50 };
  let fit = true;

  const options = () => {
    const visible = rows.filter((r) => r.t >= win.start && r.t <= win.end);
    const lo = Math.floor(Math.min(...visible.map((r) => r.value)) - 3);
    const hi = Math.ceil(Math.max(...visible.map((r) => r.value)) + 3);
    return {
      definition: defineChart({
        clip: true,
        marks: [lineY(rows, { x: 't', y: 'value', key: 'id' })],
        scales: { x: { scale: scaleLinear().domain([win.start, win.end]) }, y: { scale: scaleLinear().domain(fit ? [lo, hi] : [0, 100]), grid: true } },
        controls: [
          zoomX({
            window: controlledSignal<ZoomXWindow<number>, ZoomXChange<number>>(win, (next) => set(next)),
            extent: [0, 119],
            scaleExtent: [1, 8],
            ariaLabel: 'Zoomable signal',
          }),
        ],
      }),
      height: stage.height,
      initialWidth: 640,
      ariaLabel: 'A zoomable signal with a fitted y axis',
    };
  };
  const host = stage.own(mountChart(stage.box, options()));
  function set(next: ZoomXWindow<number>): void {
    win = next;
    host.update(options());
    stage.say(`window ${next.start.toFixed(0)} to ${next.end.toFixed(0)}, y ${fit ? 'fitted to the window' : 'fixed 0 to 100'}`);
  }
  set(win);

  if (stage.bar) checkbox(stage.bar, 'fit y to window', true, (v) => { fit = v; set(win); });
  else keys(stage, () => stage.box.querySelector('[data-chart-zoom-surface]'), ['+', '+', '+', 'ArrowRight', 'ArrowRight', 'ArrowRight', '-', '-', '-', 'ArrowLeft', 'ArrowLeft', 'ArrowLeft'], 800);
  return () => stage.dispose();
};

export default mount;
