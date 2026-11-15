// LineLayer option pickingBuffer: Layer option pickingBuffer
import { LineLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { paths } from '../../shared/line-data.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({
      center: [12,50],
      zoom: ctx.preview ? 2.3 : 3.3,
    }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);

  const layer = new LineLayer({ pickingBuffer: 10 })
    .source(paths([10, 48], { n: 8, step: 1.1 }))
    .shape('line')
    .size(1)
    .color('#ffffff')
    .active({ color: '#ffd166' });
  scene.addLayer(layer);

  const out = stage.readout();
  if (out) out.textContent = 'hover a thin line';
  layer.on('mouseenter', () => { if (out) out.textContent = 'hit'; });
  layer.on('mouseout', () => { if (out) out.textContent = 'hover a thin line'; });
  if (stage.bar) {
    slider(stage.bar, 'pickingBuffer', [0, 20, 1], 10, (v) => { layer.updateLayerConfig({ pickingBuffer: v }); scene.render(); });
  } else {
    // A ghost pointer sweeps one meridian across the lines.
    const ghost = stage.ghost(scene);
    stage.every(250, (i) => ghost.moveTo([4 + (i % 30) * 0.8, 50]));
  }

  return () => stage.dispose();
};

export default mount;
