// PolygonLayer size(number): every extruded polygon gets the same height
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
      pitch: 55,
    }),
  });
  await stage.ready(scene);

  const layer = new PolygonLayer().source(blocks(10, 10)).shape('extrude').size(150).color('#7fcdbb');
  scene.addLayer(layer);
  if (stage.bar) slider(stage.bar, 'size', [0, 600, 10], 150, (v) => { layer.size(v); scene.render(); });
  else { orbit(stage, scene); stage.every(80, (i) => { layer.size(250 + Math.sin(i / 9) * 230); scene.render(); }); }

  return () => stage.dispose();
};

export default mount;
