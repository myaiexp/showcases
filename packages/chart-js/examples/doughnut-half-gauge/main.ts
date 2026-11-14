// A half doughnut used as a progress gauge, with the value drawn in the middle
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, cycle } from '../../shared/stage.ts';
import { controlBar, slider } from '../../shared/controls.ts';
import { C, alpha } from '../../shared/data.ts';

const VALUES = [72, 35, 90, 58];

const colourFor = (v: number): string => (v < 40 ? C.red : v < 70 ? C.amber : C.green);

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 180 });
  const label = caption(el);

  const chart = new Chart(stage.canvas, {
    type: 'doughnut',
    data: {
      labels: ['Reached', 'Still to go'],
      datasets: [
        {
          label: '% of goal',
          data: [72, 28],
          backgroundColor: [colourFor(72), alpha(C.grey, 0.2)],
          borderWidth: 0,
          borderRadius: 6,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      // A gauge: start at the left (-90 degrees) and sweep only half the circle.
      rotation: -90,
      circumference: 180,
      cutout: '72%',
      plugins: { legend: { display: false }, tooltip: { enabled: !ctx.preview } },
    },
    // Inline plugin (plugins.md): after the arcs are drawn, write the value in the hole.
    plugins: [
      {
        id: 'gauge-value',
        afterDatasetsDraw(c) {
          const arc = c.getDatasetMeta(0).data[0];
          if (!arc) return;
          const { ctx: g } = c;
          g.save();
          g.fillStyle = '#fafafa';
          g.textAlign = 'center';
          g.textBaseline = 'alphabetic';
          g.font = `600 ${ctx.preview ? 26 : 38}px Inter Variable, system-ui, sans-serif`;
          g.fillText(`${c.data.datasets[0]!.data[0]}%`, arc.x, arc.y - 4);
          g.restore();
        },
      },
    ],
  });

  const set = (v: number): void => {
    const ds = chart.data.datasets[0]!;
    ds.data = [v, 100 - v];
    ds.backgroundColor = [colourFor(v), alpha(C.grey, 0.2)];
    chart.update();
    label.textContent = `data: [${v}, ${100 - v}]`;
  };
  set(72);

  if (bar) slider(bar, 'Goal reached (%)', [0, 100, 1], 72, set);
  const stop = ctx.preview ? cycle(VALUES, 2000, set) : () => {};

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
