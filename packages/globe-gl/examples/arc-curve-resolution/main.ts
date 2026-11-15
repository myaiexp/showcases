// Arcs: arcCurveResolution is how many straight segments make each curve
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { city } from '../../shared/places.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';

const routes = [
  ['New York', 'London'],
  ['Tokyo', 'Sydney'],
  ['São Paulo', 'Lagos'],
  ['Los Angeles', 'Tokyo'],
  ['Delhi', 'Moscow'],
  ['Cape Town', 'Rio de Janeiro'],
] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, {
    panes: ['arcCurveResolution: 4', 'arcCurveResolution: 64 (default)'],
    hint: 'Four segments leave visible corners; 64 reads as a smooth curve.',
  });
  const dark = await texture('dark');

  const links = routes.map(([from, to]) => {
    const a = city(from);
    const b = city(to);
    return { name: `${from} to ${to}`, startLat: a.lat, startLng: a.lng, endLat: b.lat, endLng: b.lng };
  });

  const [left, right] = stage.panes;
  const coarse = stage.own(new Globe(left!.container), left)
    .globeImageUrl(dark)
    .arcsData(links)
    .arcCurveResolution(4)
    .arcColor(() => '#ffd166')
    .arcStroke(0.3);

  const smooth = stage.own(new Globe(right!.container), right)
    .globeImageUrl(dark)
    .arcsData(links)
    .arcCurveResolution(64)
    .arcColor(() => '#5ec8ff')
    .arcStroke(0.3);

  if (stage.bar) {
    slider(stage.bar, 'Left pane segments', 1, 64, 1, 4, (v) => coarse.arcCurveResolution(v));
  }

  for (const g of [coarse, smooth]) {
    g.pointOfView({ lat: 25, lng: 20, altitude: stage.preview ? 3 : 2.9 });
    g.controls().autoRotate = true;
    g.controls().autoRotateSpeed = 0.7;
  }

  return stage.dispose;
};

export default mount;
