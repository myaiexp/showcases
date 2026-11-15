// Hexed Polygons: hexPolygonResolution picks the H3 level that tiles each country
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';
import { countries, type Country } from '../../shared/world.ts';

const region = countries.filter((c) => c.properties.center[1] > -20 && c.properties.center[1] < 60 && c.properties.center[0] > -36 && c.properties.center[0] < 60);

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Africa, Europe and West Asia. Level 1 hexagons are huge; every level up gives about seven times as many.' });
  const dark = await texture('dark');

  const globe = stage.own(new Globe(stage.container))
    .globeImageUrl(dark)
    .hexPolygonsData(region)
    .hexPolygonResolution(1)
    .hexPolygonMargin(0.25)
    .hexPolygonColor((d) => `hsl(${((d as Country).properties.index * 53) % 360}, 70%, 58%)`);

  globe.pointOfView({ lat: 15, lng: 20, altitude: 2.2 });
  globe.controls().autoRotate = true;
  globe.controls().autoRotateSpeed = 0.5;

  // Each level re-tiles every country, so cards only climb to level 2.
  const levels = [1, 2, 1, 2];
  let i = 0;
  if (stage.bar) {
    slider(stage.bar, 'Resolution', 0, 3, 1, 1, (v) => globe.hexPolygonResolution(v));
  } else {
    stage.every(3500, () => globe.hexPolygonResolution(levels[++i % levels.length]!));
  }
  return stage.dispose;
};

export default mount;
