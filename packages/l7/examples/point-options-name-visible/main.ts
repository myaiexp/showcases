// new PointLayer({ name, visible }): find a layer by name, start it hidden
import { Scene, PointLayer } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { lattice, cycle } from '../../shared/point-data.ts';
import { toggle } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [10, 46], zoom: ctx.preview ? 3 : 3.4 }),
  });
  await stage.ready(scene);

  // The full view starts hidden; cards start shown so they are never blank.
  const layer = new PointLayer({ name: 'cities', visible: ctx.preview })
    .source(lattice(ctx.preview ? 4 : 6, 3), { parser: { type: 'json', x: 'lng', y: 'lat' } })
    .shape('circle')
    .size(ctx.preview ? 20 : 28)
    .color('#4ecdc4');
  scene.addLayer(layer);

  const out = stage.readout();
  const flip = (on: boolean): void => {
    const found = scene.getLayerByName('cities');
    if (on) found?.show();
    else found?.hide();
    if (out) out.textContent = `getLayerByName('cities') -> ${found ? 'layer' : 'undefined'}, visible: ${on}`;
  };
  if (stage.bar) toggle(stage.bar, 'visible', false, flip);
  else cycle(stage, scene, [true, false], 1200, flip);

  return () => stage.dispose();
};

export default mount;
