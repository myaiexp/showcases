// Big points on the axes' edge: whole with autoPadding, cut off without
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, cycle } from '../../shared/stage.ts';
import { controlBar, slider, toggle } from '../../shared/controls.ts';
import { C, alpha } from '../../shared/data.ts';

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 180 });
  const label = caption(el);
  let auto = true;
  let radius = ctx.preview ? 12 : 18;

  // No min or max on the scales: they end at the first and last readings, so the first
  // and last points sit on the edge of the chart area. (A fixed min or max would clip
  // the points at that edge whatever autoPadding says.)
  const chart = new Chart(stage.canvas, {
    type: 'line',
    data: {
      datasets: [
        {
          label: 'Reading',
          data: [
            { x: 0, y: 10 },
            { x: 2, y: 22 },
            { x: 4, y: 14 },
            { x: 6, y: 28 },
            { x: 8, y: 18 },
            { x: 10, y: 30 },
          ],
          borderColor: C.purple,
          backgroundColor: alpha(C.purple, 0.45),
          pointBorderColor: C.purple,
          pointBorderWidth: 2,
          pointRadius: radius,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      // configuration/layout.md: padding added so visible elements are completely drawn.
      layout: { autoPadding: auto },
      scales: {
        x: { type: 'linear', grid: { display: false }, ticks: { stepSize: 2 } },
        y: { grid: { display: false }, ticks: { stepSize: 10 } },
      },
      plugins: { legend: { display: false }, tooltip: { enabled: !ctx.preview } },
    },
    plugins: [
      {
        // Outlines the canvas, so a point cut off at its edge is easy to see.
        id: 'showcase-canvas-edge',
        beforeDraw(c) {
          c.ctx.save();
          c.ctx.strokeStyle = C.pink;
          c.ctx.setLineDash([4, 4]);
          c.ctx.strokeRect(0.5, 0.5, c.width - 1, c.height - 1);
          c.ctx.restore();
        },
      },
    ],
  });

  const apply = (): void => {
    chart.options.layout!.autoPadding = auto;
    chart.data.datasets[0]!.pointRadius = radius;
    chart.update();
    label.textContent = `layout.autoPadding: ${auto}`;
  };
  apply();

  if (bar) {
    toggle(bar, 'layout.autoPadding', auto, (v) => ((auto = v), apply()));
    slider(bar, 'pointRadius', [2, 30, 1], radius, (v) => ((radius = v), apply()));
  }
  const stop = ctx.preview ? cycle([false, true], 2000, (v) => ((auto = v), apply())) : () => {};

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
