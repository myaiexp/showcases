// LineLayer style linearDir: gradient along or across the line
import { LineLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
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

  const dirs = ['vertical', 'horizontal'] as const;
  const layer = new LineLayer()
    .source(paths([10, 48], { n: 7, step: 1.1 }))
    .shape('line')
    .size(12)
    .color('#fff')
    .style({ sourceColor: '#ff1744', targetColor: '#2979ff', linearDir: 'vertical' });
  scene.addLayer(layer);

  const set = (d: (typeof dirs)[number]): void => { layer.style({ linearDir: d }); scene.render(); };
  if (stage.bar) select(stage.bar, 'linearDir', dirs, 'vertical', set);
  else sweep(stage, 1500, (i) => set(dirs[i % 2] ?? 'vertical'));

  return () => stage.dispose();
};

export default mount;
