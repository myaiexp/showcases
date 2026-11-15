// style({ allowOverlap: false, padding }): hide icons that would collide
import { Scene, PointLayer } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { cityFeatures } from '../../shared/data.ts';
import { cycle } from '../../shared/point-data.ts';
import { icon } from '../../shared/images.ts';
import { slider, toggle } from '../../shared/controls.ts';
import { worldLayers } from '../../shared/world.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [15, 40], zoom: ctx.preview ? 2.2 : 3 }),
  });
  await stage.ready(scene);

  await scene.addImage('icon-pin', icon('pin'));
  for (const l of worldLayers()) scene.addLayer(l);
  const layer = new PointLayer()
    .source(cityFeatures())
    .shape('icon-pin')
    .size(18)
    .style({ allowOverlap: false, padding: [4, 4] });
  scene.addLayer(layer);

  const set = (style: object): void => {
    layer.style(style);
    scene.render();
  };
  if (stage.bar) {
    toggle(stage.bar, 'allowOverlap', false, (allowOverlap) => set({ allowOverlap }));
    slider(stage.bar, 'padding', [0, 30, 1], 4, (p) => set({ padding: [p, p] }));
  } else cycle(stage, scene, [false, true], 1500, (allowOverlap) => set({ allowOverlap }));

  return () => stage.dispose();
};

export default mount;
