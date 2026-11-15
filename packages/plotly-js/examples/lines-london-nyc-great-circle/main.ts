// A two-point scattergeo line is a great circle: the same pair of cities under different projections
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { pick, relayout } from '../../shared/basic-util.ts';
import { select } from '../../shared/controls.ts';
import { loadGeoAssets } from '../../shared/geo.ts';
import { createStage } from '../../shared/stage.ts';

const projections = ['equirectangular', 'mercator', 'natural earth', 'orthographic', 'stereographic'] as const;

const mount: Mount = async (el, ctx) => {
  await loadGeoAssets();
  if (ctx.signal.aborted) return () => {};
  const stage = createStage(el, ctx, { height: 460 });

  await Plotly.newPlot(
    stage.div,
    [{ type: 'scattergeo', lat: [40.7127, 51.5072], lon: [-74.0059, 0.1275], mode: 'lines', line: { width: 2, color: '#60a5fa' } }],
    {
      template: stage.template,
      title: { text: stage.preview ? '' : 'London to NYC Great Circle' },
      showlegend: false,
      geo: {
        resolution: 50,
        showland: true,
        showlakes: true,
        landcolor: '#2a2f3a',
        countrycolor: '#4b5263',
        lakecolor: '#0f1115',
        projection: { type: 'equirectangular' },
        coastlinewidth: 2,
        lataxis: { range: [20, 60], showgrid: true, dtick: 10 },
        lonaxis: { range: [-100, 20], showgrid: true, dtick: 20 },
      },
    },
    stage.config,
  );

  const set = (p: string): Promise<void> => relayout(stage.div, { 'geo.projection.type': p });
  if (stage.bar) select(stage.bar, 'geo.projection.type', projections, 'equirectangular', (v) => void set(v));
  if (stage.preview) stage.every(1600, (i) => void set(pick(projections, i)));

  return () => stage.dispose();
};

export default mount;
