// Particles: particlesSize sets one size for every particle in a set
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { near, rng } from '../../shared/places.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';

interface ParticleSet {
  size: number;
  color: string;
  list: { lat: number; lng: number }[];
}

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Three sets, three sizes: the size belongs to the set, not to a single particle.' });
  const dark = await texture('dark');

  const rand = rng(11);
  const blob = (lat: number, lng: number, size: number, color: string): ParticleSet => ({
    size,
    color,
    list: Array.from({ length: 150 }, () => near(rand, lat, lng, 22)),
  });
  const sets = [blob(30, -30, 0.5, '#ffd166'), blob(0, 30, 1.2, '#5ec8ff'), blob(-10, 110, 2.4, '#ef476f')];

  let scale = 1;
  const globe = stage.own(new Globe(stage.container))
    .globeImageUrl(dark)
    // Each datum is a set; particlesList says which attribute holds its particles.
    .particlesData(sets)
    .particlesList('list')
    .particlesColor('color')
    // A function of the set: its own size times the slider's factor.
    .particlesSize((d) => (d as ParticleSet).size * scale);

  if (stage.bar) {
    slider(stage.bar, 'Size factor', 0.25, 3, 0.25, 1, (v) => {
      scale = v;
      globe.particlesSize(globe.particlesSize());
    }, (v) => `${v}x`);
  }

  globe.pointOfView({ lat: 15, lng: 30, altitude: 2.2 });
  globe.controls().autoRotate = true;
  globe.controls().autoRotateSpeed = 0.7;

  return stage.dispose;
};

export default mount;
