// pointsTransitionDuration: columns grow, shrink and move to new values over time
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { cities, rng } from '../../shared/places.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';

interface Reading {
  name: string;
  lat: number;
  lng: number;
  value: number;
}

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Every two seconds each city gets a new value; new columns rise from the ground.' });
  const day = await texture('day');
  const rand = rng(3);

  // A random subset of cities with fresh values: some stay, some leave, some arrive.
  const readings = (): Reading[] =>
    cities.filter(() => rand() > 0.35).map((c) => ({ name: c.name, lat: c.lat, lng: c.lng, value: rand() }));

  const globe = stage.own(new Globe(stage.container))
    .globeImageUrl(day)
    .pointsData(readings())
    .pointAltitude((d) => 0.02 + (d as Reading).value * 0.3)
    .pointRadius((d) => 0.4 + (d as Reading).value * 0.8)
    .pointColor((d) => `hsl(${20 + (d as Reading).value * 40}, 100%, 60%)`)
    .pointsTransitionDuration(1200);
  globe.controls().autoRotate = true;

  if (stage.bar) {
    slider(stage.bar, 'pointsTransitionDuration', 0, 3000, 100, 1200, (v) => globe.pointsTransitionDuration(v), (v) => `${v} ms`);
  }
  stage.every(2000, () => globe.pointsData(readings()));

  return stage.dispose;
};

export default mount;
