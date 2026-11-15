// PolygonLayer option blend: how a layer mixes with what is under it
import { PolygonLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { regions, cycle } from '../../shared/polygon-data.ts';
import { select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({
      center: [14, 50],
      zoom: ctx.preview ? 1.9 : 3,
    }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);

  const modes = ['normal', 'additive', 'subtractive', 'max'] as const;
  const layer = new PolygonLayer({ blend: 'additive' }).source(regions()).shape('fill').color('type', ['#ff5252', '#40c4ff', '#69f0ae']).style({ opacity: 0.7 });
  scene.addLayer(layer);
  const set = (m: (typeof modes)[number]): void => { layer.setBlend(m); scene.render(); };
  if (stage.bar) select(stage.bar, 'blend', modes, 'additive', set);
  else cycle(stage, scene, modes, 1600, set);

  return () => stage.dispose();
};

export default mount;
