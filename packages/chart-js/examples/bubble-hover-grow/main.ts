// Bubbles that swell when the pointer is near: hoverRadius adds size, hitRadius widens the target
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage } from '../../shared/stage.ts';
import { autoHover } from '../../shared/hover.ts';
import { controlBar, slider } from '../../shared/controls.ts';
import { PALETTE, alpha } from '../../shared/data.ts';
import { APPS } from '../../shared/round-charts-data.ts';

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 180 });
  const unit = ctx.preview ? 1.4 : 2.2;

  const chart = new Chart(stage.canvas, {
    type: 'bubble',
    data: {
      datasets: [
        {
          label: 'Apps',
          data: APPS.map((a) => ({ x: a.price, y: a.rating, r: 4 + Math.sqrt(a.reviews) * unit })),
          backgroundColor: PALETTE.map((c) => alpha(c, 0.55)),
          borderColor: PALETTE,
          borderWidth: 1.5,
          // Both are extra pixels on top of each bubble's own r (bubble.md § Interactions).
          hoverRadius: 12,
          hitRadius: 6,
          hoverBorderWidth: 3,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      scales: {
        x: { min: -2, max: 14, title: { display: !ctx.preview, text: 'Price (€)' } },
        y: { min: 3, max: 5, title: { display: !ctx.preview, text: 'Rating (stars)' } },
      },
      plugins: {
        legend: { display: false },
        tooltip: { callbacks: { label: (t) => `${APPS[t.dataIndex]!.name}: €${t.parsed.x}, ${t.parsed.y} stars` } },
      },
    },
  });

  if (bar) {
    slider(bar, 'hoverRadius', [0, 30, 1], 12, (v) => {
      chart.data.datasets[0]!.hoverRadius = v;
      chart.update();
    });
    slider(bar, 'hitRadius', [0, 40, 1], 6, (v) => {
      chart.data.datasets[0]!.hitRadius = v;
      chart.update();
    });
    caption(el, 'Move the pointer near a bubble, not only onto it: a larger hitRadius catches it sooner.');
  }
  // A card has no pointer, so autoHover activates the bubbles one by one.
  const stop = ctx.preview ? autoHover(chart, 1300) : () => {};
  if (ctx.preview) caption(el, 'hoverRadius: 12');

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
