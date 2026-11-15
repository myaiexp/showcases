// layer.addMask(template) and layer.removeMask(template) on a live layer
import { PointLayer, PolygonLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
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

  const west = new PolygonLayer({ visible: false, maskOperation: 'or' }).source(disc([5, 47], 3.4)).shape('fill').color('#ffffff');
  const east = new PolygonLayer({ visible: false, maskOperation: 'or' }).source(disc([15, 47], 3.4)).shape('fill').color('#ffffff');
  // 'or' on the templates: with both discs on, the layer shows the union of the two.
  scene.addLayer(west);
  scene.addLayer(east);
  const around = [{ name: 'c', lng: 10, lat: 47, pop: 1, continent: 'Europe' as const }];
  const layer = new PointLayer({ maskLayers: [west] })
    .source(rows(ctx.preview ? 220 : 500, { around, spread: 9 }), PARSER)
    .shape('circle')
    .size(ctx.preview ? 4 : 5)
    .color('#ffd166');
  scene.addLayer(layer);

  const on = { west: true, east: false };
  const flip = (name: 'west' | 'east'): void => {
    const mask = name === 'west' ? west : east;
    if (on[name]) layer.removeMask(mask);
    else layer.addMask(mask);
    on[name] = !on[name];
    // The layer latches its `mask` flag at init: with no template left it would vanish, so follow the count.
    layer.updateLayerConfig({ mask: on.west || on.east });
    scene.render();
    const out = stage.readout();
    if (out) out.textContent = `masks on the layer: ${Object.entries(on).filter(([, v]) => v).map(([k]) => k).join(', ') || 'none'}`;
  };
  if (stage.bar) {
    button(stage.bar, 'toggle west disc', () => flip('west'));
    button(stage.bar, 'toggle east disc', () => flip('east'));
  } else layer.on('inited', () => stage.every(1200, (i) => flip(i % 2 ? 'east' : 'west')));

  return () => stage.dispose();
};

export default mount;
