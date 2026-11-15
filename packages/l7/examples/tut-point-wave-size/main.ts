// Same size, two layers: the wave edge is transparent, so it reads smaller
import { Scene, PointLayer } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [10, 46], zoom: ctx.preview ? 4 : 4.6 }),
  });
  await stage.ready(scene);

  const wave = new PointLayer()
    .source([{ lng: 7, lat: 46 }], { parser: { type: 'json', x: 'lng', y: 'lat' } })
    .shape('circle')
    .animate(true)
    .size(40)
    .color('#ffa842');
  const plain = new PointLayer().source([{ lng: 13, lat: 46 }], { parser: { type: 'json', x: 'lng', y: 'lat' } }).shape('circle').size(40).color('#ffa842');
  scene.addLayer(wave);
  scene.addLayer(plain);

  const out = stage.readout();
  if (out) out.textContent = 'left: animate(true), size 40. right: plain circle, size 40.';

  return () => stage.dispose();
};

export default mount;
