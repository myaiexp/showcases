// Arcs: arcStroke null draws a 1px line, a number draws a tube
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
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
] as const;

const mount: Mount = async (el, ctx) => {
  // In a small card a 0.5° tube is thinner than a pixel, so cards use a thicker one.
  const width = ctx.preview ? 1.5 : 0.5;
  const stage = createStage(el, ctx, {
    panes: ['arcStroke: null', `arcStroke: ${width}`],
    hint: 'Zoom in or out: the line stays 1px wide, the tube grows and shrinks with the globe.',
  });
  const dark = await texture('dark');

  const links = routes.map(([from, to]) => {
    const a = city(from);
    const b = city(to);
    return { name: `${from} to ${to}`, startLat: a.lat, startLng: a.lng, endLat: b.lat, endLng: b.lng };
  });

  const [left, right] = stage.panes;
  const line = stage.own(new Globe(left!.container), left)
    .globeImageUrl(dark)
    .arcsData(links)
    // null: a Three.js Line of constant 1px width.
    .arcStroke(null)
    .arcColor(() => '#ffd166');

  const tube = stage.own(new Globe(right!.container), right)
    .globeImageUrl(dark)
    .arcsData(links)
    // A number: the tube's diameter in angular degrees.
    .arcStroke(width)
    .arcColor(() => '#5ec8ff');

  if (stage.bar) {
    slider(stage.bar, 'Tube diameter (deg)', 0.1, 2, 0.1, 0.5, (v) => tube.arcStroke(v), (v) => v.toFixed(1));
  }

  for (const g of [line, tube]) {
    g.pointOfView({ lat: 25, lng: 20, altitude: stage.preview ? 3 : 2.9 });
    g.controls().autoRotate = true;
    g.controls().autoRotateSpeed = 0.7;
  }

  return stage.dispose;
};

export default mount;
