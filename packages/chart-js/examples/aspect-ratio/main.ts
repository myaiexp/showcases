// A chart in a box with no height of its own: aspectRatio decides how tall it gets
import type { Mount } from '@/types.ts';
import { Chart, caption, cycle } from '../../shared/stage.ts';
import { controlBar, slider, toggle } from '../../shared/controls.ts';
import { C, WEEKDAYS, alpha } from '../../shared/data.ts';

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  // responsive.md: a relatively positioned box that holds only the canvas. It has a
  // width but no height, so the height comes from the ratio.
  const box = document.createElement('div');
  box.style.cssText = `position:relative;min-width:0;width:${ctx.preview ? '250px' : '60%'}`;
  const canvas = document.createElement('canvas');
  box.append(canvas);
  el.append(box);
  const label = caption(el);

  const chart = new Chart(canvas, {
    type: 'line',
    data: {
      labels: WEEKDAYS,
      datasets: [{ label: 'Visitors', data: [120, 150, 135, 180, 210, 260, 190], borderColor: C.green, backgroundColor: alpha(C.green, 0.3), fill: true, tension: 0.3 }],
    },
    options: {
      maintainAspectRatio: true,
      aspectRatio: 2, // width / height
      animation: false,
      onResize: (c) => {
        label.textContent = `aspectRatio: ${c.options.aspectRatio} · ${Math.round(c.width)} × ${Math.round(c.height)} px`;
      },
      plugins: { legend: { display: false } },
    },
  });

  // The box size is unchanged by a new ratio, so ask for a layout; onResize updates the label.
  const apply = (): void => chart.resize();
  const setRatio = (r: number): void => {
    chart.options.aspectRatio = r;
    apply();
  };
  label.textContent = 'aspectRatio: 2';

  if (bar) {
    slider(bar, 'aspectRatio', [0.5, 4, 0.1], 2, (v) => setRatio(Math.round(v * 10) / 10));
    slider(bar, 'box width (%)', [30, 100, 1], 60, (v) => {
      box.style.width = `${v}%`;
    });
    toggle(bar, 'maintainAspectRatio', true, (v) => {
      chart.options.maintainAspectRatio = v;
      apply();
    });
  }
  const stop = ctx.preview ? cycle([3, 1.5, 2.5, 2], 1800, setRatio) : () => {};

  return () => {
    stop();
    chart.destroy();
    box.remove();
  };
};

export default mount;
