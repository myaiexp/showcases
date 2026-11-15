// scale('type', { type: 'cat', domain }) with color('type', [...]): which colour each category gets
import { PointLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { cycle } from '../../shared/point-data.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

const FORMS = ['inferred domain', "domain: ['B', 'A', 'C', 'D']"] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [12, 48], zoom: ctx.preview ? 3.4 : 4.4 }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);

  // The doc's six points A..F in the order they appear: A, B, C, D, E, F.
  const data = ['A', 'B', 'C', 'D', 'E', 'F'].map((type, i) => ({ type, lng: 4 + (i % 3) * 5, lat: 50 - Math.floor(i / 3) * 4 }));
  const layer = new PointLayer()
    .source(data, { parser: { type: 'json', x: 'lng', y: 'lat' } })
    .shape('circle')
    .size(ctx.preview ? 14 : 22)
    .color('type', ['red', 'white', 'blue', 'yellow']);
  const text = new PointLayer({ zIndex: 3 })
    .source(data, { parser: { type: 'json', x: 'lng', y: 'lat' } })
    .shape('type', 'text')
    .size(12)
    .color('#102a43');
  scene.addLayer(layer);
  scene.addLayer(text);

  const set = (form: (typeof FORMS)[number]): void => {
    if (form === FORMS[0]) layer.scale('type', { type: 'cat' });
    else layer.scale('type', { type: 'cat', domain: ['B', 'A', 'C', 'D'] });
    scene.render();
  };
  if (stage.bar) select(stage.bar, 'domain', FORMS, FORMS[0], set);
  else cycle(stage, scene, FORMS, 1400, set);

  return () => stage.dispose();
};

export default mount;
