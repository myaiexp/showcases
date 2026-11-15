// A Scene on L7's own Map engine: no tiles, no token, cities as bubbles on a world outline
import { PointLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { cityFeatures } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  // Map is L7's own map engine: it draws nothing itself and loads no tiles or token.
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({
      center: [40, 20],
      zoom: ctx.preview ? 0.2 : 1.2,
      minZoom: 0,
      maxZoom: 18,
    }),
  });
  await stage.ready(scene);

  for (const layer of worldLayers()) scene.addLayer(layer);
  const cities = new PointLayer()
    .source(cityFeatures())
    .shape('circle')
    .size('pop', [3, 16])
    .color('#ffb347')
    .style({ opacity: 0.8, stroke: '#fff', strokeWidth: 1 });
  scene.addLayer(cities);

  // Cards have no pointer, so the map pans itself.
  if (ctx.preview) stage.every(60, (i) => scene.setCenter([40 + Math.sin(i / 60) * 60, 20]));

  return () => stage.dispose();
};

export default mount;
