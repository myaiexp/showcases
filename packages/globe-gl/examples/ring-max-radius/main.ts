// Rings: ringMaxRadius is the angular radius where each ring stops, per ring
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { cities, type City } from '../../shared/places.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Bigger cities send rings further. The radius is in degrees of arc on the globe.' });
  const dark = await texture('dark');

  let scale = 0.5;
  const globe = stage.own(new Globe(stage.container))
    .globeImageUrl(dark)
    .ringsData(cities.filter((c) => c.pop >= 9))
    // A function of the datum: population (millions) times a scale, in degrees.
    .ringMaxRadius((d) => (d as City).pop * scale)
    .ringPropagationSpeed(6)
    .ringColor(() => '#5ec8ff');

  if (stage.bar) {
    slider(stage.bar, 'Degrees per million people', 0.1, 1, 0.05, scale, (v) => {
      scale = v;
      // The accessor reads `scale`, so set it again.
      globe.ringMaxRadius(globe.ringMaxRadius());
    }, (v) => v.toFixed(2));
  }

  globe.pointOfView({ lat: 25, lng: 60, altitude: 2.4 });
  globe.controls().autoRotate = true;
  globe.controls().autoRotateSpeed = 0.5;

  return stage.dispose;
};

export default mount;
