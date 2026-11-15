// style({ speed }) on the radar shape: how fast the sweep turns
import { Scene, PointLayer } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [8, 46.5], zoom: ctx.preview ? 4 : 4.4 }),
  });
  await stage.ready(scene);

  const layer = new PointLayer()
    .source([{ lng: 5, lat: 47.5 }, { lng: 11.5, lat: 48 }, { lng: 8, lat: 44.3 }], { parser: { type: 'json', x: 'lng', y: 'lat' } })
    .shape('radar')
    .size(ctx.preview ? 60 : 90)
    .color('#d00')
    .style({ speed: 5 })
    .animate(true);
  scene.addLayer(layer);

  if (stage.bar) {
    slider(stage.bar, 'speed', [0, 12, 0.5], 5, (speed) => {
      layer.style({ speed });
      scene.render();
    });
  }

  return () => stage.dispose();
};

export default mount;
