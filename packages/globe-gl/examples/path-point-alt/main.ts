// Paths: pathPointAlt lifts each point so a path can climb and descend
import { geoInterpolate } from 'd3-geo';
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { city } from '../../shared/places.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';

type Point = [lat: number, lng: number, altitude: number];

const flights = [
  ['New York', 'London'],
  ['Tokyo', 'Los Angeles'],
  ['Sydney', 'Singapore'],
  ['São Paulo', 'Cape Town'],
  ['Delhi', 'Paris'],
] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Every point is [lat, lng, shape]; pathPointAlt turns the shape into height.' });
  const dark = await texture('dark');

  // 24 points along the great circle between two cities; the third number is how far along (0 to 1).
  const paths: Point[][] = flights.map(([from, to]) => {
    const along = geoInterpolate([city(from).lng, city(from).lat], [city(to).lng, city(to).lat]);
    return Array.from({ length: 25 }, (_, i) => {
      const t = i / 24;
      const [lng, lat] = along(t);
      return [lat!, lng!, t];
    });
  });

  let peak = 0.3;
  const globe = stage.own(new Globe(stage.container))
    .globeImageUrl(dark)
    .pathsData(paths)
    // Altitude in globe radii: 0 on the ground, climbing to `peak` mid-way and back down.
    .pathPointAlt((p) => Math.sin((p as Point)[2] * Math.PI) * peak)
    .pathColor(() => ['#ffd166', '#ef476f'])
    .pathTransitionDuration(400);

  if (stage.bar) {
    slider(stage.bar, 'Peak altitude', 0, 0.8, 0.05, peak, (v) => {
      peak = v;
      // The accessor reads `peak`, so set it again to repaint.
      globe.pathPointAlt(globe.pathPointAlt());
    }, (v) => v.toFixed(2));
  }

  globe.pointOfView({ lat: 25, lng: 10, altitude: 2.7 });
  globe.controls().autoRotate = true;
  globe.controls().autoRotateSpeed = 0.7;

  return stage.dispose;
};

export default mount;
