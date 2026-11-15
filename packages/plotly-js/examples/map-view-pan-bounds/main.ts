// map.bounds limits how far the reader can pan; a dashed outline marks the allowed box
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { relayout } from '../../shared/basic-util.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { darkMapStyle, landLayers } from '../../shared/tiles.ts';

const outline = (w: number, e: number, s: number, n: number): Record<string, unknown> => ({
  sourcetype: 'geojson',
  type: 'line',
  color: '#f59e0b',
  line: { width: 2, dasharray: [2, 2] },
  source: { type: 'Feature', geometry: { type: 'LineString', coordinates: [[w, s], [e, s], [e, n], [w, n], [w, s]] } },
});

const mount: Mount = async (el, ctx) => {
  const land = await landLayers({ detail: '50m' });
  if (ctx.signal.aborted) return () => {};
  const stage = createStage(el, ctx, { height: 500 });
  const box = { w: -125, e: -66, s: 24, n: 50 };
  const layers = (): Record<string, unknown>[] => [...land, outline(box.w, box.e, box.s, box.n)];

  await Plotly.newPlot(
    stage.div,
    [{ type: 'scattermap', mode: 'markers', lon: [-122.4, -73.9, -87.6, -95.4], lat: [37.8, 40.7, 41.9, 29.8], marker: { size: 12, color: '#d62728' } }],
    {
      template: stage.template,
      map: { style: darkMapStyle(), layers: layers() as never, center: { lon: -96, lat: 38 }, zoom: stage.preview ? 2.4 : 3, bounds: { west: box.w, east: box.e, south: box.s, north: box.n } },
      showlegend: false,
      margin: { t: 0, b: 0, l: 0, r: 0 },
    },
    stage.config,
  );

  const apply = (): Promise<void> =>
    relayout(stage.div, { 'map.bounds': { west: box.w, east: box.e, south: box.s, north: box.n }, 'map.layers': layers() });
  if (stage.bar) {
    slider(stage.bar, 'west', [-140, -100, 1], box.w, (v) => void ((box.w = v), apply()));
    slider(stage.bar, 'east', [-100, -50, 1], box.e, (v) => void ((box.e = v), apply()));
    slider(stage.bar, 'south', [10, 35, 1], box.s, (v) => void ((box.s = v), apply()));
    slider(stage.bar, 'north', [40, 60, 1], box.n, (v) => void ((box.n = v), apply()));
  }
  if (stage.preview) stage.every(500, (i) => void ((box.w = -125 + 12 * Math.sin(i / 4)), (box.s = 24 + 6 * Math.cos(i / 5)), apply()));

  return () => stage.dispose();
};

export default mount;
