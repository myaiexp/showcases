// LineLayer option blend: Layer option blend
import { LineLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
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

  const modes = ['normal', 'additive', 'subtractive', 'max'] as const;
  const layer = new LineLayer({ blend: 'additive' })
    .source(rows('Paris', 18), PARSER)
    .shape('arc')
    .size(8)
    .color('type', ['#ff5252', '#40c4ff', '#69f0ae'])
    .style({ opacity: 0.6 });
  scene.addLayer(layer);

  const set = (m: (typeof modes)[number]): void => { layer.setBlend(m); scene.render(); };
  if (stage.bar) select(stage.bar, 'blend', modes, 'additive', set);
  else stage.every(1600, (i) => set(modes[i % modes.length] ?? 'normal'));

  return () => stage.dispose();
};

export default mount;
