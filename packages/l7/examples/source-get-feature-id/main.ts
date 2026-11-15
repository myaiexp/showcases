// source.getFeatureId(key, value): a feature's L7 id from one of its values
import { PointLayer, Scene, Source } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { EUROPE_CENTER, europeZoom, PLACES } from '../../shared/comp-demo.ts';
import { select } from '../../shared/controls.ts';
import { later } from '../../shared/layer-demo.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: EUROPE_CENTER, zoom: europeZoom(ctx.preview) }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);

  const source = new Source(PLACES, { parser: { type: 'json', x: 'lng', y: 'lat' } });
  const layer = new PointLayer().source(source).shape('circle').size(13).color('#ffd166').style({ stroke: '#0b131c', strokeWidth: 1 }).active({ color: '#ff6b6b' });
  scene.addLayer(layer);

  const out = stage.readout();
  const find = (name: string): void => {
    // The value must be unique in the field: the first match wins.
    const id = source.getFeatureId('name', name);
    if (id !== undefined) layer.setActive(id);
    if (out) out.textContent = `source.getFeatureId('name', '${name}') -> ${id}\nlayer.setActive(${id}) highlights it`;
  };
  const names = PLACES.map((p) => p.name);
  // setActive throws before the layer has initialised.
  layer.once('inited', () => later(stage, () => find('Paris'), 100));
  if (stage.bar) select(stage.bar, 'name', names, 'Paris', find);
  else stage.every(900, (i) => find(names[i % names.length] ?? 'Paris'));

  return () => stage.dispose();
};

export default mount;
