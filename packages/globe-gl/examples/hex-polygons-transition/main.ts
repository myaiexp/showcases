// Hexed Polygons: hexPolygonsTransitionDuration animates altitude, margin
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { rng } from '../../shared/places.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';
import { countries, type Country } from '../../shared/world.ts';

// h3-js throws "operation failed (code 1)" tiling North Korea's 110m outline, so it is left out.
const hexable = countries.filter((c) => c.properties.name !== 'North Korea');

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Every few seconds each country gets a new height and gap; hexagons slide and shrink between them.' });
  const dark = await texture('dark');

  let heights: number[] = [];
  let margins: number[] = [];
  let round = 0;
  const reroll = (): void => {
    const rand = rng(300 + round++);
    heights = countries.map(() => 0.002 + rand() ** 2 * 0.12);
    margins = countries.map(() => rand() * 0.7);
    globe
      .hexPolygonAltitude((d) => heights[(d as Country).properties.index]!)
      .hexPolygonMargin((d) => margins[(d as Country).properties.index]!);
  };

  const globe = stage.own(new Globe(stage.container))
    .globeImageUrl(dark)
    .hexPolygonsData(hexable)
    .hexPolygonResolution(2)
    .hexPolygonColor((d) => `hsl(${((d as Country).properties.index * 53) % 360}, 70%, 58%)`)
    .hexPolygonsTransitionDuration(1500);
  reroll();

  globe.pointOfView({ lat: 15, lng: 20, altitude: 2.3 });
  globe.controls().autoRotate = true;
  globe.controls().autoRotateSpeed = 0.7;

  stage.every(3800, reroll);
  if (stage.bar) {
    slider(stage.bar, 'Transition', 0, 4000, 100, 1500, (v) => globe.hexPolygonsTransitionDuration(v), (v) => `${v} ms`);
  }
  return stage.dispose;
};

export default mount;
