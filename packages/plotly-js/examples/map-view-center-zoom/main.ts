// An explicit tile map view: map.center, zoom, bearing and pitch opt out of auto-fitting
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { relayout } from '../../shared/basic-util.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { darkMapStyle, landLayers } from '../../shared/tiles.ts';

const mount: Mount = async (el, ctx) => {
  const land = await landLayers({ detail: '50m' });
  if (ctx.signal.aborted) return () => {};
  const stage = createStage(el, ctx, { height: 500 });

  // The docs label the three cities with text; no glyphs offline, so the names are hover text.
  await Plotly.newPlot(
    stage.div,
    [
      {
        type: 'scattermap',
        mode: 'markers',
        lon: [-122.4, -73.9, -87.6],
        lat: [37.8, 40.7, 41.9],
        hoverinfo: 'text',
        text: ['San Francisco', 'New York', 'Chicago'],
        marker: { size: 12, color: '#d62728' },
      },
    ],
    {
      template: stage.template,
      map: { style: darkMapStyle(), layers: land as never, center: { lon: -98, lat: 39 }, zoom: 2.5, bearing: 0, pitch: 0 },
      showlegend: false,
      margin: { t: 0, b: 0, l: 0, r: 0 },
    },
    stage.config,
  );

  const view = (lon: number, lat: number, zoom: number, bearing = 0, pitch = 0): Promise<void> =>
    relayout(stage.div, { 'map.center': { lon, lat }, 'map.zoom': zoom, 'map.bearing': bearing, 'map.pitch': pitch });
  if (stage.bar) {
    const v = { lon: -98, lat: 39, zoom: 2.5, bearing: 0, pitch: 0 };
    const go = (): Promise<void> => view(v.lon, v.lat, v.zoom, v.bearing, v.pitch);
    slider(stage.bar, 'center lon', [-130, -60, 1], v.lon, (x) => void ((v.lon = x), go()));
    slider(stage.bar, 'center lat', [20, 55, 1], v.lat, (x) => void ((v.lat = x), go()));
    slider(stage.bar, 'zoom', [1, 8, 0.1], v.zoom, (x) => void ((v.zoom = x), go()));
    slider(stage.bar, 'bearing', [-180, 180, 5], v.bearing, (x) => void ((v.bearing = x), go()));
    slider(stage.bar, 'pitch', [0, 60, 5], v.pitch, (x) => void ((v.pitch = x), go()));
  }
  if (stage.preview) stage.every(250, (i) => void view(-98 + 6 * Math.sin(i / 12), 39, 2.2 + 0.6 * Math.sin(i / 8), i * 3, 35));

  return () => stage.dispose();
};

export default mount;
