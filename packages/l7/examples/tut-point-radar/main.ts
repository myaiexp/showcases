// A radar point: shape('radar') plus animate({ enable: true })
import { Scene, PointLayer } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [8, 47], zoom: ctx.preview ? 4.4 : 5 }),
  });
  await stage.ready(scene);

  const layer = new PointLayer()
    .source([{ lng: 8, lat: 47 }], { parser: { type: 'json', x: 'lng', y: 'lat' } })
    .shape('radar')
    .size(ctx.preview ? 90 : 130)
    .color('#d00')
    .style({ speed: 5 })
    .animate({ enable: true });
  scene.addLayer(layer);

  if (stage.bar) toggle(stage.bar, 'animate', true, (enable) => layer.animate({ enable }));

  return () => stage.dispose();
};

export default mount;
