// getLog(layer.id) after 'inited': how long source, scale, mapping and model building took
import { type ILayer, PointLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { button, select } from '../../shared/controls.ts';
import { scatter } from '../../shared/data.ts';
import { logTimeline } from '../../shared/debug-view.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

const SIZES = ['500', '5000', '50000'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [60, 30], zoom: ctx.preview ? 0.6 : 1.5 }),
    debug: true,
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);
  const debugService = scene.getDebugService();
  const show = logTimeline(stage.container, 'getLog(layer.id)');

  let layer: ILayer | null = null;
  let size: (typeof SIZES)[number] = ctx.preview ? '500' : '5000';
  const build = (): void => {
    if (layer) scene.removeLayer(layer);
    layer = new PointLayer()
      .source(scatter(Number(size), { seed: Date.now() % 1000 }), { parser: { type: 'json', x: 'lng', y: 'lat' } })
      .shape('circle')
      .size('value', [1, 5])
      .color('value', ['#3f7fa5', '#ffd166', '#ff6b6b']);
    const current = layer;
    // 'inited' fires once the layer has built its models; its log is complete by then.
    layer.on('inited', () => show(debugService.getLog(current.id)));
    scene.addLayer(layer);
  };
  build();

  if (stage.bar) {
    select(stage.bar, 'points', SIZES, size, (v) => (size = v));
    button(stage.bar, 'Rebuild the layer', build);
  }
  if (stage.preview) stage.every(2500, build);

  return () => stage.dispose();
};

export default mount;
