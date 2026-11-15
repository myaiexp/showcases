// Two densitymap traces, each with its own colorbar; one weighted by z, one with per-point radii
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { restyle } from '../../shared/basic-util.ts';
import { toggle } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { darkMapStyle, landLayers } from '../../shared/tiles.ts';

const mount: Mount = async (el, ctx) => {
  const layers = await landLayers({ detail: '110m' });
  if (ctx.signal.aborted) return () => {};
  const stage = createStage(el, ctx, { height: 460 });

  await Plotly.newPlot(
    stage.div,
    [
      { type: 'densitymap', name: 'east', lon: [10, 20, 30], lat: [15, 25, 35], z: [1, 3, 2], radius: 50, colorbar: { y: 1, yanchor: 'top', len: 0.45, thickness: 10 } },
      { type: 'densitymap', name: 'west', lon: [-10, -20, -30], lat: [15, 25, 35], radius: [50, 100, 10], colorbar: { y: 0, yanchor: 'bottom', len: 0.45, thickness: 10 } },
    ],
    {
      template: stage.template,
      map: { style: darkMapStyle(), layers: layers as never, center: { lat: 20, lon: 0 }, zoom: 1.6 },
      margin: { t: 0, b: 0, l: 0, r: 0 },
    },
    stage.config,
  );

  const vis = (i: number, on: boolean): Promise<void> => restyle(stage.div, { visible: on }, i);
  if (stage.bar) {
    toggle(stage.bar, 'east', true, (v) => void vis(0, v));
    toggle(stage.bar, 'west', true, (v) => void vis(1, v));
  }
  if (stage.preview) stage.every(1300, (i) => void restyle(stage.div, { radius: [i % 2 ? 90 : 50] }, 0));

  return () => stage.dispose();
};

export default mount;
