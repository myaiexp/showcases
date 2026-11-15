// style({ lightEnable }): do the columns take part in lighting?
import { Scene, PointLayer } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { lattice, orbit, cycle } from '../../shared/point-data.ts';
import { toggle } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [10, 46], zoom: ctx.preview ? 3 : 3.4, pitch: 55 }),
  });
  await stage.ready(scene);

  const layer = new PointLayer()
    .source(lattice(ctx.preview ? 4 : 6, 3), { parser: { type: 'json', x: 'lng', y: 'lat' } })
    .shape('cylinder')
    .size('mag', (mag) => [14, 14, mag * 9])
    .color('mag', ['#2894E0', '#CFF6FF', '#FFF5B8', '#F27049'])
    .style({ lightEnable: true });
  scene.addLayer(layer);

  const set = (lightEnable: boolean): void => {
    layer.style({ lightEnable });
    scene.render();
  };
  if (stage.bar) toggle(stage.bar, 'lightEnable', true, set);
  else cycle(stage, scene, [true, false], 1400, set);
  if (stage.preview) orbit(stage, scene, { pitch: 55, turn: 40 });

  return () => stage.dispose();
};

export default mount;
