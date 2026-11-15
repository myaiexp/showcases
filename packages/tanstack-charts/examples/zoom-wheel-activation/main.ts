// zoomX wheelActivation: focus, modifier or always, compared with a select
import { defineChart, lineY, mountChart } from '@tanstack/charts';
import { zoomX, type ZoomXChange, type ZoomXWheelActivation, type ZoomXWindow } from '@tanstack/charts/interaction/zoom';
import { controlledSignal } from '@tanstack/charts/interaction/signal';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { signal } from '../../shared/interact-data.ts';
import { createStage } from '../../shared/stage.ts';

const rows = signal(120, 6);
const modes: readonly ZoomXWheelActivation[] = ['focus', 'modifier', 'always'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Scroll over the plot in each mode: only always takes the plain wheel.' });
  if (stage.preview) stage.height -= 22; // leaves room for the caption lines under the chart
  let win: ZoomXWindow<number> = { start: 20, end: 90 };
  let wheel: ZoomXWheelActivation = stage.preview ? 'always' : 'focus';

  const options = () => ({
    definition: defineChart({
      clip: true,
      marks: [lineY(rows, { x: 't', y: 'value', key: 'id' })],
      scales: { x: { scale: scaleLinear().domain([win.start, win.end]) }, y: { scale: scaleLinear().domain([0, 100]), grid: true } },
      controls: [
        zoomX({
          window: controlledSignal<ZoomXWindow<number>, ZoomXChange<number>>(win, (next) => set(next)),
          extent: [0, 119],
          scaleExtent: [1, 8],
          wheelActivation: wheel,
          ariaLabel: 'Zoomable signal',
        }),
      ],
    }),
    height: stage.height,
    initialWidth: 640,
    ariaLabel: 'A signal with wheel zoom',
  });
  const host = stage.own(mountChart(stage.box, options()));
  function set(next: ZoomXWindow<number>): void {
    win = next;
    host.update(options());
    stage.say(`wheelActivation: ${wheel}; window ${next.start.toFixed(0)} to ${next.end.toFixed(0)}`);
  }
  set(win);

  if (stage.bar) select(stage.bar, 'wheelActivation', modes.map((m) => [m, m] as const), (m) => { wheel = m; set(win); }, 'focus');
  else {
    // Wheel events go straight to the zoom surface, in then out, over the middle of the plot.
    let n = 0;
    stage.after(500, () => {
      stage.every(260, () => {
        const surface = stage.box.querySelector('[data-chart-zoom-surface]');
        if (!surface) return;
        const r = surface.getBoundingClientRect();
        const dir = Math.floor(n++ / 8) % 2 === 0 ? -120 : 120;
        surface.dispatchEvent(new WheelEvent('wheel', { deltaY: dir, clientX: r.left + r.width * 0.5, clientY: r.top + r.height * 0.5, cancelable: true, bubbles: false }));
      });
    });
  }
  return () => stage.dispose();
};

export default mount;
