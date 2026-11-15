// rampColors type 'cat': integer classes of a Uint8Array
import { RasterLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { drift } from '../../shared/polygon-data.ts';
import { CENTER, classMap, EXTENT } from '../../shared/raster-data.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: CENTER, zoom: ctx.preview ? 3.6 : 4.4 }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);

  const n = ctx.preview ? 64 : 160;
  // Class numbers like the docs' example; the field is generated, not read from a file.
  const layer = new RasterLayer({})
    .source(classMap(n, n, [1, 20, 101, 102, 200]), { parser: { type: 'raster', width: n, height: n, extent: EXTENT } })
    .style({
      domain: [0, 255],
      rampColors: {
        type: 'cat',
        colors: ['#e41a1c', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00'],
        positions: [1, 20, 101, 102, 200],
      },
    });
  scene.addLayer(layer);

  if (ctx.preview) drift(stage, scene, CENTER, 1.5);

  return () => stage.dispose();
};

export default mount;
