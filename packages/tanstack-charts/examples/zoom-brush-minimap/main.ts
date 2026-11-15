// zoomX on the main chart and brushX on an overview share one window
import { defineChart, lineY, mountChart } from '@tanstack/charts';
import { brushX, type BrushRange, type BrushXChange } from '@tanstack/charts/interaction/brush';
import { zoomX, type ZoomXChange, type ZoomXWindow } from '@tanstack/charts/interaction/zoom';
import { controlledSignal } from '@tanstack/charts/interaction/signal';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { keys } from '../../shared/interact-drive.ts';
import { signal } from '../../shared/interact-data.ts';
import { createStage } from '../../shared/stage.ts';

const rows = signal(120, 6);
const steps = rows.map((r) => r.t);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Zoom or pan the left chart, or brush the right one: both show the same window.' });
  if (stage.preview) stage.height -= 22; // leaves room for the caption lines under the chart
  let win: ZoomXWindow<number> = { start: 30, end: 70 };

  const main = () => ({
    definition: defineChart({
      clip: true,
      marks: [lineY(rows, { x: 't', y: 'value', key: 'id' })],
      scales: { x: { scale: scaleLinear().domain([win.start, win.end]) }, y: { scale: scaleLinear().domain([0, 100]), grid: true } },
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
    initialWidth: 420,
    ariaLabel: 'Zoomable signal',
  });
  const overview = () => ({
    definition: defineChart({
      marks: [lineY(rows, { x: 't', y: 'value', key: 'id', strokeWidth: 1.5 })],
      scales: { x: { scale: scaleLinear().domain([0, 119]) }, y: { scale: scaleLinear().domain([0, 100]) } },
      controls: [
        brushX({
          range: controlledSignal<BrushRange<number>, BrushXChange<number>>({ start: Math.round(win.start), end: Math.round(win.end) }, (next, { reason }) => {
            if (reason.type === 'commit' && next.end > next.start) set({ start: next.start, end: next.end });
          }),
          handleSize: stage.preview ? 10 : 24,
          values: steps,
          format: (t) => `t ${t}`,
          ariaLabel: 'Window',
        }),
      ],
    }),
    height: stage.height,
    initialWidth: 420,
    ariaLabel: 'Overview of the whole signal',
  });
  const mainHost = stage.own(mountChart(stage.box, main()));
  const overviewHost = stage.own(mountChart(stage.addBox(), overview()));
  function set(next: ZoomXWindow<number>): void {
    win = next;
    mainHost.update(main());
    overviewHost.update(overview());
    stage.say(`window: ${next.start.toFixed(0)} to ${next.end.toFixed(0)}`);
  }
  set(win);
  if (stage.preview) keys(stage, () => stage.box.querySelector('[data-chart-zoom-surface]'), ['+', '+', 'ArrowRight', 'ArrowRight', '-', '-', 'ArrowLeft', 'ArrowLeft'], 800);
  return () => stage.dispose();
};

export default mount;
