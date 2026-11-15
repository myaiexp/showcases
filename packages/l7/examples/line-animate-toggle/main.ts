// LineLayer animate(true) and animate(false) toggle the flowing trail
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

  const layer = new LineLayer().source(rows('Paris', 12), PARSER).shape('arc').size(2).color('#ff8a65').animate(true);
  scene.addLayer(layer);
  if (stage.bar) toggle(stage.bar, 'animate', true, (on) => layer.animate(on));

  return () => stage.dispose();
};

export default mount;
