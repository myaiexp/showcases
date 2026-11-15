// Tutorial wall: heightfixed keeps the height when you zoom
import { LineLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { ring } from '../../shared/line-data.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({
      center: [10,48],
      zoom: ctx.preview ? 3 : 4.2,
      pitch: 55,
    }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);

  const layer = new LineLayer().source(ring([10, 48], 5)).size(40).shape('wall').style({ sourceColor: '#ff9800', targetColor: 'rgba(255, 255, 255, 0)' });
  scene.addLayer(layer);
  const set = (v: boolean): void => { layer.size(v ? 3000000 : 40); layer.style({ heightfixed: v }); scene.render(); };
  if (stage.bar) toggle(stage.bar, 'heightfixed', false, set);
  else {
    stage.every(2000, (i) => set(i % 2 === 1));
    stage.frame((t) => scene.setZoom(3.5 + Math.sin(t / 1.6) * 0.7));
  }

  return () => stage.dispose();
};

export default mount;
