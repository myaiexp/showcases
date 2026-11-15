// backgroundColor: any CSS colour behind the globe, default #000011
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { color } from '../../shared/controls.ts';
import { cities } from '../../shared/places.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';

const COLOURS = ['#000011', '#14213d', '#2b2d42', '#3d1f3f', '#0f3b2e', '#e8eef2'];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const day = await texture('day');

  const globe = stage.own(new Globe(stage.container))
    .globeImageUrl(day)
    .pointsData(cities)
    .backgroundColor(COLOURS[0]!);
  globe.controls().autoRotate = true;

  if (stage.bar) {
    color(stage.bar, 'backgroundColor', globe.backgroundColor(), (c) => globe.backgroundColor(c));
  } else {
    let i = 0;
    stage.every(1500, () => globe.backgroundColor(COLOURS[++i % COLOURS.length]!));
  }

  return stage.dispose;
};

export default mount;
