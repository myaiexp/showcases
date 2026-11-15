// stroke, strokeWidth, strokeOpacity on the simple sprite shape
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
    map: new Map({ center: [12, 48], zoom: ctx.preview ? 3.6 : 4.4 }),
  });
  await stage.ready(scene);

  const data = lattice(ctx.preview ? 4 : 6, 3, 3, [12, 48]);
  const layer = new PointLayer()
    .source(data, { parser: { type: 'json', x: 'lng', y: 'lat' } })
    .shape('simple')
    .size(20)
    .color('#5B8FF9')
    .style({ stroke: '#ffd166', strokeWidth: 4, strokeOpacity: 1 });
  scene.addLayer(layer);

  const set = (style: object): void => {
    layer.style(style);
    scene.render();
  };
  if (stage.bar) {
    select(stage.bar, 'stroke', ['#ffd166', '#ff6b6b', '#ffffff'], '#ffd166', (stroke) => set({ stroke }));
    slider(stage.bar, 'strokeWidth', [0, 10, 1], 4, (strokeWidth) => set({ strokeWidth }));
    slider(stage.bar, 'strokeOpacity', [0, 1, 0.1], 1, (strokeOpacity) => set({ strokeOpacity }));
  } else cycle(stage, scene, [0, 3, 6, 9, 3], 600, (strokeWidth) => set({ strokeWidth }));

  return () => stage.dispose();
};

export default mount;
