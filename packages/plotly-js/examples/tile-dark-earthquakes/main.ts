// A dark tile map of significant earthquakes: colour and size by magnitude, a floor slider
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { restyle } from '../../shared/basic-util.ts';
import { slider } from '../../shared/controls.ts';
import { earthquakes } from '../../shared/map-kit.ts';
import { createStage } from '../../shared/stage.ts';
import { darkMapStyle, landLayers } from '../../shared/tiles.ts';

// The docs read significant-earthquakes-2015.geojson from maplibre.org; the earthquake table the
// docs use elsewhere (earthquakes-23k.csv) is vendored, so it supplies the points.
const mount: Mount = async (el, ctx) => {
  const [quakes, land] = await Promise.all([earthquakes(), landLayers({ detail: '110m' })]);
  if (ctx.signal.aborted) return () => {};
  const stage = createStage(el, ctx, { height: 480 });
  const keep = (min: number): number[] => quakes.mag.map((m, i) => (m >= min ? i : -1)).filter((i) => i >= 0);
  const cols = (min: number) => {
    const ix = keep(min);
    return { lon: ix.map((i) => quakes.lon[i]!), lat: ix.map((i) => quakes.lat[i]!), mag: ix.map((i) => quakes.mag[i]!) };
  };
  const first = cols(stage.preview ? 6 : 5.5);

  await Plotly.newPlot(
    stage.div,
    [
      {
        type: 'scattermap',
        mode: 'markers',
        lon: first.lon,
        lat: first.lat,
        hoverinfo: 'text',
        text: first.mag.map((m) => `magnitude ${m}`),
        marker: { color: first.mag, colorscale: 'Plasma', cmin: 5.5, cmax: 8.5, size: first.mag.map((m) => (m - 4) * 3), opacity: 0.8, colorbar: { title: { text: 'Mag' }, thickness: 10 } },
      },
    ],
    {
      template: stage.template,
      map: { style: darkMapStyle(), layers: land as never, zoom: 2, center: { lon: -150, lat: 60 } },
      margin: { t: 0, b: 0, l: 0, r: 0 },
    },
    stage.config,
  );

  const filter = (min: number): Promise<void> => {
    const c = cols(min);
    return restyle(stage.div, {
      lon: [c.lon],
      lat: [c.lat],
      text: [c.mag.map((m) => `magnitude ${m}`)],
      'marker.color': [c.mag],
      'marker.size': [c.mag.map((m) => (m - 4) * 3)],
    });
  };
  if (stage.bar) slider(stage.bar, 'Minimum magnitude', [5.5, 8, 0.1], 5.5, (v) => void filter(v));
  if (stage.preview) stage.every(1200, (i) => void filter(5.5 + (i % 6) * 0.4));

  return () => stage.dispose();
};

export default mount;
