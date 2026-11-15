// PointLayer text labels on plane coordinates with parser x/y
import { ImageLayer, PointLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { huts, planImage, toLngLat } from '../../shared/exp-simple.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [500, 500], pitch: 0, zoom: ctx.preview ? 0.7 : 1.9, version: 'SIMPLE', mapSize: 1000, maxZoom: 5, minZoom: 0, pitchEnabled: false, rotateEnabled: false } as never),
  });
  await stage.ready(scene);

  scene.addLayer(new ImageLayer({}).source(planImage(), { parser: { type: 'image', extent: [360, 400, 640, 600] } }));
  const textLayer = new PointLayer({ zIndex: 2 })
    .source(huts, { parser: { type: 'json', x: 'x', y: 'y' } })
    .shape('t', 'text')
    .size(12)
    .active({ color: '#0000ff', mix: 0.9 })
    .color('rgb(86, 156, 214)')
    .style({ textAnchor: 'center', spacing: 2, fontWeight: '800', padding: [1, 1], stroke: '#ffffff', strokeWidth: 2, textAllowOverlap: true });
  scene.addLayer(textLayer);

  // Cards have no pointer: a ghost visits the labels (it takes geographic values, so plane points go through toLngLat).
  if (ctx.preview) {
    const ghost = stage.ghost(scene);
    stage.every(700, (i) => ghost.moveTo(toLngLat([huts[i % huts.length]!.x, huts[i % huts.length]!.y])));
  }

  return () => stage.dispose();
};

export default mount;
