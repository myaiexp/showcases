// Hexed Polygons: hexPolygonAltitude lifts each country's hexagons by a value
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';
import { countries, type Country } from '../../shared/world.ts';

// h3-js throws "operation failed (code 1)" tiling North Korea's 110m outline, so it is left out.
const hexable = countries.filter((c) => c.properties.name !== 'North Korea');

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'All hexagons of one country share its height, which follows the root of its area.' });
  const dark = await texture('dark');

  let scale = 0.0015;
  const altitude = (d: object): number => 0.002 + Math.sqrt((d as Country).properties.area) * scale;

  const globe = stage.own(new Globe(stage.container))
    .globeImageUrl(dark)
    .hexPolygonsData(hexable)
    .hexPolygonResolution(2)
    .hexPolygonMargin(0.2)
    .hexPolygonAltitude(altitude)
    .hexPolygonColor((d) => `hsl(${200 - Math.min(160, Math.sqrt((d as Country).properties.area) * 1.4)}, 75%, 58%)`);

  globe.pointOfView({ lat: 10, lng: 20, altitude: 2.2 });
  globe.controls().autoRotate = true;
  globe.controls().autoRotateSpeed = 0.7;

  if (stage.bar) {
    slider(stage.bar, 'Height scale', 0, 0.004, 0.0002, scale, (v) => {
      scale = v;
      globe.hexPolygonAltitude(altitude);
    }, (v) => v.toFixed(4));
  }
  return stage.dispose;
};

export default mount;
