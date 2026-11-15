// Hexed Polygons: hexPolygonsData tiles countries with hexagons, one colour each
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';
import { countries, type Country } from '../../shared/world.ts';

// h3-js throws "operation failed (code 1)" tiling North Korea's 110m outline, so it is left out.
const hexable = countries.filter((c) => c.properties.name !== 'North Korea');

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each country is approximated by H3 hexagons (resolution 3 here, the default).' });
  const dark = await texture('dark');

  // Cards use the coarser level 2 so the tiling stays quick on small machines.
  const globe = stage.own(new Globe(stage.container))
    .globeImageUrl(dark)
    .hexPolygonsData(hexable)
    .hexPolygonResolution(stage.preview ? 2 : 3)
    .hexPolygonMargin(0.3)
    .hexPolygonColor((d) => `hsl(${((d as Country).properties.index * 53) % 360}, 70%, 58%)`)
    .hexPolygonLabel((d) => (d as Country).properties.name);

  globe.pointOfView({ lat: 20, lng: 20, altitude: 2.4 });
  globe.controls().autoRotate = true;
  globe.controls().autoRotateSpeed = 0.7;
  return stage.dispose;
};

export default mount;
