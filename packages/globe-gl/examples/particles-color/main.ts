// Particles: particlesColor gives each set its own colour
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { near, rng } from '../../shared/places.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';

interface ParticleSet {
  name: string;
  colors: Record<string, string>;
  list: { lat: number; lng: number }[];
}

const schemes = ['warm', 'cool'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Five sets, five colours. The colour is read per set, from an attribute or a function.' });
  const dark = await texture('dark');

  const rand = rng(31);
  const set = (name: string, lat: number, lng: number, warm: string, cool: string): ParticleSet => ({
    name,
    colors: { warm, cool },
    list: Array.from({ length: 120 }, () => near(rand, lat, lng, 18)),
  });
  const sets = [
    set('north', 55, 20, '#ffd166', '#08f7fe'),
    set('west', 20, -80, '#ef476f', '#5ec8ff'),
    set('east', 25, 100, '#ff9f6b', '#7b2ff7'),
    set('south', -25, 25, '#f5d300', '#09fbd3'),
    set('pacific', -10, -150, '#ff5d73', '#fe53bb'),
  ];

  let scheme: (typeof schemes)[number] = 'warm';
  const globe = stage.own(new Globe(stage.container))
    .globeImageUrl(dark)
    .particlesData(sets)
    .particlesList('list')
    .particlesSize(1.6)
    .particlesColor((d) => (d as ParticleSet).colors[scheme]!);

  if (stage.bar) {
    select(stage.bar, 'Scheme', schemes, (v) => {
      scheme = v;
      globe.particlesColor(globe.particlesColor());
    });
  } else {
    // Cards swap schemes on a timer.
    stage.every(2500, () => {
      scheme = scheme === 'warm' ? 'cool' : 'warm';
      globe.particlesColor(globe.particlesColor());
    });
  }

  globe.pointOfView({ lat: 20, lng: 20, altitude: 2.3 });
  globe.controls().autoRotate = true;
  globe.controls().autoRotateSpeed = 0.9;

  return stage.dispose;
};

export default mount;
