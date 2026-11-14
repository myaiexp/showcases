// Running distance against a dashed 40 km target with marching dashes
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, every } from '../../shared/stage.ts';
import { controlBar, slider, toggle } from '../../shared/controls.ts';
import { C, alpha } from '../../shared/data.ts';

const DISTANCE = [22, 28, 31, 26, 38, 41, 36, 44, 47, 43];

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 180 });
  const label = caption(el);
  let dash = 8;
  let gap = 6;
  let offset = 0;
  let marching = true;

  const chart = new Chart(stage.canvas, {
    type: 'line',
    data: {
      labels: DISTANCE.map((_, i) => `W${i + 1}`),
      datasets: [
        { label: 'Distance (km)', data: DISTANCE, borderColor: C.blue, backgroundColor: alpha(C.blue, 0.4), borderWidth: 2.5, pointRadius: 3 },
        {
          label: 'Target',
          data: DISTANCE.map(() => 40),
          borderColor: C.amber,
          borderWidth: 2,
          pointRadius: 0,
          // line.md § Line Styling: dash length and gap, and where in the pattern to start.
          borderDash: [dash, gap],
          borderDashOffset: offset,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      scales: { y: { min: 15, max: 55 } },
      plugins: { legend: { display: !ctx.preview } },
    },
  });

  const apply = (animate = false): void => {
    const target = chart.data.datasets[1]!;
    target.borderDash = [dash, gap];
    target.borderDashOffset = offset;
    chart.update(animate ? 'none' : undefined);
    label.textContent = ctx.preview ? `borderDashOffset: ${offset}` : `borderDash: [${dash}, ${gap}], borderDashOffset: ${offset}`;
  };
  apply();

  // Moving the offset a little every frame-ish makes the dashes crawl along the line.
  const stop = every(120, () => {
    if (!marching) return;
    offset = (offset - 2 + (dash + gap)) % (dash + gap);
    apply(true);
  });

  if (bar) {
    slider(bar, 'dash', [1, 30, 1], dash, (v) => ((dash = v), apply(true)));
    slider(bar, 'gap', [1, 30, 1], gap, (v) => ((gap = v), apply(true)));
    toggle(bar, 'march', true, (v) => (marching = v));
  }

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
