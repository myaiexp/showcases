// scale('mag', { type: 'threshold', domain: [3, 6] }): manual class breaks
import { Scene, PointLayer } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { quakes, drift, cycle } from '../../shared/point-data.ts';
import { slider } from '../../shared/controls.ts';
import { worldLayers } from '../../shared/world.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [30, 38], zoom: ctx.preview ? 1.8 : 2.4 }),
  });
  await stage.ready(scene);

  for (const l of worldLayers()) scene.addLayer(l);
  const layer = new PointLayer()
    .source(quakes(ctx.preview ? 90 : 220, { spread: 4 }), { parser: { type: 'json', x: 'lng', y: 'lat' } })
    .shape('circle')
    .size(ctx.preview ? 8 : 11)
    .scale('mag', { type: 'threshold', domain: [3, 6] })
    .color('mag', ['#2c7bb6', '#ffffbf', '#d7191c'])
    .style({ opacity: 0.9 });
  scene.addLayer(layer);

  const setBreaks = (low: number, high: number): void => {
    layer.scale('mag', { type: 'threshold', domain: [low, high] });
    scene.render();
  };
  if (stage.bar) {
    let low = 3;
    let high = 6;
    slider(stage.bar, 'first break', [1, 5, 0.5], low, (v) => setBreaks((low = v), high));
    slider(stage.bar, 'second break', [5, 8, 0.5], high, (v) => setBreaks(low, (high = v)));
  } else {
    cycle(stage, scene, [[3, 6], [2, 4], [4, 7], [3, 6]] as const, 900, ([a, b]) => setBreaks(a, b));
    drift(stage, scene, [30, 38], 20);
  }

  return () => stage.dispose();
};

export default mount;
