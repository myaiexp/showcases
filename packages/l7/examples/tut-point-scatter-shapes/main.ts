// A scatter plot takes any 2D shape: all nine side by side
import { Scene, PointLayer } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { lattice } from '../../shared/point-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [10, 46], zoom: ctx.preview ? 3 : 3.4 }),
  });
  await stage.ready(scene);

  const shapes = ['circle', 'square', 'hexagon', 'triangle', 'pentagon', 'octogon', 'hexagram', 'rhombus', 'vesica'];
  const per = ctx.preview ? 5 : 9;
  const layers = shapes.slice(0, per).map((shape, i) =>
    new PointLayer()
      .source(lattice(1, 1, 4, [-3 + i * 4.4, 46]), { parser: { type: 'json', x: 'lng', y: 'lat' } })
      .shape(shape)
      .size(ctx.preview ? 20 : 30)
      .color('#64A5D3')
      .style({ stroke: '#ffffff', strokeWidth: 1 }),
  );
  for (const l of layers) scene.addLayer(l);
  scene.setZoomAndCenter(ctx.preview ? 4.3 : 4, [-3 + ((per - 1) * 4.4) / 2, 46]);
  if (stage.preview) stage.every(60, (i) => scene.setRotation(Math.sin(i / 30) * 18));

  return () => stage.dispose();
};

export default mount;
