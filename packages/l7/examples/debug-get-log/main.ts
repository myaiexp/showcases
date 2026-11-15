// getLog with an array of layer ids, or with no argument for every log at once
import { LineLayer, PointLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { cityFeatures, routeFeatures, routesFrom } from '../../shared/data.ts';
import { flattenLog } from '../../shared/debug-view.ts';
import { valuePanel } from '../../shared/scene-board.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [40, 30], zoom: ctx.preview ? 0.6 : 1.4 }),
    debug: true,
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);
  const debugService = scene.getDebugService();

  const points = new PointLayer().source(cityFeatures()).shape('circle').size(5).color('#ffb347');
  const lines = new LineLayer().source(routeFeatures(routesFrom('Istanbul'))).shape('arc').size(1).color('#7fdbff');
  // The docs leave "all layers loaded" to you: count the 'inited' events.
  let ready = 0;
  const show = valuePanel(stage.container, 'bl');
  const report = (): void => {
    const both = debugService.getLog([points.id, lines.id]) as unknown[];
    const all = debugService.getLog() as Record<string, unknown>;
    show({
      'getLog([points.id, lines.id])': `${both.length} logs, ${both.map((l) => flattenLog(l).length).join(' + ')} steps`,
      'getLog() keys': Object.keys(all).join(', '),
    });
  };
  for (const layer of [points, lines]) {
    layer.on('inited', () => {
      if (++ready === 2) report();
    });
    scene.addLayer(layer);
  }

  if (stage.preview) stage.frame((t) => scene.setRotation((t * 10) % 360));

  return () => stage.dispose();
};

export default mount;
