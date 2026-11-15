// maskOperation on the template layers: overlap ('and') or union ('or') of two polygons
import { PointLayer, PolygonLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { PARSER, disc, rows } from '../../shared/layer-demo.ts';
import { cycle } from '../../shared/point-data.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

const OPS = ['and', 'or'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [10, 47], zoom: ctx.preview ? 3 : 3.8 }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);

  const left = new PolygonLayer({ visible: false, maskOperation: 'and' }).source(disc([5, 47], 4.5)).shape('fill').color('#ffffff');
  const right = new PolygonLayer({ visible: false, maskOperation: 'and' }).source(disc([15, 47], 4.5)).shape('fill').color('#ffffff');
  scene.addLayer(left);
  scene.addLayer(right);
  const around = [{ name: 'c', lng: 10, lat: 47, pop: 1, continent: 'Europe' as const }];
  const layer = new PointLayer({ maskLayers: [left, right] })
    .source(rows(ctx.preview ? 220 : 500, { around, spread: 8 }), PARSER)
    .shape('circle')
    .size(ctx.preview ? 4 : 5)
    .color('#4ecdc4');
  scene.addLayer(layer);

  const set = (op: (typeof OPS)[number]): void => {
    // Each template draws its own stencil, so maskOperation is read from the template layers.
    left.updateLayerConfig({ maskOperation: op });
    right.updateLayerConfig({ maskOperation: op });
    scene.render();
  };
  if (stage.bar) select(stage.bar, 'maskOperation', OPS, 'and', set);
  else cycle(stage, scene, OPS, 1500, set);

  return () => stage.dispose();
};

export default mount;
