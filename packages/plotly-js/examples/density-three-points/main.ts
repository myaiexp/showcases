// densitymap with three weighted points: the radius slider grows each blob
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { restyle } from '../../shared/basic-util.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { darkMapStyle, landLayers } from '../../shared/tiles.ts';

const mount: Mount = async (el, ctx) => {
  const layers = await landLayers({ detail: '110m' });
  if (ctx.signal.aborted) return () => {};
  const stage = createStage(el, ctx, { height: 460 });

  await Plotly.newPlot(
    stage.div,
    [{ type: 'densitymap', lon: [10, 20, 30], lat: [15, 25, 35], z: [1, 3, 2], radius: 30 }],
    {
      template: stage.template,
      // the docs give map.style a Carto style URL; a blank style object keeps this offline
      map: { style: darkMapStyle(), layers: layers as never, center: { lon: 20, lat: 25 }, zoom: 2.2 },
      margin: { t: 0, b: 0, l: 0, r: 0 },
    },
    stage.config,
  );

  const radius = (r: number): Promise<void> => restyle(stage.div, { radius: r });
  if (stage.bar) slider(stage.bar, 'radius', [1, 120, 1], 30, (v) => void radius(v));
  if (stage.preview) stage.every(250, (i) => void radius(15 + 45 * (1 + Math.sin(i / 5))));

  return () => stage.dispose();
};

export default mount;
