// Paths: pathPoints, pathPointLat and pathPointLng read points of any shape
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { city } from '../../shared/places.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';

interface Route {
  name: string;
  waypoints: { latitude: number; longitude: number }[];
}

const trips = [
  ['Beijing', 'Delhi', 'Tehran', 'Istanbul', 'Paris'],
  ['Cape Town', 'Johannesburg', 'Nairobi', 'Cairo', 'Madrid'],
  ['Los Angeles', 'Mexico City', 'Bogotá', 'Lima', 'Santiago'],
  ['Tokyo', 'Manila', 'Jakarta', 'Perth', 'Sydney'],
];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Points here are {latitude, longitude} objects inside each route; hover a path for its name.' });
  const dark = await texture('dark');

  const routes: Route[] = trips.map((names) => ({
    name: `${names[0]} to ${names[names.length - 1]}`,
    waypoints: names.map((n) => ({ latitude: city(n).lat, longitude: city(n).lng })),
  }));

  const globe = stage.own(new Globe(stage.container))
    .globeImageUrl(dark)
    .pathsData(routes)
    // The list of points is an attribute of each route (it would be the datum itself by default).
    .pathPoints('waypoints')
    // Each point's coordinates, by attribute name here and by function below.
    .pathPointLat('latitude')
    .pathPointLng((p) => (p as Route['waypoints'][number]).longitude)
    .pathColor(() => ['#08f7fe', '#fe53bb'])
    .pathLabel((d) => `<b>${(d as Route).name}</b>`);

  globe.pointOfView({ lat: 10, lng: 40, altitude: 2.6 });
  globe.controls().autoRotate = true;
  globe.controls().autoRotateSpeed = 0.7;

  return stage.dispose;
};

export default mount;
