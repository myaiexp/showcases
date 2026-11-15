// LineLayer option enablePropagation: Layer option enablePropagation
import { LineLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { PARSER, rows } from '../../shared/line-data.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({
      center: [15,25],
      zoom: ctx.preview ? 0.2 : 1.2,
    }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);

  const under = new LineLayer({ name: 'under' }).source(rows('Paris', 12), PARSER).shape('arc').size(6).color('#42a5f5').active(true);
  const over = new LineLayer({ name: 'over', enablePropagation: true }).source(rows('Paris', 12), PARSER).shape('arc').size(6).color('#ef5350').style({ opacity: 0.5 }).active(true);
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
  if (stage.bar) toggle(stage.bar, 'enablePropagation on top layer', true, (v) => { over.updateLayerConfig({ enablePropagation: v }); hits.clear(); });
  else {
    const ghost = stage.ghost(scene);
    stage.every(300, (i) => ghost.moveTo([-20 + (i % 24) * 3, 20 + (i % 7) * 4]));
  }

  return () => stage.dispose();
};

export default mount;
