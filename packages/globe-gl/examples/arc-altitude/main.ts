// Arcs: arcAltitude null follows the distance, a number fixes the peak
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { city } from '../../shared/places.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';

const routes = [
  ['New York', 'London'],
  ['Tokyo', 'Sydney'],
  ['São Paulo', 'Lagos'],
  ['Los Angeles', 'Honolulu'],
  ['Delhi', 'Mumbai'],
  ['Paris', 'Berlin'],
  ['Cape Town', 'Nairobi'],
] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, {
    panes: ['arcAltitude: null (automatic)', 'arcAltitude: fixed'],
    hint: 'Left: short hops stay low and long ones rise high. Right: every arc peaks at the same height.',
  });
  const dark = await texture('dark');

  const links = routes.map(([from, to]) => {
    const a = city(from);
    const b = city(to);
    return { name: `${from} to ${to}`, startLat: a.lat, startLng: a.lng, endLat: b.lat, endLng: b.lng };
  });

  const [left, right] = stage.panes;
  const auto = stage.own(new Globe(left!.container), left)
    .globeImageUrl(dark)
    .arcsData(links)
    // null (the default): the peak follows the distance between the two ends.
    .arcAltitude(null)
    .arcColor(() => '#ffd166')
    .arcStroke(0.3);

  const fixed = stage.own(new Globe(right!.container), right)
    .globeImageUrl(dark)
    .arcsData(links)
    // A number: the peak, in globe radii, whatever the length.
    .arcAltitude(0.25)
    .arcColor(() => '#5ec8ff')
    .arcStroke(0.3);

  if (stage.bar) {
    slider(stage.bar, 'Fixed altitude', 0, 1, 0.01, 0.25, (v) => fixed.arcAltitude(v), (v) => v.toFixed(2));
  }

  for (const g of [auto, fixed]) {
    g.pointOfView({ lat: 25, lng: 20, altitude: stage.preview ? 3 : 2.9 });
    g.controls().autoRotate = true;
    g.controls().autoRotateSpeed = 0.7;
  }

  return stage.dispose;
};

export default mount;
