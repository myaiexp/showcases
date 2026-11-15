// style({ opacity: { field, value } }) on a polygon fill: opacity per country
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
    map: new Map({ center: [15, 50], zoom: ctx.preview ? 2.4 : 3.2 }),
  });
  await stage.ready(scene);

  const base = regions();
  // The mapping stays put; the densities rotate through the countries, so the opacities move.
  const shifted = (k: number): ReturnType<typeof regions> => ({
    ...base,
    features: base.features.map((f, i) => ({ ...f, properties: { ...f.properties, density: base.features[(i + k) % base.features.length]?.properties.density ?? 0 } })),
  });
  const layer = new PolygonLayer()
    .source(shifted(0))
    .shape('fill')
    .color('#ffb347')
    .style({ opacity: { field: 'density', value: [0.1, 1] } });
  scene.addLayer(layer);

  const set = (k: number): void => void layer.setData(shifted(k));
  if (stage.bar) slider(stage.bar, 'rotate densities', [0, base.features.length - 1, 1], 0, set);
  else stage.every(700, (i) => set(i % base.features.length));

  return () => stage.dispose();
};

export default mount;
