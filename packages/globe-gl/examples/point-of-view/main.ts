// pointOfView: fly the camera between cities, with and without a transition
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { button, slider } from '../../shared/controls.ts';
import { cities, city } from '../../shared/places.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';

const TOUR = ['Helsinki', 'Tokyo', 'Sydney', 'São Paulo', 'New York', 'Cape Town', 'Reykjavík'];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each button calls pointOfView({ lat, lng, altitude }, ms).' });
  const day = await texture('day');

  const globe = stage.own(new Globe(stage.container))
    .globeImageUrl(day)
    .pointsData(cities)
    .pointColor(() => '#ff6b6b');

  let ms = 1500;
  let altitude = 1.2;
  // Each coordinate is optional: { altitude } alone zooms without turning.
  const fly = (name: string): void => {
    const c = city(name);
    globe.pointOfView({ lat: c.lat, lng: c.lng, altitude }, ms);
  };
  globe.pointOfView({ lat: 60, lng: 25, altitude });

  if (stage.bar) {
    for (const name of TOUR) button(stage.bar, name, () => fly(name));
    slider(stage.bar, 'ms', 0, 4000, 100, ms, (v) => (ms = v), (v) => `${v} ms`);
    slider(stage.bar, 'altitude', 0.3, 4, 0.1, altitude, (v) => {
      altitude = v;
      globe.pointOfView({ altitude: v }, 500);
    });
  } else {
    let i = 0;
    stage.every(2300, () => fly(TOUR[++i % TOUR.length]!));
  }

  return stage.dispose;
};

export default mount;
