// The same chart at different devicePixelRatio values, with a pixel loupe
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, cycle } from '../../shared/stage.ts';
import { controlBar, slider } from '../../shared/controls.ts';
import { C, WEEKDAYS, alpha } from '../../shared/data.ts';

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 100, height: 260 });
  const zoom = ctx.preview ? 4 : 8;
  const lens = document.createElement('canvas');
  lens.width = 48 * zoom;
  lens.height = 16 * zoom;
  lens.style.cssText = 'margin-top:8px;border:1px solid var(--fg-3);image-rendering:pixelated;max-width:100%';
  el.append(lens);
  const label = caption(el);

  const chart = new Chart(stage.canvas, {
    type: 'line',
    data: {
      labels: WEEKDAYS,
      datasets: [{ label: 'Visitors', data: [120, 150, 135, 180, 210, 260, 190], borderColor: C.pink, backgroundColor: alpha(C.pink, 0.3), fill: true, tension: 0.3 }],
    },
    options: {
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
    },
    plugins: [
      {
        // The loupe: copies a few CSS pixels near the axis labels at their real device
        // pixels and enlarges them without smoothing, so each canvas pixel is a block.
        id: 'showcase-loupe',
        afterRender(c) {
          const r = c.currentDevicePixelRatio;
          const g = lens.getContext('2d')!;
          g.imageSmoothingEnabled = false;
          g.clearRect(0, 0, lens.width, lens.height);
          const sx = Math.max(0, c.chartArea.left - 40) * r;
          const sy = (c.chartArea.bottom - 8) * r;
          g.drawImage(c.canvas, sx, sy, 48 * r, 16 * r, 0, 0, lens.width, lens.height);
        },
      },
    ],
  });

  const apply = (ratio: number): void => {
    chart.options.devicePixelRatio = ratio;
    chart.resize(); // the canvas is resized for the new ratio, then redrawn
    label.textContent = `devicePixelRatio: ${ratio} · canvas ${chart.canvas.width}×${chart.canvas.height}px`;
  };
  apply(1);

  if (bar) slider(bar, 'devicePixelRatio', [0.25, 4, 0.25], 1, apply);
  const stop = ctx.preview ? cycle([0.5, 2, 0.25, 1], 1800, apply) : () => {};

  return () => {
    stop();
    stage.release(chart);
    lens.remove();
  };
};

export default mount;
