// Polygons: polygonStrokeColor outlines each border; a falsy value turns it off
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';
import { countries, type Country } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Strokes follow each country’s perimeter, coloured by hemisphere.' });
  const dark = await texture('dark');

  const stroke = (d: object): string => ((d as Country).properties.center[1] >= 0 ? '#ffd166' : '#7bdff2');
  // A falsy return value ('') disables the stroke for that polygon.
  const off = (): string => '';

  const globe = stage.own(new Globe(stage.container))
    .globeImageUrl(dark)
    .polygonsData(countries)
    .polygonAltitude(0.02)
    .polygonCapColor(() => 'rgba(30, 50, 80, 0.55)')
    .polygonSideColor(() => 'rgba(30, 50, 80, 0.2)')
    .polygonStrokeColor(stroke);

  globe.pointOfView({ lat: 25, lng: 30, altitude: 2.2 });
  globe.controls().autoRotate = true;
  globe.controls().autoRotateSpeed = 0.8;

  if (stage.bar) {
    checkbox(stage.bar, 'Stroke', true, (on) => globe.polygonStrokeColor(on ? stroke : off));
  } else {
    let on = true;
    stage.every(2500, () => globe.polygonStrokeColor((on = !on) ? stroke : off));
  }
  return stage.dispose;
};

export default mount;
