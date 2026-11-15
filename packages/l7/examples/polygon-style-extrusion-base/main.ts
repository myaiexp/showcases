// PolygonLayer extrusion style extrusionBase as one number, in metres
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
    .shape('extrusion')
    .size(500)
    .color('#c792ea')
    .style({ extrusionBase: 200 });
  scene.addLayer(layer);
  if (stage.bar) slider(stage.bar, 'extrusionBase', [0, 480, 10], 200, (v) => { layer.style({ extrusionBase: v }); scene.render(); });
  else { orbit(stage, scene, { pitch: 60 }); stage.every(80, (i) => { layer.style({ extrusionBase: 240 + Math.sin(i / 8) * 230 }); scene.render(); }); }

  return () => stage.dispose();
};

export default mount;
