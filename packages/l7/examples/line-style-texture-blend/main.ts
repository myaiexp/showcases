// LineLayer style textureBlend normal or replace for line textures
import { LineLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { icon } from '../../shared/images.ts';
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

  await scene.addImage('arrow', icon('arrow'));
  const modes = ['normal', 'replace'] as const;
  const layer = new LineLayer()
    .source(paths([10, 48], { n: 7, step: 1.1 }))
    .shape('line')
    .size(6)
    .texture('arrow')
    .color('#4fc3f7')
    .animate({ duration: 3, interval: 0.3, trailLength: 0.4 })
    .style({ lineTexture: true, iconStep: 20, textureBlend: 'normal' });
  scene.addLayer(layer);

  const set = (m: (typeof modes)[number]): void => { layer.style({ textureBlend: m }); scene.render(); };
  if (stage.bar) select(stage.bar, 'textureBlend', modes, 'normal', set);
  else sweep(stage, 1500, (i) => set(modes[i % 2] ?? 'normal'));

  return () => stage.dispose();
};

export default mount;
