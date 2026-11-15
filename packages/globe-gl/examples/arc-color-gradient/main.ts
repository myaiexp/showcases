// Arcs: arcColor as an array of colours blends them along each arc
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { city } from '../../shared/places.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';

const routes = [
  ['New York', 'London'],
  ['London', 'Cairo'],
  ['Tokyo', 'Sydney'],
  ['São Paulo', 'Lagos'],
  ['Los Angeles', 'Tokyo'],
  ['Delhi', 'Moscow'],
  ['Cape Town', 'Rio de Janeiro'],
  ['Paris', 'Singapore'],
] as const;

const palettes = {
  'two stops': ['#ff5d73', '#5ec8ff'],
  'three stops': ['#ffd166', '#ef476f', '#7b2ff7'],
  'five stops': ['#08f7fe', '#09fbd3', '#fe53bb', '#f5d300', '#ff2a6d'],
} as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each arc runs through the palette from its start to its end.' });
  const dark = await texture('dark');

  const links = routes.map(([from, to]) => {
    const a = city(from);
    const b = city(to);
    return { name: `${from} to ${to}`, startLat: a.lat, startLng: a.lng, endLat: b.lat, endLng: b.lng };
  });

  const globe = stage.own(new Globe(stage.container))
    .globeImageUrl(dark)
    .arcsData(links)
    // An array of colours: one gradient along each arc. The accessor returns the same array for every arc.
    .arcColor(() => [...palettes['three stops']])
    .arcStroke(0.45);

  if (stage.bar) {
    select(stage.bar, 'Palette', Object.keys(palettes) as (keyof typeof palettes)[], (name) => {
      globe.arcColor(() => [...palettes[name]]);
    }, 'three stops');
  }

  globe.pointOfView({ lat: 25, lng: 20, altitude: 2.4 });
  globe.controls().autoRotate = true;
  globe.controls().autoRotateSpeed = 0.7;

  return stage.dispose;
};

export default mount;
