// color() with no scale(): L7 infers constant, linear or cat from the field
import { type ILayer, PointLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';
import { drift } from '../../shared/point-data.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [12, 48], zoom: ctx.preview ? 3.4 : 4.4 }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);

  const n = ctx.preview ? 6 : 8;
  const row = (lat: number): { lng: number; lat: number; num: number; str: string }[] =>
    Array.from({ length: n }, (_, i) => ({ lng: 4 + i * 2.2, lat, num: i * 10, str: ['A', 'B', 'C', 'D'][i % 4] ?? 'A' }));
  const make = (lat: number): ILayer =>
    new PointLayer().source(row(lat), { parser: { type: 'json', x: 'lng', y: 'lat' } }).shape('circle').size(ctx.preview ? 12 : 18);
  const colors = ['#ffffcc', '#41b6c4', '#253494'];
  // Row 1: 'nothing' is not a field and not a colour: in 2.29.1 it draws nothing at all.
  // Row 2: 'num' is a number, so linear. Row 3: 'str' is a string, so cat takes the distinct values in order.
  scene.addLayer(make(51).color('nothing'));
  scene.addLayer(make(48).color('num', colors));
  scene.addLayer(make(45).color('str', ['#ff6b6b', '#ffd166', '#4ecdc4', '#7fb7ff']));

  if (stage.preview) drift(stage, scene, [12, 48], 1.5);

  return () => stage.dispose();
};

export default mount;
