// chart.resize(width, height) from code, then resize() to auto
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, cycle } from '../../shared/stage.ts';
import { button, controlBar, slider } from '../../shared/controls.ts';
import { C, MONTHS, alpha } from '../../shared/data.ts';

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 170 });
  const note = caption(el, 'resize()');
  stage.box.style.outline = '1px dashed var(--fg-3)';
  stage.box.style.display = 'flex';
  stage.box.style.justifyContent = 'center';

  const chart = new Chart(stage.canvas, {
    type: 'line',
    data: {
      labels: MONTHS,
      datasets: [
        {
          label: 'Daylight (hours)',
          data: [6, 8, 11, 14, 17, 19, 18, 16, 13, 10, 7, 5],
          borderColor: C.amber,
          backgroundColor: alpha(C.amber, 0.25),
          fill: true,
          tension: 0.35,
        },
      ],
    },
    options: { maintainAspectRatio: false, animation: false, plugins: { legend: { display: false } } },
    // Prints the canvas size in the chart itself, so the effect of each call is readable.
    plugins: [
      {
        id: 'showcaseSizeLabel',
        afterDraw(c) {
          c.ctx.save();
          c.ctx.fillStyle = 'rgba(250, 250, 250, 0.6)';
          c.ctx.font = '12px ui-monospace, monospace';
          c.ctx.textAlign = 'right';
          c.ctx.fillText(`${Math.round(c.width)} × ${Math.round(c.height)}`, c.chartArea.right - 4, c.chartArea.top + 14);
          c.ctx.restore();
        },
      },
    ],
  });

  // api.md § resize(width?, height?): fixed pixels, or nothing to fill the container again.
  const fixed = (w: number, h: number): void => {
    chart.resize(w, h);
    note.textContent = `chart.resize(${w}, ${h})`;
  };
  const auto = (): void => {
    chart.resize();
    note.textContent = 'chart.resize()';
  };

  let width = 320;
  let height = 200;
  if (bar) {
    slider(bar, 'Width', [160, 720, 10], width, (v) => fixed((width = v), height));
    slider(bar, 'Height', [120, 380, 10], height, (v) => fixed(width, (height = v)));
    button(bar, 'resize() back to auto', auto);
  }
  const sizes: readonly (readonly [number, number] | null)[] = [[150, 100], [210, 140], null];
  const stop = ctx.preview ? cycle(sizes, 1700, (s) => (s ? fixed(s[0], s[1]) : auto())) : () => {};

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
