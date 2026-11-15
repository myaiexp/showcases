// PolygonLayer option zIndex: which of two overlapping layers is drawn on top
import { PolygonLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { regions, cycle } from '../../shared/polygon-data.ts';
import { toggle } from '../../shared/controls.ts';
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

  const red = new PolygonLayer({ zIndex: 1 }).source(regions()).shape('fill').color('#ef5350');
  const blue = new PolygonLayer({ zIndex: 0 }).source(regions(['Germany', 'France', 'Poland', 'Spain', 'Italy', 'Romania'])).shape('fill').color('#42a5f5');
  scene.addLayer(red);
  scene.addLayer(blue);
  const set = (redOnTop: boolean): void => { red.setIndex(redOnTop ? 1 : 0); blue.setIndex(redOnTop ? 0 : 1); };
  if (stage.bar) toggle(stage.bar, 'red layer on top', true, (v) => { set(v); scene.render(); });
  else cycle(stage, scene, [true, false], 1500, set);

  return () => stage.dispose();
};

export default mount;
