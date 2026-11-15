// zoomX: a controlled x window over a 120-point signal, clipped to the plot
import { defineChart, lineY, mountChart } from '@tanstack/charts';
import { zoomX, type ZoomXChange, type ZoomXWindow } from '@tanstack/charts/interaction/zoom';
import { controlledSignal } from '@tanstack/charts/interaction/signal';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { keys } from '../../shared/interact-drive.ts';
import { signal } from '../../shared/interact-data.ts';
import { createStage } from '../../shared/stage.ts';

const rows = signal(120, 6);
const full: ZoomXWindow<number> = { start: 0, end: 119 };

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click the plot to focus it, then use the wheel, drag, + / -, the arrows or Home.' });
  if (stage.preview) stage.height -= 22; // leaves room for the caption lines under the chart
  let win: ZoomXWindow<number> = { start: 30, end: 70 };

  const options = () => ({
    definition: defineChart({
      clip: true,
      marks: [lineY(rows, { x: 't', y: 'value', key: 'id', points: true })],
      scales: { x: { scale: scaleLinear().domain([win.start, win.end]) }, y: { scale: scaleLinear().domain([0, 100]), grid: true } },
      controls: [
        zoomX({
          window: controlledSignal<ZoomXWindow<number>, ZoomXChange<number>>(win, (next) => set(next)),
          extent: [full.start, full.end],
          scaleExtent: [1, 8],
          ariaLabel: 'Zoomable signal',
          format: (v) => v.toFixed(0),
        }),
      ],
      tooltip,
    }),
    height: stage.height,
    initialWidth: 640,
    ariaLabel: 'A zoomable signal',
  });
  const host = stage.own(mountChart(stage.box, options()));
  function set(next: ZoomXWindow<number>): void {
    win = next;
    host.update(options());
    stage.say(`window: ${next.start.toFixed(1)} to ${next.end.toFixed(1)}`);
  }
  set(win);

  if (stage.bar) button(stage.bar, 'Reset', () => set(full));
  else keys(stage, () => stage.box.querySelector('[data-chart-zoom-surface]'), ['+', '+', 'ArrowRight', 'ArrowRight', 'ArrowLeft', 'ArrowLeft', '-', '-'], 800);
  return () => stage.dispose();
};

export default mount;
