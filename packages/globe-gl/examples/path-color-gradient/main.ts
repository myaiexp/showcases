// Paths: pathColor as an array or a function of t gives a gradient along a path
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { city } from '../../shared/places.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';

const trips = [
  ['Beijing', 'Delhi', 'Tehran', 'Istanbul', 'Paris'],
  ['Cape Town', 'Johannesburg', 'Nairobi', 'Cairo', 'Madrid'],
  ['Tokyo', 'Manila', 'Jakarta', 'Perth', 'Sydney'],
];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, {
    panes: ['pathColor: array of colours', 'pathColor: function of t'],
    hint: 't runs from 0 at the first point to 1 at the last.',
  });
  const dark = await texture('dark');

  const paths = trips.map((names) => names.map((n) => [city(n).lat, city(n).lng]));

  const [left, right] = stage.panes;
  const stops = stage.own(new Globe(left!.container), left)
    .globeImageUrl(dark)
    .pathsData(paths)
    // Colours blended evenly along the path.
    .pathColor(() => ['#ffd166', '#ef476f', '#7b2ff7']);

  const fn = stage.own(new Globe(right!.container), right)
    .globeImageUrl(dark)
    .pathsData(paths)
    // An interpolator t => colour (the accessor returns it, once per path).
    .pathColor(() => (t: number) => `hsl(${Math.round(180 + 180 * t)}, 90%, ${Math.round(75 - 25 * t)}%)`);

  for (const g of [stops, fn]) {
    g.pointOfView({ lat: 10, lng: 40, altitude: stage.preview ? 3 : 2.8 });
    g.controls().autoRotate = true;
    g.controls().autoRotateSpeed = 0.8;
  }

  return stage.dispose;
};

export default mount;
