// Bars change colour, border and corners when hovered; a card hovers by itself
import type { ChartDataset } from 'chart.js';
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage } from '../../shared/stage.ts';
import { controlBar, select, slider } from '../../shared/controls.ts';
import { autoHover } from '../../shared/hover.ts';
import { C, alpha } from '../../shared/data.ts';

const COLOURS = { amber: C.amber, pink: C.pink, green: C.green, white: '#fafafa' } as const;
type Name = keyof typeof COLOURS;

// bar.md documents hoverBorderRadius; chart.js's bar dataset type leaves it out.
type HoverDataset = ChartDataset<'bar'> & { hoverBorderRadius?: number };

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 180 });
  const label = caption(el, ctx.preview ? 'hoverBackgroundColor' : 'Hover a bar');

  const chart = new Chart(stage.canvas, {
    type: 'bar',
    data: {
      labels: ['Rock', 'Pop', 'Jazz', 'Folk', 'Hip hop', 'Classical'],
      datasets: [
        {
          label: 'Streams (millions)',
          data: [48, 72, 21, 17, 65, 26],
          backgroundColor: alpha(C.blue, 0.55),
          borderColor: C.blue,
          borderWidth: 1,
          // bar.md § Interactions: the hover* options replace the normal style while the
          // pointer is over a bar.
          hoverBackgroundColor: C.amber,
          hoverBorderColor: '#fafafa',
          hoverBorderWidth: 3,
          hoverBorderRadius: 8,
        } as ChartDataset<'bar'>,
      ],
    },
    options: {
      maintainAspectRatio: false,
      scales: { y: { beginAtZero: true } },
      plugins: { legend: { display: false }, tooltip: { enabled: ctx.preview ? false : true } },
    },
  });

  if (bar) {
    const ds = chart.data.datasets[0]! as HoverDataset;
    select(bar, 'hoverBackgroundColor', Object.keys(COLOURS) as Name[], 'amber', (v) => {
      ds.hoverBackgroundColor = COLOURS[v];
      chart.update();
    });
    slider(bar, 'hoverBorderWidth', [0, 10, 1], 3, (v) => ((ds.hoverBorderWidth = v), chart.update()));
    slider(bar, 'hoverBorderRadius', [0, 24, 1], 8, (v) => ((ds.hoverBorderRadius = v), chart.update()));
  }
  const stop = ctx.preview ? autoHover(chart, 1100) : () => {};

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
