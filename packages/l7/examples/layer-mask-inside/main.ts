// maskInside: true keeps the inside of the template, false keeps everything outside it
import { PointLayer, PolygonLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { PARSER, disc, rows } from '../../shared/layer-demo.ts';
import { cycle } from '../../shared/point-data.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [10, 47], zoom: ctx.preview ? 3 : 3.8 }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);

  const template = new PolygonLayer({ visible: false }).source(disc([10, 47], 5)).shape('fill').color('#ffffff');
  scene.addLayer(template);
  const around = [{ name: 'c', lng: 10, lat: 47, pop: 1, continent: 'Europe' as const }];
  const layer = new PointLayer({ maskLayers: [template], maskInside: true })
    .source(rows(ctx.preview ? 180 : 400, { around, spread: 7 }), PARSER)
    .shape('circle')
    .size(ctx.preview ? 4 : 5)
    .color('#ffd166');
  scene.addLayer(layer);

  const set = (inside: boolean): void => {
    layer.updateLayerConfig({ maskInside: inside });
    scene.render();
  };
  if (stage.bar) toggle(stage.bar, 'maskInside', true, set);
  else cycle(stage, scene, [true, false], 1500, set);

  return () => stage.dispose();
};

export default mount;
