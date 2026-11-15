// Polygons: polygonAltitude extrudes each country by a value, scaled by a slider
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';
import { countries, type Country } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Height follows the square root of each country’s area. Tilt the globe to see the sides.' });
  const dark = await texture('dark');

  let scale = 0.0016;
  const altitude = (d: object): number => Math.sqrt((d as Country).properties.area) * scale;

  const globe = stage.own(new Globe(stage.container))
    .globeImageUrl(dark)
    .polygonsData(countries)
    .polygonCapColor(() => '#3c9bd6')
    .polygonSideColor(() => '#1d4e75')
    .polygonStrokeColor(() => '#0b1622')
    .polygonAltitude(altitude)
    .polygonsTransitionDuration(500);

  globe.pointOfView({ lat: 10, lng: 15, altitude: 2.3 });
  globe.controls().autoRotate = true;
  globe.controls().autoRotateSpeed = 0.8;

  if (stage.bar) {
    slider(stage.bar, 'Height scale', 0, 0.004, 0.0002, scale, (v) => {
      scale = v;
      globe.polygonAltitude(altitude);
    }, (v) => v.toFixed(4));
  }
  return stage.dispose;
};

export default mount;
