// densitymap zmin, zmax and opacity: clip the weights the colorscale spans, fade the layer
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { restyle } from '../../shared/basic-util.ts';
import { slider } from '../../shared/controls.ts';
import { earthquakes } from '../../shared/map-kit.ts';
import { createStage } from '../../shared/stage.ts';
import { darkMapStyle, landLayers } from '../../shared/tiles.ts';

const mount: Mount = async (el, ctx) => {
  const [quakes, layers] = await Promise.all([earthquakes(ctx.preview ? 6 : 2), landLayers({ detail: '110m' })]);
  if (ctx.signal.aborted) return () => {};
  const stage = createStage(el, ctx, { height: 480 });

  await Plotly.newPlot(
    stage.div,
    [{ type: 'densitymap', lon: quakes.lon, lat: quakes.lat, z: quakes.mag, radius: 8, zmin: 5.5, zmax: 8, colorscale: 'Portland', opacity: 0.9, colorbar: { thickness: 12 } }],
    {
      template: stage.template,
      map: { style: darkMapStyle(), layers: layers as never, center: { lon: 140, lat: 20 }, zoom: 1.5 },
      margin: { t: 0, b: 0, l: 0, r: 0 },
    },
    stage.config,
  );

  const set = (u: Record<string, unknown>): Promise<void> => restyle(stage.div, u);
  if (stage.bar) {
    slider(stage.bar, 'zmin', [5, 8, 0.1], 5.5, (v) => void set({ zmin: v }));
    slider(stage.bar, 'zmax', [5.5, 9, 0.1], 8, (v) => void set({ zmax: v }));
    slider(stage.bar, 'opacity', [0.1, 1, 0.05], 0.9, (v) => void set({ opacity: v }));
  }
  if (stage.preview) stage.every(500, (i) => void set({ zmax: 6.2 + 1.8 * (1 + Math.sin(i / 4)) / 2, zmin: 5.5 }));

  return () => stage.dispose();
};

export default mount;
