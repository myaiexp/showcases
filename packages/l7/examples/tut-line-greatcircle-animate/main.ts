// Tutorial greatcircle: animate, gradient and dash on the route
import { LineLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { PARSER, rows, NO_DATELINE } from '../../shared/line-data.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({
      center: [10,35],
      zoom: ctx.preview ? 0.3 : 1.5,
    }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);

  const layer = new LineLayer()
    .source(rows('Paris', 14, NO_DATELINE), PARSER)
    .size(2)
    .shape('greatcircle')
    .style({ sourceColor: '#ffd166', targetColor: '#ef5350' })
    .animate({ duration: 4, interval: 0.3, trailLength: 0.5 });
  scene.addLayer(layer);
  const set = (dash: boolean): void => { layer.style({ lineType: dash ? 'dash' : 'solid', dashArray: [5, 5] }); scene.render(); };
  if (stage.bar) toggle(stage.bar, 'dashed', false, set);
  else stage.every(2500, (i) => set(i % 2 === 1));

  return () => stage.dispose();
};

export default mount;
