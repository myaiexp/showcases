// style({ textAnchor }): where the label sits relative to its point
import { Scene, PointLayer } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { cities, cityFeatures } from '../../shared/data.ts';
import { cycle } from '../../shared/point-data.ts';
import { select } from '../../shared/controls.ts';
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
    .style({ textAnchor: 'center' });
  scene.addLayer(dots);
  scene.addLayer(layer);

  const anchors = ['center', 'top', 'top-left', 'top-right', 'bottom', 'bottom-left', 'bottom-right', 'left', 'right'] as const;
  const set = (textAnchor: (typeof anchors)[number]): void => {
    layer.style({ textAnchor });
    scene.render();
  };
  if (stage.bar) select(stage.bar, 'textAnchor', anchors, 'center', set);
  else cycle(stage, scene, anchors, 800, set);

  return () => stage.dispose();
};

export default mount;
