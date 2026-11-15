// PolygonLayer extrude style topsurface: show or hide the top face of each block
import { PolygonLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { blocks, cycle, orbit } from '../../shared/polygon-data.ts';
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
      pitch: 60,
    }),
  });
  await stage.ready(scene);

  const layer = new PolygonLayer().source(blocks(10, 10)).shape('extrude').size('floor', [20, 500]).color('#ff8a65').style({ topsurface: false, pickLight: true });
  scene.addLayer(layer);
  const set = (v: boolean): void => { layer.style({ topsurface: v }); };
  if (stage.bar) toggle(stage.bar, 'topsurface', false, (v) => { set(v); scene.render(); });
  else { orbit(stage, scene, { pitch: 60 }); cycle(stage, scene, [false, true], 1800, set); }

  return () => stage.dispose();
};

export default mount;
