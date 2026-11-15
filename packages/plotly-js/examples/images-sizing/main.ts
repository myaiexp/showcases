// layout.images sizing and layer: contain, fill or stretch, above or below the data
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { badge } from '../../shared/fund-util.ts';
import { createStage } from '../../shared/stage.ts';

const SIZING = ['contain', 'fill', 'stretch'] as const;
const LAYERS = ['above', 'below'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 420 });
  const img = badge('Plot', 290, 200);
  // A wide box on purpose: the sizing modes only differ when the box is not the image's shape.
  await Plotly.newPlot(
    stage.div,
    [{ type: 'scatter', mode: 'lines+markers', x: [0, 1, 2, 3, 4, 5], y: [1, 3, 2, 4, 2, 3], line: { color: '#f59e0b', width: 4 } }],
    {
      template: stage.template,
      xaxis: { range: [0, 5] },
      yaxis: { range: [0, 5] },
      images: [{ source: img, xref: 'x', yref: 'y', x: 0.5, y: 4.8, sizex: 4, sizey: 3.5, xanchor: 'left', yanchor: 'top', sizing: 'contain', opacity: 0.7, layer: 'below' }],
    },
    stage.config,
  );

  const set = (u: Record<string, unknown>): void => void Plotly.relayout(stage.div, u as never);
  if (stage.bar) {
    select(stage.bar, 'sizing', SIZING, 'contain', (v) => set({ 'images[0].sizing': v }));
    select(stage.bar, 'layer', LAYERS, 'below', (v) => set({ 'images[0].layer': v }));
    slider(stage.bar, 'opacity', [0.1, 1, 0.05], 0.7, (v) => set({ 'images[0].opacity': v }));
  } else {
    stage.every(1300, (i) => set({ 'images[0].sizing': SIZING[i % 3], 'images[0].layer': i % 2 ? 'above' : 'below' }));
  }
  return () => stage.dispose();
};

export default mount;
