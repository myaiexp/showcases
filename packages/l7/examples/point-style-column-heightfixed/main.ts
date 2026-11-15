// style({ heightfixed }): columns that keep their screen height while zooming
import { Scene, PointLayer } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { lattice } from '../../shared/point-data.ts';
import { slider, toggle } from '../../shared/controls.ts';
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
    .style({ heightfixed: true });
  scene.addLayer(layer);

  const zoomTo = (z: number): void => scene.setZoomAndCenter(z, [10, 46]);
  if (stage.bar) {
    toggle(stage.bar, 'heightfixed', true, (heightfixed) => {
      layer.style({ heightfixed });
      scene.render();
    });
    slider(stage.bar, 'zoom', [2, 5, 0.1], 3.4, zoomTo);
  } else stage.frame((t) => zoomTo(3.2 + Math.sin(t) * 0.5));

  return () => stage.dispose();
};

export default mount;
