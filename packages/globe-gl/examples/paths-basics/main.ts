// Paths layer: pathsData as lists of [lat, lng] points joined by curved lines
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { city } from '../../shared/places.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';

const trips = [
  ['Beijing', 'Delhi', 'Tehran', 'Istanbul', 'Paris'],
  ['Cape Town', 'Johannesburg', 'Nairobi', 'Cairo', 'Madrid'],
  ['Los Angeles', 'Mexico City', 'Bogotá', 'Lima', 'Santiago'],
  ['Tokyo', 'Manila', 'Jakarta', 'Perth', 'Sydney'],
  ['Reykjavík', 'London', 'Berlin', 'Helsinki', 'Moscow'],
];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each path joins a list of [lat, lng] pairs, curving along the surface between them.' });
  const dark = await texture('dark');

  // The default pathPoints reads the datum itself, so each path is just its array of points:
  // [[lat, lng], [lat, lng], ...].
  const paths = trips.map((names) => names.map((n) => [city(n).lat, city(n).lng]));

  const globe = stage.own(new Globe(stage.container)).globeImageUrl(dark).pathsData(paths);

  globe.pointOfView({ lat: 20, lng: 30, altitude: 2.4 });
  globe.controls().autoRotate = true;
  globe.controls().autoRotateSpeed = 0.7;

  return stage.dispose;
};

export default mount;
