// A crosshair from plugin events: afterEvent, then afterDraw
import type { Chart as ChartType, Plugin } from 'chart.js';
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, every } from '../../shared/stage.ts';
import { controlBar, toggle } from '../../shared/controls.ts';
import { ghostCursor } from '../../shared/config-data.ts';
import { C, alpha } from '../../shared/data.ts';

// Where each chart's pointer is, or null when it is outside the plot.
const pointer = new WeakMap<ChartType, { x: number; y: number } | null>();

// plugins.md § Event Handling: afterEvent sees every event and may ask for a re-render
// by setting args.changed. Nothing is stored on the chart itself.
const crosshair = (readout: HTMLElement, fmt: (x: number, y: number) => string, show: { lines: boolean }): Plugin<'line'> => ({
  id: 'showcaseCrosshair',
  afterEvent(chart, args) {
    const { event, inChartArea } = args;
    if (event.type === 'mouseout') pointer.set(chart, null);
    else if (event.type === 'mousemove')
      pointer.set(chart, inChartArea && event.x !== null && event.y !== null ? { x: event.x, y: event.y } : null);
    else return;
    args.changed = true;
  },
  afterDraw(chart) {
    const at = pointer.get(chart);
    if (!at) {
      readout.textContent = 'move over the chart';
      return;
    }
    const { ctx, chartArea, scales } = chart;
    if (show.lines) {
      ctx.save();
      ctx.strokeStyle = 'rgba(250, 250, 250, 0.55)';
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(at.x, chartArea.top);
      ctx.lineTo(at.x, chartArea.bottom);
      ctx.moveTo(chartArea.left, at.y);
      ctx.lineTo(chartArea.right, at.y);
      ctx.stroke();
      ctx.restore();
    }
    // getValueForPixel turns the pointer's pixels back into data values.
    const text = fmt(Number(scales.x!.getValueForPixel(at.x)), Number(scales.y!.getValueForPixel(at.y)));
    readout.textContent = text;
  },
});

const HEART = Array.from({ length: 25 }, (_, i) => {
  const t = i / 24;
  return {
    x: i,
    y: Math.round(62 + 22 * Math.sin(t * Math.PI * 2) + 14 * Math.sin(t * 17) + (t > 0.5 ? 18 * t : 0)),
  };
});

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 168 });
  const readout = caption(el, 'move over the chart');
  const ghost = ghostCursor();
  const fmt = (x: number, y: number): string =>
    `${String(Math.floor(x)).padStart(2, '0')}:${String(Math.round((x % 1) * 60)).padStart(2, '0')} · ${Math.round(y)} bpm`;

  const show = { lines: true };
  const chart = new Chart<'line'>(stage.canvas, {
    type: 'line',
    data: {
      datasets: [
        {
          label: 'Heart rate',
          data: HEART,
          borderColor: C.red,
          backgroundColor: alpha(C.red, 0.3),
          pointRadius: 0,
          tension: 0.3,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      events: ['mousemove', 'mouseout', 'click', 'touchstart', 'touchmove'],
      scales: {
        x: {
          type: 'linear',
          min: 0,
          max: 24,
          ticks: { stepSize: 6, callback: (v) => `${v}:00` },
        },
        y: { min: 40, max: 120 },
      },
      plugins: { legend: { display: false }, tooltip: { enabled: false } },
    },
    plugins: [crosshair(readout, fmt, show), ...(ctx.preview ? [ghost.plugin] : [])],
  });

  if (bar) toggle(bar, 'draw the lines', true, (v) => ((show.lines = v), chart.render()));

  // The card's fake pointer wanders over the plot on a slow loop.
  let t = 0;
  const stop = ctx.preview
    ? every(60, () => {
        t += 0.045;
        const { left, right, top, bottom } = chart.chartArea;
        ghost.move(chart, left + (right - left) * (0.5 + 0.45 * Math.sin(t)), top + (bottom - top) * (0.5 + 0.35 * Math.sin(t * 1.7 + 1)));
      })
    : () => {};

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
