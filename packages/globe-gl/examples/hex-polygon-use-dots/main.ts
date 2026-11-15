// Hexed Polygons: hexPolygonUseDots draws circles, hexPolygonDotResolution smooths
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { checkbox, slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';
import { countries } from '../../shared/world.ts';

// h3-js throws "operation failed (code 1)" tiling North Korea's 110m outline, so it is left out.
const hexable = countries.filter((c) => c.properties.name !== 'North Korea');

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Dots replace the hexagons. Dot resolution is how many slices make up each circle: 3 is a triangle.' });
  const dark = await texture('dark');

  const globe = stage.own(new Globe(stage.container))
    .globeImageUrl(dark)
    .hexPolygonsData(hexable)
    .hexPolygonResolution(stage.preview ? 2 : 3)
    .hexPolygonMargin(0.2)
    .hexPolygonUseDots(true)
    .hexPolygonDotResolution(12)
    .hexPolygonColor(() => '#7bdff2');

  globe.pointOfView({ lat: 20, lng: 20, altitude: 2.4 });
  globe.controls().autoRotate = true;
  globe.controls().autoRotateSpeed = 0.7;

  const slices = [3, 5, 8, 24];
  let i = 0;
  if (stage.bar) {
    checkbox(stage.bar, 'Use dots', true, (on) => globe.hexPolygonUseDots(on));
    slider(stage.bar, 'Dot resolution', 3, 30, 1, 12, (v) => globe.hexPolygonDotResolution(v));
  } else {
    stage.every(2500, () => globe.hexPolygonDotResolution(slices[++i % slices.length]!));
  }
  return stage.dispose;
};

export default mount;
