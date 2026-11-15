// HeatmapLayer option blend: how the heat mixes with the map beneath it
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

  const modes = ['normal', 'additive', 'subtractive', 'max'] as const;
  const layer = new HeatmapLayer({ blend: 'additive' }).source(quakes(300), XY).shape('heatmap').size('mag', [0, 1]).style({ intensity: 2, radius: 20, rampColors: RAMP });
  scene.addLayer(layer);
  const set = (m: (typeof modes)[number]): void => { layer.setBlend(m); };
  if (stage.bar) select(stage.bar, 'blend', modes, 'additive', (m) => { set(m); scene.render(); });
  else cycle(stage, scene, modes, 1600, set);

  return () => stage.dispose();
};

export default mount;
