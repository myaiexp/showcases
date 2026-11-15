// densitymap of 23,000 earthquakes weighted by magnitude, with a shared coloraxis colorscale
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { pick, relayout } from '../../shared/basic-util.ts';
import { select } from '../../shared/controls.ts';
import { earthquakes } from '../../shared/map-kit.ts';
import { createStage } from '../../shared/stage.ts';
import { darkMapStyle, landLayers } from '../../shared/tiles.ts';

const scales = ['Viridis', 'Plasma', 'Inferno', 'Cividis', 'Hot', 'Jet', 'Blues'] as const;

const mount: Mount = async (el, ctx) => {
  const [quakes, layers] = await Promise.all([earthquakes(ctx.preview ? 6 : 1), landLayers({ detail: '110m' })]);
  if (ctx.signal.aborted) return () => {};
  const stage = createStage(el, ctx, { height: 480 });

  await Plotly.newPlot(
    stage.div,
    [{ type: 'densitymap', lon: quakes.lon, lat: quakes.lat, radius: 10, z: quakes.mag, coloraxis: 'coloraxis', hoverinfo: 'skip' }],
    {
      template: stage.template,
      map: { center: { lon: 60, lat: 30 }, style: darkMapStyle(), layers: layers as never, zoom: 1.6 },
      coloraxis: { colorscale: 'Viridis', colorbar: { thickness: 12 } },
      title: { text: stage.preview ? '' : 'Earthquake Magnitude' },
      margin: stage.preview ? { t: 0, b: 0, l: 0, r: 0 } : { t: 40, b: 0, l: 0, r: 0 },
    },
    stage.config,
  );

  const set = (v: string): Promise<void> => relayout(stage.div, { 'coloraxis.colorscale': v });
  if (stage.bar) select(stage.bar, 'coloraxis.colorscale', scales, 'Viridis', (v) => void set(v));
  if (stage.preview) stage.every(1500, (i) => void set(pick(scales, i)));

  return () => stage.dispose();
};

export default mount;
