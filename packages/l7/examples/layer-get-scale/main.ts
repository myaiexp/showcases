// layer.getScale('color') and layer.getScale('size'): call the scale L7 built for a channel
import { PointLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { valuePanel } from '../../shared/scene-board.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [10, 47], zoom: ctx.preview ? 5 : 6 }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);

  const data = [
    { lng: 7, lat: 47, name: 'n1' },
    { lng: 13, lat: 47, name: 'n2' },
  ];
  const layer = new PointLayer()
    .source(data, { parser: { type: 'json', x: 'lng', y: 'lat' } })
    .shape('circle')
    .color('name', ['#f00', '#ff0'])
    .size('name', [20, 40]);
  scene.addLayer(layer);

  const show = valuePanel(stage.container, 'tl');
  // The scales exist once the layer is initialised.
  layer.on('inited', () => {
    const color = layer.getScale('color') as (v: string) => string;
    const size = layer.getScale('size') as (v: string) => number;
    show({
      "color('n1')": String(color('n1')),
      "color('n2')": String(color('n2')),
      "size('n1')": String(size('n1')),
      "size('n2')": String(size('n2')),
    });
  });

  return () => stage.dispose();
};

export default mount;
