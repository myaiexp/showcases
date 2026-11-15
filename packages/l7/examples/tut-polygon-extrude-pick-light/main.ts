// Tutorial polygon extrude style pickLight: whether the hover highlight is lit like the surface
import { PolygonLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { blocks, orbit } from '../../shared/polygon-data.ts';
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

  const make = (pickLight: boolean) =>
    new PolygonLayer().source(blocks(10, 10)).shape('extrude').size('floor', [20, 500]).color('#3f7fa5').active({ color: '#ffd166' }).style({ pickLight });
  let layer = make(false);
  scene.addLayer(layer);
  const set = async (v: boolean): Promise<void> => { await scene.removeLayer(layer); layer = make(v); scene.addLayer(layer); };
  if (stage.bar) toggle(stage.bar, 'pickLight', false, (v) => void set(v));
  else {
    orbit(stage, scene, { pitch: 55 });
    const ghost = stage.ghost(scene);
    stage.every(500, (i) => ghost.moveTo([13.36 + (i % 10) * 0.012, 52.47 + (i % 7) * 0.01]));
  }

  return () => stage.dispose();
};

export default mount;
