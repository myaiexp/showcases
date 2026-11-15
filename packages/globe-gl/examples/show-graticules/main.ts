// showGraticules: a 10° grid of latitude and longitude lines
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const night = await texture('night');

  const globe = stage.own(new Globe(stage.container)).globeImageUrl(night).showGraticules(true);
  globe.pointOfView({ lat: 35, lng: 0, altitude: 2.2 });
  globe.controls().autoRotate = true;

  if (stage.bar) checkbox(stage.bar, 'showGraticules', true, (v) => globe.showGraticules(v));
  else {
    let on = true;
    stage.every(2000, () => globe.showGraticules((on = !on)));
  }

  return stage.dispose;
};

export default mount;
