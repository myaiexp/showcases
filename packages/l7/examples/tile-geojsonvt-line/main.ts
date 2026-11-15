// LineLayer on a 'geojsonvt' source
import { LineLayer, Scene, Source } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { drift } from '../../shared/polygon-data.ts';
import { createStage } from '../../shared/stage.ts';
import { borderLines, byId } from '../../shared/tile-data.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [12, 47], zoom: ctx.preview ? 3.2 : 3.8 }),
  });
  await stage.ready(scene);

  const source = new Source(borderLines, { parser: { type: 'geojsonvt', maxZoom: 9 } });
  const line = new LineLayer({ featureId: 'id' })
    .source(source)
    .color('id', byId)
    .size(2);
  scene.addLayer(line);

  if (ctx.preview) drift(stage, scene, [12, 47], 3);

  return () => stage.dispose();
};

export default mount;
