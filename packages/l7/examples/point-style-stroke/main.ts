// stroke, strokeWidth and strokeOpacity: the outline of 2D shapes
import { Scene, PointLayer } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { lattice, cycle } from '../../shared/point-data.ts';
import { select, slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [10, 46], zoom: ctx.preview ? 3 : 3.4 }),
  });
  await stage.ready(scene);

  const layer = new PointLayer()
    .source(lattice(ctx.preview ? 4 : 6, 3), { parser: { type: 'json', x: 'lng', y: 'lat' } })
    .shape('hexagon')
    .size(ctx.preview ? 22 : 30)
    .color('#24425f')
    .style({ stroke: '#ffd166', strokeWidth: 3, strokeOpacity: 1 });
  scene.addLayer(layer);

  const set = (style: object): void => {
    layer.style(style);
    scene.render();
  };
  if (stage.bar) {
    select(stage.bar, 'stroke', ['#ffd166', '#ff6b6b', '#4ecdc4', '#ffffff'], '#ffd166', (stroke) => set({ stroke }));
    slider(stage.bar, 'strokeWidth', [0, 8, 0.5], 3, (strokeWidth) => set({ strokeWidth }));
    slider(stage.bar, 'strokeOpacity', [0, 1, 0.1], 1, (strokeOpacity) => set({ strokeOpacity }));
  } else cycle(stage, scene, [0, 2, 5, 8, 4], 600, (strokeWidth) => set({ strokeWidth }));

  return () => stage.dispose();
};

export default mount;
