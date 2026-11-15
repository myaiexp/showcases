// Tutorial grid heat map 3D size: column heights as a constant, a mapped range or a callback
import { HeatmapLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { BLUES, XY, quakes } from '../../shared/heatmap-data.ts';
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
  const modes = ['constant', 'field range', 'callback'] as const;
  const make = (mode: (typeof modes)[number]) => {
    const layer = new HeatmapLayer()
    .source(data, { ...XY, transforms: [{ type: 'grid', size: 250000, field: 'v', method: 'sum' }] })
    .shape('squareColumn').style({ coverage: 0.8, angle: 0 }).color('sum', BLUES.slice().reverse());
    if (mode === 'constant') return layer.size(100000);
    if (mode === 'field range') return layer.size('sum', [20000, 300000]);
    return layer.size('sum', (sum: number) => sum * 150);
  };
  const show = holder(scene);
  const set = (m: (typeof modes)[number]): void => { show(make(m)); };
  if (stage.bar) {
    set('field range');
    select(stage.bar, 'size', modes, 'field range', set);
  } else {
    orbit(stage, scene, { pitch: 50, turn: 20 });
    cycle(stage, scene, modes, 1800, set);
  }

  return () => stage.dispose();
};

export default mount;
