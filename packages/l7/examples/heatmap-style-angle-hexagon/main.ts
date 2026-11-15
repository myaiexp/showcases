// HeatmapLayer style angle: style angle on hexagons
import { HeatmapLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { BLUES, XY, quakes } from '../../shared/heatmap-data.ts';
import { cycle } from '../../shared/polygon-data.ts';
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
  const layer = new HeatmapLayer()
    .source(data, { ...XY, transforms: [{ type: 'hexagon', size: 250000, field: 'v', method: 'sum' }] })
    .shape('hexagon')
    .style({ coverage: 0.9, angle: 0.4 })
    .color('count', BLUES.slice().reverse());
  scene.addLayer(layer);
  if (stage.bar) slider(stage.bar, 'angle', [0, 6.3, 0.05], 0.4, (v) => { layer.style({ angle: v }); scene.render(); });
  else stage.every(80, (i) => { layer.style({ angle: (i / 20) % 6.3 }); scene.render(); });

  return () => stage.dispose();
};

export default mount;
