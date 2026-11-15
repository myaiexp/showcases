// PolygonLayer style opacity: how see-through the polygons are
import { PolygonLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { regions } from '../../shared/polygon-data.ts';
import { slider } from '../../shared/controls.ts';
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

  const layer = new PolygonLayer().source(regions()).shape('fill').color('#ff6b6b').style({ opacity: 0.6 });
  scene.addLayer(layer);
  if (stage.bar) slider(stage.bar, 'opacity', [0, 1, 0.05], 0.6, (v) => { layer.style({ opacity: v }); scene.render(); });
  else stage.every(70, (i) => { layer.style({ opacity: 0.55 + Math.sin(i / 7) * 0.45 }); scene.render(); });

  return () => stage.dispose();
};

export default mount;
