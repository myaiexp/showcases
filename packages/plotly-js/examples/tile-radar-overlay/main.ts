// A translucent GeoJSON layer above the traces, standing in for a radar overlay that drifts east
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { relayout } from '../../shared/basic-util.ts';
import { slider } from '../../shared/controls.ts';
import { precipitation } from '../../shared/map-kit.ts';
import { createStage } from '../../shared/stage.ts';
import { rng } from '../../shared/stat-data.ts';
import { darkMapStyle, landLayers } from '../../shared/tiles.ts';

// The docs add a WMS radar from Environment Canada (raster tiles on a URL). Raster URLs can't load
// offline, so seeded storm cells drawn as GeoJSON polygons play the same role: a layer ABOVE the traces.
const cells = (() => {
  const r = rng(11);
  return Array.from({ length: 9 }, () => ({ lon: -112 + r() * 28, lat: 30 + r() * 15, rx: 1.2 + r() * 2.2, ry: 0.8 + r() * 1.6, ph: r() * 6 }));
})();

function radar(frame: number): object {
  return {
    type: 'FeatureCollection',
    features: cells.map((c) => {
      const cx = c.lon + frame * 0.35;
      const ring = Array.from({ length: 25 }, (_, k) => {
        const a = (k / 24) * Math.PI * 2;
        const w = 1 + 0.25 * Math.sin(3 * a + c.ph + frame * 0.2);
        return [cx + Math.cos(a) * c.rx * w, c.lat + Math.sin(a) * c.ry * w];
      });
      return { type: 'Feature', properties: {}, geometry: { type: 'Polygon', coordinates: [ring] } };
    }),
  };
}

const mount: Mount = async (el, ctx) => {
  const [land, rain] = await Promise.all([landLayers({ detail: '110m' }), precipitation()]);
  if (ctx.signal.aborted) return () => {};
  const stage = createStage(el, ctx, { height: 480 });
  const overlay = { sourcetype: 'geojson', source: radar(0), type: 'fill', color: '#38bdf8', opacity: 0.4 };

  await Plotly.newPlot(
    stage.div,
    [{ type: 'scattermap', mode: 'markers', lon: rain.lon, lat: rain.lat, marker: { color: 'fuchsia', size: 4 }, text: rain.z.map(String) }],
    {
      template: stage.template,
      margin: { r: 0, t: 0, b: 0, l: 0 },
      showlegend: false,
      // land is below the traces; the overlay has no `below`, so it draws above them
      map: { style: darkMapStyle(), layers: [...land, overlay] as never, center: { lat: 38, lon: -95 }, zoom: stage.preview ? 2.4 : 3.4 },
    },
    stage.config,
  );

  const show = (f: number): Promise<void> => relayout(stage.div, { 'map.layers[2].source': radar(f) });
  let frame = 0;
  const input = stage.bar ? slider(stage.bar, 'Frame', [0, 40, 1], 0, (v) => ((frame = v), void show(v))) : null;
  stage.every(stage.preview ? 500 : 900, () => {
    frame = (frame + 1) % 41;
    if (input) input.value = String(frame);
    input?.dispatchEvent(new Event('input'));
    if (!input) void show(frame);
  });

  return () => stage.dispose();
};

export default mount;
