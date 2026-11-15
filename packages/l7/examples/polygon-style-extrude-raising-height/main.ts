// PolygonLayer extrude style raisingHeight: blocks floating above the ground
import { PolygonLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { blocks, orbit } from '../../shared/polygon-data.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({
      center: [13.4, 52.5],
      zoom: ctx.preview ? 10.8 : 11.2,
      pitch: 60,
    }),
  });
  await stage.ready(scene);

  const layer = new PolygonLayer()
    .source(blocks(10, 10))
    .shape('extrude')
    .size('floor', (f: number) => f * 300)
    .color('#4ecdc4')
    .style({ heightfixed: true, raisingHeight: 3000 });
  scene.addLayer(layer);
  if (stage.bar) slider(stage.bar, 'raisingHeight', [0, 10000, 250], 3000, (v) => { layer.style({ raisingHeight: v }); scene.render(); });
  else orbit(stage, scene, { pitch: 60 });

  return () => stage.dispose();
};

export default mount;
