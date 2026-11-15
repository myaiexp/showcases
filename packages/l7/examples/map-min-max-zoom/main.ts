// minZoom and maxZoom clamp the zoom level, however far setZoom asks to go
import { PointLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { cities, scatter } from '../../shared/data.ts';
import { valuePanel } from '../../shared/scene-board.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [-74, 40.7], zoom: 3, minZoom: 2, maxZoom: 5 }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);
  scene.addLayer(
    new PointLayer()
      .source(scatter(400, { spread: 3, around: cities.filter((c) => c.continent === 'North America') }), {
        parser: { type: 'json', x: 'lng', y: 'lat' },
      })
      .shape('circle')
      .size(3)
      .color('#ffd166'),
  );
  const show = valuePanel(stage.container, 'br');
  const ask = (z: number): void => {
    scene.setZoom(z);
    show({ 'setZoom(asked)': z.toFixed(1), 'getZoom()': scene.getZoom().toFixed(1), limits: 'minZoom 2, maxZoom 5' });
  };
  ask(3);

  if (stage.bar) slider(stage.bar, 'setZoom', [0, 8, 0.1], 3, ask);
  // Cards ask for zoom 0 to 8; the map stops at 2 and at 5.
  if (stage.preview) stage.every(500, (i) => ask(4 + 4 * Math.sin(i * 0.35)));

  return () => stage.dispose();
};

export default mount;
