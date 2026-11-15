// PolygonLayer extrude style heightfixed: height in real metres versus screen pixels
import { PolygonLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { blocks } from '../../shared/polygon-data.ts';
import { toggle } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({
      center: [13.4, 52.5],
      zoom: ctx.preview ? 10.8 : 11.2,
      pitch: 55,
    }),
  });
  await stage.ready(scene);

  const layer = new PolygonLayer()
    .source(blocks(10, 10))
    .shape('extrude')
    .size('floor', (f: number) => f * 300)
    .color('#ffd166')
    .style({ heightfixed: true });
  scene.addLayer(layer);
  if (stage.bar) toggle(stage.bar, 'heightfixed', true, (v) => { layer.style({ heightfixed: v }); scene.render(); });
  else stage.frame((t) => scene.setZoom(10.8 + Math.sin(t / 1.4) * 0.4));

  return () => stage.dispose();
};

export default mount;
