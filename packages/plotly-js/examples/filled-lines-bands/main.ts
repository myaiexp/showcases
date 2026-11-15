// Filled lines: tozerox polygons behind three lines (Fair, Premium, Ideal)
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const outline = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
const line = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const bands = [
  { name: 'Fair', fill: 'rgba(0,100,80,0.2)', color: 'rgb(0,100,80)', poly: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0], y: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
  { name: 'Premium', fill: 'rgba(0,176,246,0.2)', color: 'rgb(0,176,246)', poly: [5.5, 3, 5.5, 8, 6, 3, 8, 5, 6, 5.5, 4.75, 5, 4, 7, 2, 4, 7, 4.4, 2, 4.5], y: [5, 2.5, 5, 7.5, 5, 2.5, 7.5, 4.5, 5.5, 5] },
  { name: 'Ideal', fill: 'rgba(231,107,243,0.2)', color: 'rgb(231,107,243)', poly: [11, 9, 7, 5, 3, 1, 3, 5, 3, 1, -1, 1, 3, 1, -0.5, 1, 3, 5, 7, 9], y: [10, 8, 6, 4, 2, 0, 2, 4, 2, 0] },
];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 420 });

  await Plotly.newPlot(
    stage.div,
    [
      ...bands.map((b) => ({ x: outline, y: b.poly, fill: 'tozerox' as const, fillcolor: b.fill, line: { color: 'transparent' }, name: b.name, showlegend: false, type: 'scatter' as const })),
      ...bands.map((b) => ({ x: line, y: b.y, line: { color: b.color }, mode: 'lines' as const, name: b.name, type: 'scatter' as const })),
    ],
    {
      template: stage.template,
      xaxis: { range: [1, 10], showgrid: true, showline: false, ticks: 'outside', zeroline: false },
      yaxis: { showgrid: true, showline: false, ticks: 'outside', zeroline: false },
    },
    stage.config,
  );

  // Cards: each band and its line are shown in turn (the legend does this by click in the full view).
  if (stage.preview) {
    stage.every(1100, (i) => {
      const on = i % 4;
      const vis = (k: number): boolean => on === 3 || on === k;
      void Plotly.restyle(stage.div, { visible: [vis(0), vis(1), vis(2), vis(0), vis(1), vis(2)] } as never);
    });
  }

  return () => stage.dispose();
};

export default mount;
