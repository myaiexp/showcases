// PolygonLayer shape('fill'): countries filled with a flat colour
import { PolygonLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { drift, regions } from '../../shared/polygon-data.ts';
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

  const layer = new PolygonLayer().source(regions()).shape('fill').color('#2f81c7').style({ opacity: 0.85 }).active(true);
  scene.addLayer(layer);
  if (stage.preview) drift(stage, scene, [14, 50]);

  return () => stage.dispose();
};

export default mount;
