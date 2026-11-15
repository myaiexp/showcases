// PolygonLayer option enablePropagation: pointer events reach layers below
import { PolygonLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { regions } from '../../shared/polygon-data.ts';
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

  const under = new PolygonLayer({ name: 'under' }).source(regions()).shape('fill').color('#42a5f5').active(true);
  const over = new PolygonLayer({ name: 'over', enablePropagation: true }).source(regions()).shape('fill').color('#ef5350').style({ opacity: 0.5 }).active(true);
  scene.addLayer(under);
  scene.addLayer(over);
  const out = stage.readout();
  const hits = new Set<string>();
  for (const [name, layer] of [['under', under], ['over', over]] as const) {
    layer.on('mousemove', () => {
      hits.add(name);
      if (out) out.textContent = `events reached: ${[...hits].join(', ')}`;
    });
  }
  if (stage.bar) toggle(stage.bar, 'enablePropagation on the top layer', true, (v) => { over.updateLayerConfig({ enablePropagation: v }); hits.clear(); });
  else {
    const ghost = stage.ghost(scene);
    stage.every(300, (i) => ghost.moveTo([4 + (i % 20) * 1.8, 42 + (i % 7) * 2.2]));
  }

  return () => stage.dispose();
};

export default mount;
