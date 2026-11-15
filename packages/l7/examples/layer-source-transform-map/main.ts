// source(csv, { transforms: [{ type: 'map', callback }] }): strings turned into numbers
import { type ILayer, PointLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { grid } from '../../shared/layer-demo.ts';
import { cycle } from '../../shared/point-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [10, 46], zoom: ctx.preview ? 3 : 3.6 }),
  });
  await stage.ready(scene);

  // Stands in for a fetched .csv: every cell is text.
  const csv = ['lng,lat,v', ...grid(ctx.preview ? 5 : 8, 3, [10, 46], 3.8).map((r) => `${r.lng},${r.lat},${r.v}`)].join('\n');
  const build = (withMap: boolean): ILayer =>
    new PointLayer()
      .source(csv, {
        parser: { type: 'csv', x: 'lng', y: 'lat' },
        transforms: withMap
          ? [
              {
                type: 'map',
                callback: (item: Record<string, unknown>) => {
                  item.v = Number(item.v);
                  return item;
                },
              },
            ]
          : [],
      })
      .shape('circle')
      .size(ctx.preview ? 16 : 24)
      .color('v', ['#ffffcc', '#41b6c4', '#253494']);

  let layer = build(true);
  scene.addLayer(layer);
  const swap = (withMap: boolean): void => {
    scene.removeLayer(layer);
    layer = build(withMap);
    scene.addLayer(layer);
    const out = stage.readout();
    if (out) out.textContent = withMap ? 'map transform on: v is a number, so the colour scale is linear' : 'no transform: v is a string, so every value is its own category';
  };
  if (stage.bar) toggle(stage.bar, 'map transform', true, swap);
  else cycle(stage, scene, [true, false], 1400, swap);

  return () => stage.dispose();
};

export default mount;
