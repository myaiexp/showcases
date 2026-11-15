// LineLayer size(field, callback): a function returns each width
import { LineLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { PARSER, rows } from '../../shared/line-data.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({
      center: [15,25],
      zoom: ctx.preview ? 0.2 : 1.2,
    }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);

  const layer = new LineLayer()
    .source(rows('Paris', 14), PARSER)
    .shape('arc')
    .size('type', (value: string) => {
      switch (value) {
        case 'move_out': return 1;
        case 'move_in': return 3;
        default: return 6;
      }
    })
    .color('#c792ea');
  scene.addLayer(layer);

  // Cards have no pointer, so the map drifts to look alive.
  if (stage.preview) stage.every(80, (i) => scene.setCenter([15 + Math.sin(i / 40) * 6, 25 + Math.cos(i / 55) * 2]));

  return () => stage.dispose();
};

export default mount;
