// getPickedLayer tells which layer is under the pointer, by id
import { PointLayer, PolygonLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { cityFeatures } from '../../shared/data.ts';
import { valuePanel } from '../../shared/scene-board.ts';
import { createStage } from '../../shared/stage.ts';
import { countries } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [10, 45], zoom: ctx.preview ? 2.2 : 3 }),
  });
  await stage.ready(scene);
  const land = new PolygonLayer({ name: 'countries' }).source(countries).shape('fill').color('#2a3b52').active({ color: '#3f7fa5' });
  const dots = new PointLayer({ name: 'cities' }).source(cityFeatures()).shape('circle').size(10).color('#ffb347').active({ color: '#fff' });
  scene.addLayer(land);
  scene.addLayer(dots);

  const show = valuePanel(stage.container, 'br');
  const names: Record<string, string> = { [land.id]: 'countries', [dots.id]: 'cities' };
  // Picking runs asynchronously after each pointer move, so read the result on a short timer.
  stage.every(200, () => {
    const id = scene.getPickedLayer();
    show({ 'getPickedLayer()': `${id}`, layer: names[String(id)] ?? '(none)' });
  });

  if (stage.preview) {
    const ghost = stage.ghost(scene);
    const spots: [number, number][] = [[2.35, 48.86], [8, 47], [13.4, 52.52], [20, 44], [28.98, 41.01], [-3.7, 40.42], [5, 40]];
    stage.every(700, (i) => ghost.moveTo(spots[i % spots.length]!));
  }

  return () => stage.dispose();
};

export default mount;
