// PolygonLayer option pickingBuffer: a wider hit area for thin outlines
import { PolygonLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { regions } from '../../shared/polygon-data.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({
      center: [14, 50],
      zoom: ctx.preview ? 1.9 : 3,
    }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);

  const layer = new PolygonLayer({ pickingBuffer: 8 }).source(regions()).shape('line').size(1).color('#ffffff').active({ color: '#ffd166' });
  scene.addLayer(layer);
  const out = stage.readout();
  if (out) out.textContent = 'hover just beside a border';
  layer.on('mouseenter', () => { if (out) out.textContent = 'hit'; });
  layer.on('mouseout', () => { if (out) out.textContent = 'hover just beside a border'; });
  if (stage.bar) slider(stage.bar, 'pickingBuffer', [0, 20, 1], 8, (v) => { layer.updateLayerConfig({ pickingBuffer: v }); scene.render(); });
  else {
    const ghost = stage.ghost(scene);
    stage.every(250, (i) => ghost.moveTo([-6 + (i % 30) * 1.2, 48]));
  }

  return () => stage.dispose();
};

export default mount;
