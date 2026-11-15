// Polygons: polygonsTransitionDuration animates altitude as countries rise, fall
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { button, slider } from '../../shared/controls.ts';
import { rng } from '../../shared/places.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';
import { countries, type Country } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Every few seconds each country gets a new random height and glides there.' });
  const dark = await texture('dark');

  let heights: number[] = [];
  let round = 0;
  const reroll = (): void => {
    const rand = rng(100 + round++);
    heights = countries.map(() => 0.01 + rand() ** 2 * 0.22);
    // Set the accessor again so the layer reads the new heights.
    globe.polygonAltitude((d) => heights[(d as Country).properties.index]!);
  };

  const globe = stage.own(new Globe(stage.container))
    .globeImageUrl(dark)
    .polygonsData(countries)
    .polygonCapColor((d) => `hsl(${(d as Country).properties.index * 29 % 360}, 65%, 52%)`)
    .polygonSideColor(() => 'rgba(20, 40, 70, 0.7)')
    .polygonsTransitionDuration(1500);
  reroll();

  globe.pointOfView({ lat: 15, lng: 15, altitude: 2.3 });
  globe.controls().autoRotate = true;
  globe.controls().autoRotateSpeed = 0.8;

  stage.every(3500, reroll);
  if (stage.bar) {
    slider(stage.bar, 'Transition', 0, 4000, 100, 1500, (v) => globe.polygonsTransitionDuration(v), (v) => `${v} ms`);
    button(stage.bar, 'New heights now', reroll);
  }
  return stage.dispose;
};

export default mount;
