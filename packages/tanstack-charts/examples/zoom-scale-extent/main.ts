// zoomX scaleExtent: a slider sets the maximum zoom factor, the readout shows the current one
import { defineChart, lineY, mountChart } from '@tanstack/charts';
import { zoomX, type ZoomXChange, type ZoomXWindow } from '@tanstack/charts/interaction/zoom';
import { controlledSignal } from '@tanstack/charts/interaction/signal';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { keys } from '../../shared/interact-drive.ts';
import { signal } from '../../shared/interact-data.ts';
import { createStage } from '../../shared/stage.ts';

const rows = signal(120, 6);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Zoom in with + until it stops, then raise the cap.' });
  if (stage.preview) stage.height -= 22; // leaves room for the caption lines under the chart
  let win: ZoomXWindow<number> = { start: 0, end: 119 };
  let cap = 3;

  const options = () => ({
    definition: defineChart({
      clip: true,
      marks: [lineY(rows, { x: 't', y: 'value', key: 'id' })],
      scales: { x: { scale: scaleLinear().domain([win.start, win.end]) }, y: { scale: scaleLinear().domain([0, 100]), grid: true } },
      controls: [
        zoomX({
          window: controlledSignal<ZoomXWindow<number>, ZoomXChange<number>>(win, (next) => set(next)),
          extent: [0, 119],
          scaleExtent: [1, cap],
          ariaLabel: 'Zoomable signal',
        }),
      ],
    }),
    height: stage.height,
    initialWidth: 640,
    ariaLabel: 'A zoomable signal with a zoom cap',
  });
  const host = stage.own(mountChart(stage.box, options()));
  function set(next: ZoomXWindow<number>): void {
    win = next;
    host.update(options());
    stage.say(`zoom factor ${(119 / (next.end - next.start)).toFixed(2)} of a maximum ${cap}`);
  }
  set(win);

  if (stage.bar) slider(stage.bar, 'max zoom', 2, 12, 1, cap, (v) => { cap = v; set(win); }, (v) => `${v}x`);
  else keys(stage, () => stage.box.querySelector('[data-chart-zoom-surface]'), ['+', '+', '+', '+', '-', '-', '-', '-'], 700);
  return () => stage.dispose();
};

export default mount;
