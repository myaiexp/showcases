// new PointLayer({ minZoom, maxZoom }): show a layer only in a zoom range
import { Scene, PointLayer } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { cycle, lattice } from '../../shared/point-data.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [10, 46], zoom: ctx.preview ? 3 : 3.4 }),
  });
  await stage.ready(scene);

  const data = lattice(3, 2, 5, [10, 46]);
  const near = new PointLayer({ minZoom: 3, maxZoom: 4 })
    .source(data, { parser: { type: 'json', x: 'lng', y: 'lat' } })
    .shape('circle')
    .size(26)
    .color('#ffa842');
  const far = new PointLayer({ minZoom: 4 })
    .source(data, { parser: { type: 'json', x: 'lng', y: 'lat' } })
    .shape('hexagon')
    .size(26)
    .color('#5B8FF9');
  scene.addLayer(near);
  scene.addLayer(far);

  const out = stage.readout();
  const zoomTo = (z: number): void => {
    scene.setZoomAndCenter(z, [10, 46]);
    if (out) out.textContent = `zoom ${z.toFixed(1)}: ${z < 4 ? 'orange circles (minZoom 3, maxZoom 4)' : 'blue hexagons (minZoom 4)'}`;
  };
  if (stage.bar) slider(stage.bar, 'zoom', [2, 5.5, 0.1], 3.4, zoomTo);
  else cycle(stage, scene, [3.4, 3.8, 4.4, 4.8], 1400, zoomTo);

  return () => stage.dispose();
};

export default mount;
