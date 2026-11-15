// Tutorial grid heat map style: coverage, angle and opacity together
import { HeatmapLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { BLUES, XY, quakes } from '../../shared/heatmap-data.ts';
import { drift } from '../../shared/polygon-data.ts';
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
    }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);

  const data = quakes(300);
  const layer = new HeatmapLayer()
    .source(data, { ...XY, transforms: [{ type: 'grid', size: 250000, field: 'v', method: 'sum' }] })
    .shape('square').style({ coverage: 0.9, angle: 0, opacity: 1 }).color('count', BLUES.slice().reverse());
  scene.addLayer(layer);
  const state = { coverage: 0.9, angle: 0, opacity: 1 };
  const push = (): void => { layer.style({ ...state }); scene.render(); };
  if (stage.bar) {
    slider(stage.bar, 'coverage', [0.1, 1, 0.05], 0.9, (v) => { state.coverage = v; push(); });
    slider(stage.bar, 'angle', [0, 6.3, 0.05], 0, (v) => { state.angle = v; push(); });
    slider(stage.bar, 'opacity', [0.1, 1, 0.05], 1, (v) => { state.opacity = v; push(); });
  } else {
    stage.every(80, (i) => {
      state.coverage = 0.6 + Math.sin(i / 9) * 0.35;
      state.angle = (i / 25) % 6.3;
      state.opacity = 0.75 + Math.sin(i / 14) * 0.25;
      push();
    });
    drift(stage, scene, [10, 48], 3);
  }

  return () => stage.dispose();
};

export default mount;
