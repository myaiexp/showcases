// style({ pickLight }): should a highlighted column keep its lighting?
import { Scene, PointLayer } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { lattice } from '../../shared/point-data.ts';
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
    .color('#4aa3ff')
    .active({ color: '#ffd166' })
    .style({ pickLight: true });
  scene.addLayer(layer);

  if (stage.bar) {
    toggle(stage.bar, 'pickLight', true, (pickLight) => {
      layer.style({ pickLight });
      scene.render();
    });
  } else {
    // A ghost pointer hovers columns of the card's 4 x 3 lattice, one after another.
    const ghost = stage.ghost(scene);
    const at = (i: number): [number, number] => [10 + ((i % 4) - 1.5) * 5.6, 46 + (1 - (Math.floor(i / 4) % 3)) * 4];
    stage.every(900, (i) => ghost.moveTo(at(i * 5)));
  }

  return () => stage.dispose();
};

export default mount;
