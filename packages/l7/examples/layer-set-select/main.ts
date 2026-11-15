// layer.setSelect(featureId): click selection driven from code
import { PolygonLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { regions } from '../../shared/polygon-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [12, 50], zoom: ctx.preview ? 2.5 : 3.3 }),
  });
  await stage.ready(scene);

  const data = regions();
  const layer = new PolygonLayer().source(data).shape('fill').color('type', ['#24425f', '#356a8e', '#4f8fb8']).select({ color: '#ff6b6b' });
  scene.addLayer(layer);

  const out = stage.readout();
  const set = (id: number): void => {
    layer.setSelect(id);
    if (out) out.textContent = `layer.setSelect(${id})  // ${data.features[id]?.properties.name ?? '?'}`;
  };
  const ids = Array.from({ length: data.features.length }, (_, i) => i);
  if (stage.bar) slider(stage.bar, 'featureId', [0, ids.length - 1, 1], 0, set);
  else {
    // Not before the layer has been initialised: setSelect on a layer without its models throws.
    layer.on('inited', () => stage.every(500, (i) => layer.setSelect(ids[i % ids.length] ?? 0)));
  }

  return () => stage.dispose();
};

export default mount;
