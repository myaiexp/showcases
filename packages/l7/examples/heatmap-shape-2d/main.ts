// HeatmapLayer grid shapes in 2D: the same aggregated cells drawn in four shapes
import { HeatmapLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { BLUES, XY, quakes } from '../../shared/heatmap-data.ts';
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
    }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);

  const data = quakes(300);
  const shapes = ['circle', 'triangle', 'square', 'hexagon'] as const;
  const make = (shape: (typeof shapes)[number]) =>
    new HeatmapLayer()
    .source(data, { ...XY, transforms: [{ type: 'grid', size: 250000, field: 'v', method: 'sum' }] })
    .shape(shape)
      .style({ coverage: 0.9, angle: 0 })
      .color('count', BLUES.slice().reverse());
  const show = holder(scene);
  const set = (s: (typeof shapes)[number]): void => { show(make(s)); };
  if (stage.bar) {
    set('square');
    select(stage.bar, 'shape', shapes, 'square', set);
  } else cycle(stage, scene, shapes, 1500, set);

  return () => stage.dispose();
};

export default mount;
