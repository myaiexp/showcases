// PolygonLayer fill style opacityLinear: polygons fade in or out from their centres
import { PolygonLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { cycle, regions } from '../../shared/polygon-data.ts';
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

  const modes = ['in', 'out', 'off'] as const;
  const layer = new PolygonLayer().source(regions()).shape('fill').color('#ff6b6b');
  scene.addLayer(layer);
  const set = (m: (typeof modes)[number]): void => {
    layer.style({ opacityLinear: { enable: m !== 'off', dir: m === 'off' ? 'in' : m } });
  };
  set('in');
  if (stage.bar) select(stage.bar, 'dir', modes, 'in', (m) => { set(m); scene.render(); });
  else cycle(stage, scene, modes, 1800, set);

  return () => stage.dispose();
};

export default mount;
