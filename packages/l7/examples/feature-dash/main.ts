// Layer feature dash: dashed lines coloured by a category field
import { LineLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { paths, sweep } from '../../shared/line-data.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({
      center: [12,50],
      zoom: ctx.preview ? 2.3 : 3.3,
    }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);

  const layer = new LineLayer()
    .source(paths([10, 48], { n: 9, step: 1.1 }))
    .size(1.5)
    .shape('line')
    .color('type', ['#5B8FF9', '#5CCEA1', '#F6BD16'])
    .active(true)
    .style({ lineType: 'dash', dashArray: [5, 5] });
  scene.addLayer(layer);
  if (stage.bar) {
    let dash: [number, number] = [5, 5];
    slider(stage.bar, 'len1', [1, 15, 1], 5, (v) => { dash = [v, dash[1]]; layer.style({ dashArray: dash }); scene.render(); });
    slider(stage.bar, 'len2', [1, 15, 1], 5, (v) => { dash = [dash[0], v]; layer.style({ dashArray: dash }); scene.render(); });
  } else sweep(stage, 300, (i) => { layer.style({ dashArray: [2 + (i % 10), 5] }); scene.render(); });

  return () => stage.dispose();
};

export default mount;
