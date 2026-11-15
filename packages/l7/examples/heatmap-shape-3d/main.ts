// HeatmapLayer grid shapes in 3D: cells drawn as cylinders and columns with a height
import { HeatmapLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { TEAL, XY, quakes } from '../../shared/heatmap-data.ts';
import { cycle, holder, orbit } from '../../shared/polygon-data.ts';
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
      pitch: 50,
    }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);

  const data = quakes(300);
  const shapes = ['cylinder', 'triangleColumn', 'hexagonColumn', 'squareColumn'] as const;
  const make = (shape: (typeof shapes)[number]) =>
    new HeatmapLayer()
    .source(data, { ...XY, transforms: [{ type: 'grid', size: 250000, field: 'v', method: 'sum' }] })
    .shape(shape)
      .size('sum', [0, 300000])
      .style({ coverage: 0.8, angle: 0 })
      .color('sum', TEAL);
  const show = holder(scene);
  const set = (s: (typeof shapes)[number]): void => { show(make(s)); };
  if (stage.bar) {
    set('hexagonColumn');
    select(stage.bar, 'shape', shapes, 'hexagonColumn', set);
  } else {
    orbit(stage, scene, { pitch: 50, turn: 20 });
    cycle(stage, scene, shapes, 1800, set);
  }

  return () => stage.dispose();
};

export default mount;
