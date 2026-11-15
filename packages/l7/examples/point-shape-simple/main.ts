// The 'simple' sprite shape: cheap points that always face the camera
import { Scene, PointLayer } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { quakes, orbit } from '../../shared/point-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [20, 30], zoom: ctx.preview ? 0.9 : 1.5, pitch: 20 }),
  });
  await stage.ready(scene);

  const layer = new PointLayer()
    .source(quakes(ctx.preview ? 90 : 300), { parser: { type: 'json', x: 'lng', y: 'lat' } })
    .shape('simple')
    .size(15)
    .color('mag', (mag) => (mag > 4.5 ? '#5B8FF9' : '#5CCEA1'))
    .style({ opacity: 0.6, strokeWidth: 3 });
  scene.addLayer(layer);

  const out = stage.readout();
  if (out) out.textContent = `scene.getPointSizeRange() -> [${Array.from(scene.getPointSizeRange()).join(', ')}]`;
  if (stage.preview) orbit(stage, scene, { pitch: 20, turn: 30 });

  return () => stage.dispose();
};

export default mount;
