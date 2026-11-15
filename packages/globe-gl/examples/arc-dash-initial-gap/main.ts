// Arcs: arcDashInitialGap offsets where each arc's dash pattern starts
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { city } from '../../shared/places.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';

const routes = [
  ['New York', 'London'],
  ['New York', 'Paris'],
  ['New York', 'Madrid'],
  ['New York', 'Lagos'],
  ['New York', 'Cairo'],
  ['New York', 'Istanbul'],
  ['New York', 'Moscow'],
  ['New York', 'Helsinki'],
] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Eight arcs from one city. With the offset on, each starts a little later than the last.' });
  const dark = await texture('dark');

  const links = routes.map(([from, to], i) => {
    const a = city(from);
    const b = city(to);
    return { name: `${from} to ${to}`, i, startLat: a.lat, startLng: a.lng, endLat: b.lat, endLng: b.lng };
  });

  let staggered = true;
  const globe = stage.own(new Globe(stage.container))
    .globeImageUrl(dark)
    .arcsData(links)
    .arcColor(() => '#5ec8ff')
    .arcStroke(0.4)
    .arcDashLength(0.15)
    .arcDashGap(0.85)
    .arcDashAnimateTime(2400)
    // A gap before the first dash: 0 for all, or a different share per arc.
    .arcDashInitialGap((d) => (staggered ? (d as (typeof links)[number]).i / links.length : 0));

  if (stage.bar) {
    checkbox(stage.bar, 'Stagger the initial gap', true, (on) => {
      staggered = on;
      // Accessors are read again only when set.
      globe.arcDashInitialGap(globe.arcDashInitialGap());
    });
  }

  globe.pointOfView({ lat: 45, lng: -20, altitude: 2.2 });
  globe.controls().autoRotate = true;
  globe.controls().autoRotateSpeed = 0.4;

  return stage.dispose;
};

export default mount;
