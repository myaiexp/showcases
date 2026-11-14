// A chart in a box whose width changes: onResize reports each resize
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, cycle, every } from '../../shared/stage.ts';
import { button, controlBar, log, select, slider } from '../../shared/controls.ts';
import { C, WEEKDAYS, alpha } from '../../shared/data.ts';

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 150, height: 280 });
  const label = caption(el);
  const write = ctx.preview ? null : log(el, 6);
  let delay = 0;
  let pct = 100;
  let chart: Chart | null = null;
  let changedAt = 0;

  const build = (): void => {
    chart?.destroy();
    chart = new Chart(stage.canvas, {
      type: 'bar',
      data: {
        labels: WEEKDAYS,
        datasets: [{ label: 'Visitors', data: [120, 150, 135, 180, 210, 260, 190], backgroundColor: alpha(C.cyan, 0.6), borderColor: C.cyan, borderWidth: 1 }],
      },
      options: {
        maintainAspectRatio: false,
        resizeDelay: delay, // waits this long after the last size change before redrawing
        // responsive.md: called when a resize occurs, with the chart and the new size.
        onResize: (_chart, size) => {
          const text = `onResize → ${Math.round(size.width)} × ${Math.round(size.height)} px`;
          label.textContent = text;
          write?.(`${text}   (${Math.round(performance.now() - changedAt)} ms after the box changed)`);
        },
        plugins: { legend: { display: false } },
      },
    });
    label.textContent = `resizeDelay: ${delay}`;
  };
  build();

  const setWidth = (p: number): void => {
    pct = p;
    changedAt = performance.now();
    // The chart watches its container (responsive.md), so resizing the box is enough.
    stage.box.style.width = `${p}%`;
  };

  let animating: (() => void) | null = null;
  if (bar) {
    const input = slider(bar, 'box width (%)', [20, 100, 1], pct, setWidth);
    select(bar, 'resizeDelay (ms)', ['0', '300', '800'] as const, '0', (v) => {
      delay = Number(v);
      build();
    });
    button(bar, 'Animate', () => {
      if (animating) {
        animating();
        animating = null;
        return;
      }
      let t = 0;
      animating = every(50, () => {
        t += 0.12;
        setWidth(Math.round(60 + 40 * Math.cos(t)));
        input.value = String(pct);
        input.dispatchEvent(new Event('input')); // keeps the slider readout in step
      });
    });
  }
  const stop = ctx.preview ? cycle([55, 85, 35, 100], 1500, setWidth) : () => {};

  return () => {
    stop();
    animating?.();
    stage.release(chart);
  };
};

export default mount;
