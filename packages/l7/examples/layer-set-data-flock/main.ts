// layer.setData(points) on a timer: a flock moving over the map
import { PointLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { rng } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [10, 48], zoom: ctx.preview ? 3 : 4 }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);

  const r = rng(4);
  const birds = Array.from({ length: ctx.preview ? 40 : 90 }, (_, i) => ({ lng: 10 + (r() - 0.5) * 10, lat: 48 + (r() - 0.5) * 6, a: r() * 6.28, id: i, heading: 0 }));
  const layer = new PointLayer()
    .source(birds, { parser: { type: 'json', x: 'lng', y: 'lat' } })
    .shape('circle')
    .size(ctx.preview ? 5 : 7)
    .color('heading', ['#4ecdc4', '#ffd166', '#ff6b6b', '#4ecdc4'])
    .scale('heading', { type: 'linear', domain: [0, 360] });
  scene.addLayer(layer);

  stage.every(100, (t) => {
    for (const b of birds) {
      // Steer toward a point that circles the middle, with a little wobble.
      const tx = 10 + Math.cos(t / 25) * 6;
      const ty = 48 + Math.sin(t / 25) * 3;
      const want = Math.atan2(ty - b.lat, tx - b.lng);
      b.a += Math.sin(want - b.a) * 0.25 + (r() - 0.5) * 0.4;
      b.lng += Math.cos(b.a) * 0.22;
      b.lat += Math.sin(b.a) * 0.14;
      b.heading = ((b.a * 180) / Math.PI + 360) % 360;
    }
    layer.setData(birds);
  });

  return () => stage.dispose();
};

export default mount;
