// new PointLayer({ maskLayers: [template] }): points drawn only inside a polygon
import { PointLayer, PolygonLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { PARSER, disc, rows } from '../../shared/layer-demo.ts';
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

  // The template: any polygon layer. Hidden, it still has to be in the scene to take part.
  const template = new PolygonLayer({ visible: false }).source(disc([10, 47], 5)).shape('fill').color('#ffffff');
  scene.addLayer(template);

  const around = [{ name: 'c', lng: 10, lat: 47, pop: 1, continent: 'Europe' as const }];
  const layer = new PointLayer({ maskLayers: [template], enableMask: true, maskInside: true })
    .source(rows(ctx.preview ? 180 : 400, { around, spread: 7 }), PARSER)
    .shape('circle')
    .size(ctx.preview ? 4 : 5)
    .color('v', ['#2b83ba', '#ffffbf', '#d7191c']);
  scene.addLayer(layer);

  // The template wanders; the mask follows because the stencil is redrawn every frame.
  stage.every(100, (i) => {
    template.setData(disc([10 + Math.cos(i / 15) * 6, 47 + Math.sin(i / 15) * 3], 4.5));
  });

  return () => stage.dispose();
};

export default mount;
