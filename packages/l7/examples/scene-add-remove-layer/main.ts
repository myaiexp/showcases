// addLayer, removeLayer and getLayerByName: three named layers come and go
import { type ILayer, LineLayer, PointLayer, PolygonLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { cityFeatures, routeFeatures, routesFrom } from '../../shared/data.ts';
import { valuePanel } from '../../shared/scene-board.ts';
import { createStage } from '../../shared/stage.ts';
import { countries } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [30, 25], zoom: ctx.preview ? 0.4 : 1.2 }),
  });
  await stage.ready(scene);

  // Each layer gets a name, so it can be found again with scene.getLayerByName.
  const make: Record<string, () => ILayer> = {
    land: () => new PolygonLayer({ name: 'land' }).source(countries).shape('fill').color('#2a3b52'),
    routes: () =>
      new LineLayer({ name: 'routes' }).source(routeFeatures(routesFrom('Dubai'))).shape('arc').size(1).color('#7fdbff'),
    cities: () => new PointLayer({ name: 'cities' }).source(cityFeatures()).shape('circle').size(5).color('#ffb347'),
  };
  const show = valuePanel(stage.container);
  const report = (): void =>
    show({ 'scene.getLayers()': scene.getLayers().map((l) => l.name).join(', ') || '(none)' });

  const toggle = (name: string): void => {
    const existing = scene.getLayerByName(name);
    if (existing) scene.removeLayer(existing); // removing also destroys the layer
    else scene.addLayer(make[name]!());
    report();
  };
  for (const name of Object.keys(make)) toggle(name);

  if (stage.bar) for (const name of Object.keys(make)) button(stage.bar, `Toggle ${name}`, () => toggle(name));
  if (stage.preview) {
    const order = ['cities', 'routes', 'cities', 'land', 'routes', 'land'];
    stage.every(1100, (i) => toggle(order[i % order.length]!));
  }

  return () => stage.dispose();
};

export default mount;
