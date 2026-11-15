// removeAllLayer clears the scene in one awaited call; the layers are rebuilt after
import { HeatmapLayer, PointLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { scatter } from '../../shared/data.ts';
import { valuePanel } from '../../shared/scene-board.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [10, 30], zoom: ctx.preview ? 0.4 : 1.2 }),
  });
  await stage.ready(scene);
  const points = scatter(ctx.preview ? 400 : 1500);
  const show = valuePanel(stage.container, 'tr');

  const build = (): void => {
    for (const l of worldLayers()) scene.addLayer(l);
    scene.addLayer(
      new HeatmapLayer()
        .source(points, { parser: { type: 'json', x: 'lng', y: 'lat' } })
        .shape('heatmap')
        .size('value', [0, 1])
        .style({ intensity: 2, radius: 14, opacity: 0.9 }),
    );
    scene.addLayer(
      new PointLayer().source(points.slice(0, 60), { parser: { type: 'json', x: 'lng', y: 'lat' } }).shape('dot').size(2).color('#fff'),
    );
    show({ layers: String(scene.getLayers().length) });
  };
  const clear = async (): Promise<void> => {
    // Every layer is removed and destroyed, the basemap layers included.
    await scene.removeAllLayer();
    show({ layers: String(scene.getLayers().length) });
  };
  build();

  if (stage.bar) {
    button(stage.bar, 'removeAllLayer()', () => void clear());
    button(stage.bar, 'Add them back', build);
  }
  if (stage.preview) stage.every(1500, (i) => (i % 2 ? void clear() : build()));

  return () => stage.dispose();
};

export default mount;
