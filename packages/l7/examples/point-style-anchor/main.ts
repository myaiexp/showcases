// style({ anchor }): which part of the shape sits on the coordinate
import { Scene, PointLayer } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { cycle } from '../../shared/point-data.ts';
import { select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [10, 46], zoom: ctx.preview ? 4.2 : 5 }),
  });
  await stage.ready(scene);

  const spot = [{ lng: 10, lat: 46 }];
  const layer = new PointLayer()
    .source(spot, { parser: { type: 'json', x: 'lng', y: 'lat' } })
    .shape('circle')
    .size(ctx.preview ? 30 : 44)
    .color('#5B8FF9')
    .style({ opacity: 0.8, anchor: 'bottom' });
  const mark = new PointLayer().source(spot, { parser: { type: 'json', x: 'lng', y: 'lat' } }).shape('simple').size(6).color('#ffffff');
  scene.addLayer(layer);
  scene.addLayer(mark);

  const anchors = ['center', 'top', 'top-left', 'top-right', 'bottom', 'bottom-left', 'bottom-right', 'left', 'right'] as const;
  const set = (anchor: (typeof anchors)[number]): void => {
    layer.style({ anchor });
    scene.render();
  };
  if (stage.bar) select(stage.bar, 'anchor', anchors, 'bottom', set);
  else cycle(stage, scene, anchors, 700, set);

  return () => stage.dispose();
};

export default mount;
