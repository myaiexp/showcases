// PolygonLayer options name and visible: swap layers found by name
import { PolygonLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { regions } from '../../shared/polygon-data.ts';
import { button } from '../../shared/controls.ts';
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

  const north = regions(['Norway', 'Sweden', 'Finland', 'Denmark', 'Estonia', 'Latvia', 'Lithuania', 'Poland', 'Germany']);
  const south = regions(['Spain', 'Portugal', 'France', 'Italy', 'Greece', 'Croatia', 'Serbia', 'Bulgaria', 'Romania']);
  scene.addLayer(new PolygonLayer({ name: 'north' }).source(north).shape('fill').color('#4fc3f7'));
  scene.addLayer(new PolygonLayer({ name: 'south', visible: false }).source(south).shape('fill').color('#ff8a65'));
  const swap = (): void => {
    const a = scene.getLayerByName('north');
    const b = scene.getLayerByName('south');
    if (!a || !b) return;
    if (a.isVisible()) { a.hide(); b.show(); } else { b.hide(); a.show(); }
  };
  if (stage.bar) button(stage.bar, 'swap layers by name', swap);
  else stage.every(1500, swap);

  return () => stage.dispose();
};

export default mount;
