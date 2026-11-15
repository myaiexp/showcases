// Arcs: arcStartLat and friends read any data shape by name or function
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { city } from '../../shared/places.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';

// Not the default field names: nested places, and a label in `title`.
interface Flight {
  title: string;
  from: { lat: number; lon: number };
  toLat: number;
  toLon: number;
}

const pairs = [
  ['Tokyo', 'Los Angeles'],
  ['Los Angeles', 'Mexico City'],
  ['Mexico City', 'Madrid'],
  ['Madrid', 'Cairo'],
  ['Cairo', 'Delhi'],
  ['Delhi', 'Singapore'],
  ['Singapore', 'Sydney'],
] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The data has nested starts and its own field names; the accessors say where to look.' });
  const dark = await texture('dark');

  const flights: Flight[] = pairs.map(([a, b]) => ({
    title: `${a} to ${b}`,
    from: { lat: city(a).lat, lon: city(a).lng },
    toLat: city(b).lat,
    toLon: city(b).lng,
  }));

  const globe = stage.own(new Globe(stage.container))
    .globeImageUrl(dark)
    .arcsData(flights)
    // A function for the nested start, an attribute name for the end, a constant for the altitudes.
    .arcStartLat((d) => (d as Flight).from.lat)
    .arcStartLng((d) => (d as Flight).from.lon)
    .arcEndLat('toLat')
    .arcEndLng('toLon')
    .arcStartAltitude(0.02)
    .arcEndAltitude(0.02)
    // The tooltip reads `name` unless told otherwise.
    .arcLabel('title')
    .arcColor(() => ['#08f7fe', '#fe53bb'])
    .arcStroke(0.35);

  globe.pointOfView({ lat: 20, lng: 100, altitude: 2.6 });
  globe.controls().autoRotate = true;
  globe.controls().autoRotateSpeed = 0.7;

  return stage.dispose;
};

export default mount;
