// zoomIn and zoomOut step the map one zoom level at a time
import { PointLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { cities, scatter } from '../../shared/data.ts';
import { valuePanel } from '../../shared/scene-board.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [77.2, 28.6], zoom: 2 }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);
  scene.addLayer(
    new PointLayer()
      .source(scatter(800, { spread: 1.2, around: cities.filter((c) => c.name === 'Delhi') }), { parser: { type: 'json', x: 'lng', y: 'lat' } })
      .shape('dot')
      .size(2)
      .color('value', ['#3f7fa5', '#ffd166', '#ff6b6b']),
  );
  const show = valuePanel(stage.container, 'br');
  const report = (): void => show({ 'getZoom()': scene.getZoom().toFixed(2) });
  scene.on('zoomend', report);
  report();

  if (stage.bar) {
    button(stage.bar, 'zoomIn()', () => scene.zoomIn());
    button(stage.bar, 'zoomOut()', () => scene.zoomOut());
  }
  // Cards: three steps in, three steps out.
  if (stage.preview) stage.every(900, (i) => (i % 6 < 3 ? scene.zoomIn() : scene.zoomOut()));

  return () => stage.dispose();
};

export default mount;
