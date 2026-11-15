// Layer feature border: outline a line layer in style
import { LineLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { paths, sweep, wave } from '../../shared/line-data.ts';
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
    .source(paths([10, 48], { n: 8, step: 1.1 }))
    .size(6)
    .shape('line')
    .color('#8C1EB2')
    .style({ borderWidth: 0.35, borderColor: '#888' });
  scene.addLayer(layer);
  const set = (v: number): void => { layer.style({ borderWidth: v }); scene.render(); };
  if (stage.bar) slider(stage.bar, 'borderWidth', [0, 0.5, 0.01], 0.35, set);
  else sweep(stage, 120, (i) => set(wave(i, 30) * 0.5));

  return () => stage.dispose();
};

export default mount;
