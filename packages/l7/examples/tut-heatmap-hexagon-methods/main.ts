// Tutorial hexagon heat map: the five aggregation methods count, max, min, sum and mean
import { HeatmapLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { TEAL, XY, quakes } from '../../shared/heatmap-data.ts';
import { cycle, holder } from '../../shared/polygon-data.ts';
import { select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({
      center: [10, 48],
      zoom: ctx.preview ? 2.5 : 3.5,
      pitch: 40,
    }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);

  const data = quakes(300);
  const methods = ['count', 'max', 'min', 'sum', 'mean'] as const;
  const make = (m: (typeof methods)[number]) =>
    new HeatmapLayer()
      .source(data, { ...XY, transforms: [{ type: 'hexagon', size: 250000, field: 'v', method: m }] })
      .shape('hexagon')
      .style({ coverage: 0.9, angle: 0 })
      .color(m, TEAL);
  const show = holder(scene);
  const set = (m: (typeof methods)[number]): void => { show(make(m)); };
  if (stage.bar) {
    set('sum');
    select(stage.bar, 'method', methods, 'sum', set);
  } else cycle(stage, scene, methods, 1500, set);

  return () => stage.dispose();
};

export default mount;
