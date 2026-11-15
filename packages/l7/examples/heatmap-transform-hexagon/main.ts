// HeatmapLayer source transforms type 'hexagon': points counted into hexagonal cells
import { HeatmapLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { TEAL, XY, quakes } from '../../shared/heatmap-data.ts';
import { cycle, holder } from '../../shared/polygon-data.ts';
import { slider } from '../../shared/controls.ts';
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
  const make = (size: number) =>
    new HeatmapLayer()
    .source(data, { ...XY, transforms: [{ type: 'hexagon', size: size, field: 'v', method: 'sum' }] })
    .shape('hexagonColumn')
      .size('sum', [0, 300000])
      .style({ coverage: 0.8, angle: 0 })
      .color('sum', TEAL);
  const show = holder(scene);
  const set = (km: number): void => { show(make(km * 1000)); };
  if (stage.bar) {
    set(250);
    slider(stage.bar, 'size (km)', [100, 600, 10], 250, set);
  } else cycle(stage, scene, [150, 250, 400, 250], 1600, set);

  return () => stage.dispose();
};

export default mount;
