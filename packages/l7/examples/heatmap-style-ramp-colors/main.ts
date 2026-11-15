// HeatmapLayer style rampColors: the colour band the intensity is mapped through
import { HeatmapLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { RAMP, XY, quakes } from '../../shared/heatmap-data.ts';
import { cycle } from '../../shared/polygon-data.ts';
import { select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({
      center: [10, 48],
      zoom: ctx.preview ? 2.5 : 3.5,
    }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);

  const ramps = {
    tutorial: RAMP,
    fire: { colors: ['#000004', '#51127c', '#b73779', '#fc8961', '#fcfdbf'], positions: [0, 0.25, 0.5, 0.75, 1] },
    ice: { colors: ['#0b1d51', '#1f5fa6', '#6cb7d9', '#ffffff'], positions: [0, 0.3, 0.7, 1] },
    'two-tone': { colors: ['#2c3e50', '#2c3e50', '#ff6b6b', '#ff6b6b'], positions: [0, 0.5, 0.5, 1] },
  };
  const names = Object.keys(ramps) as (keyof typeof ramps)[];
  const layer = new HeatmapLayer().source(quakes(300), XY).shape('heatmap').size('mag', [0, 1]).style({ intensity: 2, radius: 20, rampColors: RAMP });
  scene.addLayer(layer);
  const set = (n: keyof typeof ramps): void => { layer.style({ rampColors: ramps[n] }); };
  if (stage.bar) select(stage.bar, 'rampColors', names, 'tutorial', (n) => { set(n); scene.render(); });
  else cycle(stage, scene, names, 1500, set);

  return () => stage.dispose();
};

export default mount;
