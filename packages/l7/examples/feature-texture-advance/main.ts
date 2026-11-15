// Layer feature texture advance: interval and textureBlend replace
import { LineLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { icon } from '../../shared/images.ts';
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

  await scene.addImage('plane', icon('plane'));
  const layer = new LineLayer()
    .source(rows('Paris', 10), PARSER)
    .shape('arc')
    .size(10)
    .texture('plane')
    .color('#ef5350')
    .animate({ duration: 1, interval: 0.2, trailLength: 0.1 })
    .style({ lineTexture: true, iconStep: 30, textureBlend: 'replace' });
  scene.addLayer(layer);
  const modes = ['replace', 'normal'] as const;
  const set = (m: (typeof modes)[number]): void => { layer.style({ textureBlend: m }); scene.render(); };
  if (stage.bar) select(stage.bar, 'textureBlend', modes, 'replace', set);

  return () => stage.dispose();
};

export default mount;
