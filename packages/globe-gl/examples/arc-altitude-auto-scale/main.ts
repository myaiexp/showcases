// Arcs: arcAltitudeAutoScale sets automatic height as a share of ground length
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
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

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: '1 means an arc is as high as it is long on the ground. Only used while arcAltitude is null.' });
  const dark = await texture('dark');

  const links = routes.map(([from, to]) => {
    const a = city(from);
    const b = city(to);
    return { name: `${from} to ${to}`, startLat: a.lat, startLng: a.lng, endLat: b.lat, endLng: b.lng };
  });

  const globe = stage.own(new Globe(stage.container))
    .globeImageUrl(dark)
    .arcsData(links)
    .arcAltitude(null)
    .arcAltitudeAutoScale(0.5)
    .arcColor(() => '#ff9f6b')
    .arcStroke(0.3)
    .arcsTransitionDuration(300);

  if (stage.bar) {
    slider(stage.bar, 'arcAltitudeAutoScale', 0.05, 1.5, 0.05, 0.5, (v) => globe.arcAltitudeAutoScale(v), (v) => v.toFixed(2));
  } else {
    // A card has no slider: step the scale through a few values instead (the arcs glide between them).
    const steps = [0.2, 0.5, 0.9, 0.5];
    let i = 0;
    stage.every(1800, () => globe.arcAltitudeAutoScale(steps[++i % steps.length]!));
  }

  globe.pointOfView({ lat: 25, lng: 20, altitude: 2.6 });
  globe.controls().autoRotate = true;
  globe.controls().autoRotateSpeed = 0.6;

  return stage.dispose;
};

export default mount;
