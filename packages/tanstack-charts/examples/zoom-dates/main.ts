// zoomX with Date values over a daily series
import { defineChart, lineY, mountChart } from '@tanstack/charts';
import { zoomX, type ZoomXChange, type ZoomXWindow } from '@tanstack/charts/interaction/zoom';
import { controlledSignal } from '@tanstack/charts/interaction/signal';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scaleUtc } from '@tanstack/charts/scales/time';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { keys } from '../../shared/interact-drive.ts';
import { signal } from '../../shared/interact-data.ts';
import { days } from '../../shared/random.ts';
import { createStage } from '../../shared/stage.ts';

const dates = days('2025-01-01', 120);
const rows = signal(120, 6).map((r) => ({ ...r, date: dates[r.t]! }));
const fullExtent = [dates[0]!, dates[119]!] as const;
const day = (d: Date): string => d.toISOString().slice(0, 10);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click the plot, then use the wheel, drag or the keyboard.' });
  if (stage.preview) stage.height -= 22; // leaves room for the caption lines under the chart
  let win: ZoomXWindow<Date> = { start: dates[20]!, end: dates[80]! };

  const options = () => ({
    definition: defineChart({
      clip: true,
      marks: [lineY(rows, { x: 'date', y: 'value', key: 'id' })],
      scales: { x: { scale: scaleUtc().domain([win.start, win.end]) }, y: { scale: scaleLinear().domain([0, 100]), grid: true } },
      controls: [
        zoomX({
          window: controlledSignal<ZoomXWindow<Date>, ZoomXChange<Date>>(win, (next) => set(next)),
          extent: fullExtent,
          scaleExtent: [1, 10],
          ariaLabel: 'Zoomable daily signal',
          format: day,
        }),
      ],
    }),
    height: stage.height,
    initialWidth: 640,
    ariaLabel: 'A daily signal with a date window',
  });
  const host = stage.own(mountChart(stage.box, options()));
  function set(next: ZoomXWindow<Date>): void {
    win = next;
    host.update(options());
    stage.say(`window: ${day(next.start)} to ${day(next.end)}`);
  }
  set(win);

  if (stage.bar) button(stage.bar, 'Show all', () => set({ start: fullExtent[0], end: fullExtent[1] }));
  else keys(stage, () => stage.box.querySelector('[data-chart-zoom-surface]'), ['+', '+', 'ArrowRight', 'ArrowRight', '-', '-', 'ArrowLeft', 'ArrowLeft'], 800);
  return () => stage.dispose();
};

export default mount;
