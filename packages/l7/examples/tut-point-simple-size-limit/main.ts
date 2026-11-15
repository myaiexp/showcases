// Simple sprites are capped by the device: compare with a circle of the same size
import { Scene, PointLayer } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { cycle } from '../../shared/point-data.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [10, 46], zoom: ctx.preview ? 4 : 4.6 }),
  });
  await stage.ready(scene);

  const spots = [{ lng: 7, lat: 46 }, { lng: 13, lat: 46 }];
  const sprite = new PointLayer().source([spots[0]], { parser: { type: 'json', x: 'lng', y: 'lat' } }).shape('simple').size(30).color('#5CCEA1').style({ opacity: 0.7 });
  const flat = new PointLayer().source([spots[1]], { parser: { type: 'json', x: 'lng', y: 'lat' } }).shape('circle').size(30).color('#5B8FF9').style({ opacity: 0.7 });
  scene.addLayer(sprite);
  scene.addLayer(flat);

  const out = stage.readout();
  const range = Array.from(scene.getPointSizeRange()).join(', ');
  const set = (size: number): void => {
    sprite.size(size);
    flat.size(size);
    scene.render();
    if (out) out.textContent = `getPointSizeRange() -> [${range}]; size ${size}: left is simple, right is circle`;
  };
  if (stage.bar) slider(stage.bar, 'size', [5, 150, 5], 30, set);
  else cycle(stage, scene, [20, 60, 100, 150, 60], 900, set);

  return () => stage.dispose();
};

export default mount;
