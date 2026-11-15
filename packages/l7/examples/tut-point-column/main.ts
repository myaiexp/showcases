// Columns of four shapes, colored by name, heights from a field
import { Scene, PointLayer } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { lattice, orbit } from '../../shared/point-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [10, 46], zoom: ctx.preview ? 3 : 3.4, pitch: 55 }),
  });
  await stage.ready(scene);

  const kinds = ['cylinder', 'triangleColumn', 'hexagonColumn', 'squareColumn'];
  // unit_price and name stand in for the docs' rows: a price per place and a kind of place.
  const data = lattice(ctx.preview ? 4 : 6, 3).map((p) => ({ ...p, name: kinds[p.id % 4], unit_price: 8000 + p.mag * 7000 }));
  const layer = new PointLayer()
    .source(data, { parser: { type: 'json', x: 'lng', y: 'lat' } })
    .shape('name', kinds)
    .color('name', ['#739DFF', '#61FCBF', '#FFDE74', '#FF896F'])
    .size('unit_price', (h) => [12, 12, h / 1000]);
  scene.addLayer(layer);

  if (stage.preview) orbit(stage, scene, { pitch: 55, turn: 40 });

  return () => stage.dispose();
};

export default mount;
