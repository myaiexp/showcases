// LineLayer source from JSON rows, mapping x/y/x1/y1 with a parser
import { LineLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { PARSER, rows, sweep } from '../../shared/line-data.ts';
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
    .source(rows('Paris', 6), {
      parser: { type: 'json', x: 'lng1', y: 'lat1', x1: 'lng2', y1: 'lat2' },
    })
    .shape('arc')
    .size(1.5)
    .color('#ff8a65')
    .animate({ duration: 3, interval: 0.3, trailLength: 0.4 });
  scene.addLayer(layer);

  if (stage.bar) {
    slider(stage.bar, 'rows', [1, 40, 1], 6, (n) => layer.setData(rows('Paris', n), PARSER));
  } else {
    sweep(stage, 1200, (i) => layer.setData(rows('Paris', 3 + (i % 10)), PARSER));
  }

  return () => stage.dispose();
};

export default mount;
