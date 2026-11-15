// Arcs: new arcsData animates, arcsTransitionDuration sets how long
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { button, slider } from '../../shared/controls.ts';
import { cities, rng } from '../../shared/places.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'A new set of arcs arrives every few seconds: new ones rise from the ground, old ones sink.' });
  const dark = await texture('dark');

  // The same sets of random links on every mount: set number n always draws the same arcs.
  const makeSet = (n: number) => {
    const rand = rng(100 + n);
    const hue = (n * 67) % 360;
    return Array.from({ length: 7 }, (_, i) => {
      const a = cities[Math.floor(rand() * cities.length)]!;
      const b = cities[Math.floor(rand() * cities.length)]!;
      return { name: `${a.name} to ${b.name}`, id: `${n}-${i}`, hue, startLat: a.lat, startLng: a.lng, endLat: b.lat, endLng: b.lng };
    });
  };

  let n = 0;
  const globe = stage.own(new Globe(stage.container))
    .globeImageUrl(dark)
    .arcsData(makeSet(n))
    .arcColor((d: object) => `hsl(${(d as { hue: number }).hue}, 90%, 62%)`)
    .arcStroke(0.35)
    .arcsTransitionDuration(1000);

  const next = (): void => {
    globe.arcsData(makeSet(++n));
    // Colour reads the data, so set it again for the new set.
    globe.arcColor(globe.arcColor());
  };
  stage.every(stage.preview ? 2500 : 3500, next);

  if (stage.bar) {
    slider(stage.bar, 'arcsTransitionDuration (ms)', 0, 3000, 100, 1000, (v) => globe.arcsTransitionDuration(v));
    button(stage.bar, 'New arcs now', next);
  }

  globe.pointOfView({ lat: 25, lng: 20, altitude: 2.5 });
  globe.controls().autoRotate = true;
  globe.controls().autoRotateSpeed = 0.5;

  return stage.dispose;
};

export default mount;
