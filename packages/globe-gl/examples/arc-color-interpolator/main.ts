// Arcs: arcColor returning a function of t colours each arc point by point
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { city } from '../../shared/places.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';

const routes = [
  ['New York', 'London'],
  ['London', 'Cairo'],
  ['Tokyo', 'Sydney'],
  ['São Paulo', 'Lagos'],
  ['Los Angeles', 'Tokyo'],
  ['Delhi', 'Moscow'],
  ['Cape Town', 'Rio de Janeiro'],
  ['Paris', 'Singapore'],
] as const;

type Interpolator = (t: number) => string;
const looks: Record<string, Interpolator> = {
  'fade out': (t) => `rgba(255, 190, 80, ${1 - t})`,
  'hue sweep': (t) => `hsl(${Math.round(200 + 160 * t)}, 90%, 60%)`,
  'pulse bands': (t) => (Math.floor(t * 8) % 2 === 0 ? '#ff5d73' : '#ffd166'),
};

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The colour is computed per point along the arc, not per arc.' });
  const dark = await texture('dark');

  const links = routes.map(([from, to]) => {
    const a = city(from);
    const b = city(to);
    return { name: `${from} to ${to}`, startLat: a.lat, startLng: a.lng, endLat: b.lat, endLng: b.lng };
  });

  const globe = stage.own(new Globe(stage.container))
    .globeImageUrl(dark)
    .arcsData(links)
    // The accessor returns an interpolator function t => colour; it is called along the whole arc.
    .arcColor(() => looks['fade out']!)
    .arcStroke(0.45);

  if (stage.bar) {
    select(stage.bar, 'Interpolator', Object.keys(looks), (name) => {
      globe.arcColor(() => looks[name]!);
    });
  }

  globe.pointOfView({ lat: 25, lng: 20, altitude: 2.4 });
  globe.controls().autoRotate = true;
  globe.controls().autoRotateSpeed = 0.7;

  return stage.dispose;
};

export default mount;
