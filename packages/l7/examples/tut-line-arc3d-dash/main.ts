// Tutorial arc3d: lineType dash and dashArray
import { LineLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { PARSER, rows } from '../../shared/line-data.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({
      center: [20,30],
      zoom: ctx.preview ? 0.5 : 1.8,
      pitch: 55,
    }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);

  const layer = new LineLayer().source(rows('Singapore', 14), PARSER).size(2).shape('arc3d').color('#ffd166').style({ lineType: 'dash', dashArray: [5, 5] });
  scene.addLayer(layer);
  if (stage.bar) slider(stage.bar, 'gap', [1, 20, 1], 5, (v) => { layer.style({ dashArray: [5, v] }); scene.render(); });
  else stage.frame((t) => scene.setRotation(Math.sin(t / 2.5) * 40));

  return () => stage.dispose();
};

export default mount;
