// PolygonLayer options minZoom and maxZoom: the layer shows only inside a zoom range
import { PolygonLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { regions } from '../../shared/polygon-data.ts';
import { valuePanel } from '../../shared/scene-board.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({
      center: [14, 50],
      zoom: ctx.preview ? 1.9 : 3,
    }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);

  const layer = new PolygonLayer({ minZoom: 2, maxZoom: 3.5 }).source(regions()).shape('fill').color('#aed581');
  scene.addLayer(layer);
  const show = valuePanel(stage.container, 'br');
  const report = (): void => {
    const z = scene.getZoom();
    show({ zoom: z.toFixed(2), range: '2 – 3.5', polygons: z >= 2 && z <= 3.5 ? 'shown' : 'hidden' });
  };
  scene.on('zoomend', report);
  report();
  // Cards step through zooms below, inside and above the range.
  const zooms = [1.5, 2.4, 3.2, 4.2];
  if (stage.preview) stage.every(1500, (i) => scene.setZoom(zooms[i % zooms.length]!));

  return () => stage.dispose();
};

export default mount;
