// LineLayer animate options duration, interval and trailLength
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
      center: [15,25],
      zoom: ctx.preview ? 0.2 : 1.2,
    }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);

  const layer = new LineLayer().source(rows('Paris', 12), PARSER).shape('arc').size(3).color('#4fc3f7').animate({ duration: 4, interval: 0.2, trailLength: 0.1 });
  scene.addLayer(layer);

  if (stage.bar) {
    const opts = { duration: 4, interval: 0.2, trailLength: 0.1 };
    const push = (k: keyof typeof opts) => (v: number): void => { opts[k] = v; layer.animate({ ...opts }); };
    slider(stage.bar, 'duration', [0.5, 8, 0.5], 4, push('duration'));
    slider(stage.bar, 'interval', [0.1, 1, 0.05], 0.2, push('interval'));
    slider(stage.bar, 'trailLength', [0.05, 1, 0.05], 0.1, push('trailLength'));
  }

  return () => stage.dispose();
};

export default mount;
