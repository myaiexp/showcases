// Layer feature vertexHeightScale: heights stored in the vertices
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
      center: [10,48],
      zoom: ctx.preview ? 3 : 4,
      pitch: 60,
    }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);

  // Every vertex is [lng, lat, height], like the docs' terrain-height data.
  const layer = new LineLayer()
    .source(paths([10, 48], { n: 8, step: 1.1, z: true }))
    .size(1)
    .shape('line')
    .style({ vertexHeightScale: 30 })
    .color('#ccc');
  scene.addLayer(layer);
  const set = (v: number): void => { layer.style({ vertexHeightScale: v }); scene.render(); };
  if (stage.bar) slider(stage.bar, 'vertexHeightScale', [0, 100, 1], 30, set);
  else {
    stage.frame((t) => scene.setRotation(Math.sin(t / 2.5) * 30));
    sweep(stage, 120, (i) => set(5 + wave(i, 40) * 90));
  }

  return () => stage.dispose();
};

export default mount;
