// Arcs: arcDashLength, arcDashGap and arcDashAnimateTime send dashes along arcs
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
  const stage = createStage(el, ctx, { hint: 'Lengths are shares of the whole arc. An animate time of 0 stops the motion.' });
  const dark = await texture('dark');

  const links = routes.map(([from, to]) => {
    const a = city(from);
    const b = city(to);
    return { name: `${from} to ${to}`, startLat: a.lat, startLng: a.lng, endLat: b.lat, endLng: b.lng };
  });

  const globe = stage.own(new Globe(stage.container))
    .globeImageUrl(dark)
    .arcsData(links)
    .arcColor(() => ['#ffd166', '#ef476f'])
    .arcStroke(0.35)
    // Dash and gap, as shares of the arc, then the time one full trip takes.
    .arcDashLength(0.3)
    .arcDashGap(0.2)
    .arcDashAnimateTime(2500);

  if (stage.bar) {
    slider(stage.bar, 'Dash length', 0.05, 1, 0.05, 0.3, (v) => globe.arcDashLength(v), (v) => v.toFixed(2));
    slider(stage.bar, 'Gap', 0, 1, 0.05, 0.2, (v) => globe.arcDashGap(v), (v) => v.toFixed(2));
    slider(stage.bar, 'Animate time (ms)', 0, 6000, 250, 2500, (v) => globe.arcDashAnimateTime(v));
  }

  globe.pointOfView({ lat: 25, lng: 20, altitude: 2.4 });
  globe.controls().autoRotate = true;
  globe.controls().autoRotateSpeed = 0.5;

  return stage.dispose;
};

export default mount;
