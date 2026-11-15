// Map options: the camera a Map starts with (center, zoom, pitch, rotation)
import { PointLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { cityFeatures } from '../../shared/data.ts';
import { valuePanel } from '../../shared/scene-board.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const options = { center: [121.47, 31.23] as [number, number], zoom: 3.2, pitch: 50, rotation: 25 };
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ ...options, minZoom: 0, maxZoom: 18 }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);
  scene.addLayer(
    new PointLayer()
      .source(cityFeatures())
      .shape('squareColumn')
      .size('pop', (pop: number) => [5, 5, pop * 0.8])
      .color('#7fdbff'),
  );
  valuePanel(stage.container, 'br')(Object.fromEntries(Object.entries(options).map(([k, v]) => [k, JSON.stringify(v)])));

  // Cards: after starting from those options, the camera slowly circles.
  if (stage.preview) stage.frame((t) => scene.setRotation((options.rotation + t * 12) % 360));

  return () => stage.dispose();
};

export default mount;
