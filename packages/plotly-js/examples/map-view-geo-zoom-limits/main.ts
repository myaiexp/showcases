// geo.projection.minscale and maxscale clamp zoom on an outline map; the readout prints each zoom event
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { relayout } from '../../shared/basic-util.ts';
import { readout, slider } from '../../shared/controls.ts';
import { loadGeoAssets } from '../../shared/geo.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  await loadGeoAssets();
  if (ctx.signal.aborted) return () => {};
  const stage = createStage(el, ctx, { height: 480 });
  const out = stage.preview ? null : readout(el);

  await Plotly.newPlot(
    stage.div,
    [
      {
        type: 'scattergeo',
        mode: 'markers+text',
        lon: [2.35, 13.4, 12.5, -3.7],
        lat: [48.86, 52.52, 41.9, 40.42],
        text: ['Paris', 'Berlin', 'Rome', 'Madrid'],
        textposition: 'top center',
        textfont: { color: '#e6e8ee' },
        marker: { size: 10, color: '#636efa' },
      },
    ],
    {
      template: stage.template,
      title: { text: stage.preview ? '' : 'Zoom limited to 0.5x - 4x' },
      geo: { scope: 'europe', resolution: 50, showland: true, landcolor: '#2a2f3a', projection: { scale: 1, minscale: 0.5, maxscale: 4 } },
      showlegend: false,
    },
    stage.config,
  );

  stage.div.on('plotly_relayout', (e) => {
    if (out) out.textContent = JSON.stringify(e);
  });
  const set = (u: Record<string, unknown>): Promise<void> => relayout(stage.div, u);
  if (stage.bar) {
    slider(stage.bar, 'minscale', [0, 1, 0.1], 0.5, (v) => void set({ 'geo.projection.minscale': v }));
    slider(stage.bar, 'maxscale', [1, 8, 0.5], 4, (v) => void set({ 'geo.projection.maxscale': v }));
    slider(stage.bar, 'projection.scale', [0.2, 10, 0.1], 1, (v) => void set({ 'geo.projection.scale': v }));
  }
  // asks for scales beyond both limits; the map stops at 0.5x and 4x
  if (stage.preview) stage.every(500, (i) => void set({ 'geo.projection.scale': Math.exp(Math.sin(i / 3) * 2.2) }));

  return () => stage.dispose();
};

export default mount;
