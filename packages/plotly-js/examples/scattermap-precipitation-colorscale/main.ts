// scattermap points coloured by rainfall: marker.colorscale, cmin/cmax and reversescale on a tile map
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { pick, restyle } from '../../shared/basic-util.ts';
import { select, toggle } from '../../shared/controls.ts';
import { precipitation } from '../../shared/map-kit.ts';
import { createStage } from '../../shared/stage.ts';
import { darkMapStyle, landLayers } from '../../shared/tiles.ts';

const custom: [number, string][] = [[0, 'rgb(150,0,90)'], [0.125, 'rgb(0, 0, 200)'], [0.25, 'rgb(0, 25, 255)'], [0.375, 'rgb(0, 152, 255)'], [0.5, 'rgb(44, 255, 150)'], [0.625, 'rgb(151, 255, 0)'], [0.75, 'rgb(255, 234, 0)'], [0.875, 'rgb(255, 111, 0)'], [1, 'rgb(255, 0, 0)']];
const names = ['docs rainbow', 'Viridis', 'Blues', 'Portland', 'Electric', 'Cividis'] as const;

const mount: Mount = async (el, ctx) => {
  const [rain, land] = await Promise.all([precipitation(), landLayers({ detail: '110m' })]);
  if (ctx.signal.aborted) return () => {};
  const stage = createStage(el, ctx, { height: 500 });

  await Plotly.newPlot(
    stage.div,
    [
      {
        type: 'scattermap',
        mode: 'markers',
        text: rain.z.map(String),
        lon: rain.lon,
        lat: rain.lat,
        marker: {
          color: rain.z,
          colorscale: custom,
          cmin: 0,
          cmax: 1.4,
          reversescale: true,
          opacity: 0.5,
          size: 3,
          colorbar: { thickness: 10, title: { side: 'right' }, outlinecolor: 'rgba(68,68,68,0)', ticks: 'outside', ticklen: 3, ticksuffix: ' in', showticksuffix: 'last', dtick: 0.1 },
        },
        name: 'NA Precipitation',
      },
    ],
    {
      template: stage.template,
      dragmode: 'zoom',
      // the docs use style 'light' (tiles); a blank style plus land layers stands in
      map: { center: { lat: 38.03697222, lon: -90.70916722 }, domain: { x: [0, 1], y: [0, 1] }, style: darkMapStyle(), layers: land as never, zoom: stage.preview ? 2.2 : 3 },
      margin: { r: 0, t: 0, b: 0, l: 0, pad: 0 },
      showlegend: false,
    },
    stage.config,
  );

  const scale = (n: string): Promise<void> => restyle(stage.div, { 'marker.colorscale': n === 'docs rainbow' ? [custom] : n });
  if (stage.bar) {
    select(stage.bar, 'marker.colorscale', names, 'docs rainbow', (v) => void scale(v));
    toggle(stage.bar, 'reversescale', true, (v) => void restyle(stage.div, { 'marker.reversescale': v }));
  }
  if (stage.preview) stage.every(1400, (i) => void scale(pick(names, i)));

  return () => stage.dispose();
};

export default mount;
