// HeatmapLayer size(field, [0, 1]): the weight each point adds to the heat
import { HeatmapLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { RAMP, XY, quakes } from '../../shared/heatmap-data.ts';
import { cycle } from '../../shared/polygon-data.ts';
import { toggle } from '../../shared/controls.ts';
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

  const data = quakes(300);
  const layer = new HeatmapLayer().source(data, XY).shape('heatmap').size('mag', [0, 1]).style({ intensity: 2, radius: 20, rampColors: RAMP });
  scene.addLayer(layer);
  const set = (weighted: boolean): void => { if (weighted) layer.size('mag', [0, 1]); else layer.size(0.5); };
  if (stage.bar) toggle(stage.bar, "weight by 'mag'", true, (v) => { set(v); scene.render(); });
  else cycle(stage, scene, [true, false], 1800, set);

  return () => stage.dispose();
};

export default mount;
