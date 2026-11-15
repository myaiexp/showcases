// PolygonLayer fill style raisingHeight: a flat polygon floating above the map
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

  const ground = new PolygonLayer().source(blocks(10, 10)).shape('fill').color('#2c7fb8').style({ opacity: 0.5 });
  const lifted = new PolygonLayer().source(blocks(10, 10)).shape('fill').color('#ffd166').style({ raisingHeight: 300 });
  scene.addLayer(ground);
  scene.addLayer(lifted);
  if (stage.bar) slider(stage.bar, 'raisingHeight', [0, 2000, 50], 300, (v) => { lifted.style({ raisingHeight: v }); scene.render(); });
  else orbit(stage, scene);

  return () => stage.dispose();
};

export default mount;
