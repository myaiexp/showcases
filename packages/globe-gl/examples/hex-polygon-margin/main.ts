// Hexed Polygons: hexPolygonMargin leaves a gap between neighbouring hexagons
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';
import { countries, type Country } from '../../shared/world.ts';

// h3-js throws "operation failed (code 1)" tiling North Korea's 110m outline, so it is left out.
const hexable = countries.filter((c) => c.properties.name !== 'North Korea');

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The margin is a fraction of each hexagon’s diameter: 0 is a seamless tiling, near 1 leaves tiny cells.' });
  const dark = await texture('dark');

  const globe = stage.own(new Globe(stage.container))
    .globeImageUrl(dark)
    .hexPolygonsData(hexable)
    .hexPolygonResolution(2)
    .hexPolygonMargin(0)
    .hexPolygonsTransitionDuration(900)
    .hexPolygonColor((d) => (((d as Country).properties.index % 2) ? '#6ee7ff' : '#ffd166'));

  globe.pointOfView({ lat: 20, lng: 20, altitude: 2.4 });
  globe.controls().autoRotate = true;
  globe.controls().autoRotateSpeed = 0.7;

  const margins = [0, 0.3, 0.6, 0.8];
  let i = 0;
  if (stage.bar) {
    slider(stage.bar, 'Margin', 0, 0.9, 0.05, 0, (v) => globe.hexPolygonMargin(v), (v) => v.toFixed(2));
  } else {
    stage.every(2500, () => globe.hexPolygonMargin(margins[++i % margins.length]!));
  }
  return stage.dispose;
};

export default mount;
