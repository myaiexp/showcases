// Particles layer: particlesData is a list of sets of lat/lng points
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { near, randomSpot, rng } from '../../shared/places.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';

interface Particle {
  lat: number;
  lng: number;
}

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Two sets of dots floating just above the surface, drawn with every default: white, size 0.5, altitude 0.01.' });
  const dark = await texture('dark');

  const rand = rng(5);
  // The default particlesList reads the datum itself, so each set is an array of particle objects.
  const scattered: Particle[] = Array.from({ length: 300 }, () => randomSpot(rand));
  const cluster: Particle[] = Array.from({ length: 200 }, () => near(rand, 20, 20, 25));

  const globe = stage.own(new Globe(stage.container))
    .globeImageUrl(dark)
    .particlesData([scattered, cluster]);

  globe.pointOfView({ lat: 20, lng: 20, altitude: 1.9 });
  globe.controls().autoRotate = true;
  globe.controls().autoRotateSpeed = 0.7;

  return stage.dispose;
};

export default mount;
