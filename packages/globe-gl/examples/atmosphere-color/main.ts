// atmosphereColor: tint the halo with any CSS colour
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { color } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';

const TINTS = ['lightskyblue', '#ff9f43', '#ff4d6d', '#7bed9f', '#c56cf0'];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const night = await texture('night');

  const globe = stage.own(new Globe(stage.container)).globeImageUrl(night).atmosphereColor(TINTS[1]!);
  globe.controls().autoRotate = true;

  if (stage.bar) color(stage.bar, 'atmosphereColor', TINTS[1]!, (c) => globe.atmosphereColor(c));
  else {
    let i = 1;
    stage.every(1500, () => globe.atmosphereColor(TINTS[++i % TINTS.length]!));
  }

  return stage.dispose;
};

export default mount;
