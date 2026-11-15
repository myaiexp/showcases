// new PointLayer({ zIndex }): which layer draws on top
import { Scene, PointLayer } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { cycle } from '../../shared/point-data.ts';
import { toggle } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [10, 46], zoom: ctx.preview ? 4.2 : 5 }),
  });
  await stage.ready(scene);

  const blue = new PointLayer({ zIndex: 0 })
    .source([{ lng: 9.2, lat: 46 }], { parser: { type: 'json', x: 'lng', y: 'lat' } })
    .shape('circle')
    .size(ctx.preview ? 46 : 70)
    .color('#5B8FF9');
  const red = new PointLayer({ zIndex: 0 })
    .source([{ lng: 10.8, lat: 46 }], { parser: { type: 'json', x: 'lng', y: 'lat' } })
    .shape('circle')
    .size(ctx.preview ? 46 : 70)
    .color('#ff6b6b');
  // Added blue first, red second: at equal zIndex red is drawn over blue.
  scene.addLayer(blue);
  scene.addLayer(red);

  const raise = (up: boolean): void => {
    blue.setIndex(up ? 5 : 0);
    scene.render();
  };
  if (stage.bar) toggle(stage.bar, 'blue zIndex 5 (else 0)', false, raise);
  else cycle(stage, scene, [false, true], 1200, raise);

  return () => stage.dispose();
};

export default mount;
