// stroke, strokeWidth, strokeOpacity: an outline around the glyphs
import { Scene, PointLayer } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { cities, cityFeatures } from '../../shared/data.ts';
import { cycle } from '../../shared/point-data.ts';
import { select, slider } from '../../shared/controls.ts';
import { worldLayers } from '../../shared/world.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [15, 50], zoom: ctx.preview ? 2.4 : 3.2 }),
  });
  await stage.ready(scene);

  for (const l of worldLayers()) scene.addLayer(l);
  const spots = cityFeatures(cities.filter((c) => c.continent === 'Europe'));
  const dots = new PointLayer().source(spots).shape('simple').size(4).color('#ffffff');
  const layer = new PointLayer()
    .source(spots)
    .shape('name', 'text')
    .size(13)
    .color('#ffd166')
    .style({ stroke: '#ff6b6b', strokeWidth: 1.5, strokeOpacity: 1 });
  scene.addLayer(dots);
  scene.addLayer(layer);

  const set = (style: object): void => {
    layer.style(style);
    scene.render();
  };
  if (stage.bar) {
    select(stage.bar, 'stroke', ['#ff6b6b', '#4ecdc4', '#ffffff', '#000000'], '#ff6b6b', (stroke) => set({ stroke }));
    slider(stage.bar, 'strokeWidth', [0, 4, 0.25], 1.5, (strokeWidth) => set({ strokeWidth }));
    slider(stage.bar, 'strokeOpacity', [0, 1, 0.1], 1, (strokeOpacity) => set({ strokeOpacity }));
  } else cycle(stage, scene, [0, 1, 2, 3, 1.5], 700, (strokeWidth) => set({ strokeWidth }));

  return () => stage.dispose();
};

export default mount;
