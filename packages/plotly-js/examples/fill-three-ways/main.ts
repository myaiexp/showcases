// The three ways to fill an area on a tile map in one figure: scattermap fill, a GeoJSON layer, a choroplethmap
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { restyle, relayout } from '../../shared/basic-util.ts';
import { toggle } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { darkMapStyle, landLayers, usStatesGeoJSON } from '../../shared/tiles.ts';

const box = (w: number, s: number, e: number, n: number): number[][] => [[w, s], [e, s], [e, n], [w, n], [w, s]];

const mount: Mount = async (el, ctx) => {
  const [states, land] = await Promise.all([usStatesGeoJSON(), landLayers({ detail: '110m' })]);
  if (ctx.signal.aborted) return () => {};
  const stage = createStage(el, ctx, { height: 480 });
  const geojsonLayer = {
    sourcetype: 'geojson',
    type: 'fill',
    color: '#34d399',
    opacity: 0.5,
    source: { type: 'Feature', geometry: { type: 'Polygon', coordinates: [box(-120, 30, -108, 40)] } },
  };

  await Plotly.newPlot(
    stage.div,
    [
      // 1. a scattermap trace with fill 'toself'
      { type: 'scattermap', mode: 'lines', name: 'scattermap fill', fill: 'toself', fillcolor: 'rgba(251,146,60,0.45)', line: { color: '#fb923c' }, lon: [-104, -92, -92, -104, -104], lat: [28, 28, 38, 38, 28] },
      // 3. a choroplethmap trace
      { type: 'choroplethmap', name: 'choroplethmap', geojson: states as never, locations: ['NY', 'PA', 'OH', 'MI'], z: [1, 2, 3, 4], colorscale: 'Blues', showscale: false },
    ],
    {
      template: stage.template,
      showlegend: false,
      map: { style: darkMapStyle(), layers: [...land, geojsonLayer] as never, center: { lon: -98, lat: 38 }, zoom: stage.preview ? 2.4 : 3.2 },
      margin: { t: 0, b: 0, l: 0, r: 0 },
    },
    stage.config,
  );

  const vis = (i: number, on: boolean): Promise<void> => restyle(stage.div, { visible: on }, i);
  // the GeoJSON layer is map.layers[2] (after the two land layers); an opacity of 0 hides it
  const geo = (on: boolean): Promise<void> => relayout(stage.div, { 'map.layers[2].opacity': on ? 0.5 : 0 });
  if (stage.bar) {
    toggle(stage.bar, 'scattermap fill (orange)', true, (v) => void vis(0, v));
    toggle(stage.bar, 'GeoJSON layer (green)', true, (v) => void geo(v));
    toggle(stage.bar, 'choroplethmap (blue)', true, (v) => void vis(1, v));
  }
  if (stage.preview) {
    stage.every(900, (i) => {
      void vis(0, i % 3 !== 1);
      void geo(i % 3 !== 2);
      void vis(1, i % 3 !== 0);
    });
  }

  return () => stage.dispose();
};

export default mount;
