// layer.disableMask() and layer.enableMask(): the cut on and off, template kept
import { PointLayer, PolygonLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
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

  const template = new PolygonLayer({ visible: false }).source(disc([10, 47], 5)).shape('fill').color('#ffffff');
  scene.addLayer(template);
  const around = [{ name: 'c', lng: 10, lat: 47, pop: 1, continent: 'Europe' as const }];
  const layer = new PointLayer({ maskLayers: [template] })
    .source(rows(ctx.preview ? 220 : 500, { around, spread: 8 }), PARSER)
    .shape('circle')
    .size(ctx.preview ? 4 : 5)
    .color('#ff6b6b');
  scene.addLayer(layer);

  // L7 latches the layer's `mask` flag when it initialises. disableMask() alone leaves it set, so the
  // layer is still tested against a stencil nobody draws and vanishes: clear the flag with it.
  let clearFlag = true;
  let on = true;
  const apply = (): void => {
    if (on) {
      layer.enableMask();
      layer.updateLayerConfig({ mask: true });
    } else {
      layer.disableMask();
      if (clearFlag) layer.updateLayerConfig({ mask: false });
    }
    scene.render();
  };
  if (stage.bar) {
    toggle(stage.bar, 'mask enabled', true, (v) => ((on = v), apply()));
    toggle(stage.bar, 'also clear config.mask', true, (v) => ((clearFlag = v), apply()));
  } else {
    layer.on('inited', () => stage.every(1400, (i) => ((on = i % 2 === 0), apply())));
  }

  return () => stage.dispose();
};

export default mount;
