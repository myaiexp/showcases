// intersect: true needs the pointer on a point; false finds the nearest
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, every } from '../../shared/stage.ts';
import { controlBar, select, toggle } from '../../shared/controls.ts';
import { C, WEEKDAYS, alpha } from '../../shared/data.ts';
import { ghostCursor } from '../../shared/config-data.ts';

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 176 });
  const note = caption(el, 'intersect: true');
  const ghost = ghostCursor();

  const chart = new Chart(stage.canvas, {
    type: 'line',
    data: {
      labels: WEEKDAYS,
      datasets: [
        {
          label: 'Steps (thousands)',
          data: [8.2, 6.4, 9.1, 7.7, 10.3, 12.8, 5.9],
          borderColor: C.green,
          backgroundColor: alpha(C.green, 0.4),
          pointRadius: 5,
          pointHoverRadius: 8,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      scales: { y: { min: 0, max: 16 } },
      // interactions.md: intersect decides whether the pointer must touch an element.
      interaction: { mode: 'nearest', intersect: true },
      plugins: { legend: { display: false } },
    },
    plugins: ctx.preview ? [ghost.plugin] : [],
  });

  const setIntersect = (intersect: boolean): void => {
    // Set the key in place: replacing the whole object leaves options.hover on the old one.
    chart.options.interaction!.intersect = intersect;
    note.textContent = `intersect: ${intersect}`;
  };

  if (bar) {
    toggle(bar, 'intersect', true, setIntersect);
    select(bar, 'mode', ['nearest', 'index'] as const, 'nearest', (mode) => {
      chart.options.interaction!.mode = mode;
    });
  }

  // The card's pointer visits each point twice: 30px above it, then right on it.
  let step = 0;
  const stop = ctx.preview
    ? every(1000, () => {
        const n = step++;
        const point = chart.getDatasetMeta(0).data[Math.floor(n / 2) % 7]!;
        const onIt = n % 2 === 1;
        if (n % 4 === 0) setIntersect(Math.floor(n / 4) % 2 === 0);
        ghost.move(chart, point.x, point.y - (onIt ? 0 : 30));
      })
    : () => {};

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
