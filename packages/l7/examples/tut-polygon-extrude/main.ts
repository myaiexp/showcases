// Tutorial polygon extrude: blocks coloured and raised by unit_price, with mapped opacity
import { PolygonLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { blocks, orbit } from '../../shared/polygon-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({
      center: [13.4, 52.5],
      zoom: ctx.preview ? 10.8 : 11.2,
      pitch: 50,
    }),
  });
  await stage.ready(scene);

  // Stands in for the docs' district price JSON: blocks with unit_price and floor fields.
  const layer = new PolygonLayer({ name: 'fill', zIndex: 3 })
    .source(blocks(10, 10))
    .shape('extrude')
    .color('unit_price', ['#87CEFA', '#00BFFF', '#7FFFAA', '#00FF7F', '#32CD32', '#F0E68C', '#FFD700', '#FF7F50', '#FF6347', '#FF0000'])
    .size('unit_price', (price: number) => price / 160)
    .style({ opacity: { field: 'unit_price', value: [0.5, 1] }, pickLight: true });
  scene.addLayer(layer);
  if (stage.preview) orbit(stage, scene, { pitch: 50 });

  return () => stage.dispose();
};

export default mount;
