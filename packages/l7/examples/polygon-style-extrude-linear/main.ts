// PolygonLayer extrude style sourceColor and targetColor: a bottom-to-top colour gradient on the walls
import { PolygonLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { blocks, orbit } from '../../shared/polygon-data.ts';
import { button } from '../../shared/controls.ts';
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
    .size('floor', [20, 500])
    .color('#ffffff')
    .style({ sourceColor: '#0b3d91', targetColor: '#ffd166', pickLight: true });
  scene.addLayer(layer);
  if (stage.bar) {
    let flip = false;
    button(stage.bar, 'swap source and target', () => {
      flip = !flip;
      layer.style(flip ? { sourceColor: '#ffd166', targetColor: '#0b3d91' } : { sourceColor: '#0b3d91', targetColor: '#ffd166' });
      scene.render();
    });
  } else orbit(stage, scene, { pitch: 60 });

  return () => stage.dispose();
};

export default mount;
