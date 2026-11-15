// showGlobe: hide the sphere and keep only the data, floating in space
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { countries } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Without the globe surface, the far side of the world shows through.' });

  const globe = stage.own(new Globe(stage.container))
    .showGlobe(false)
    .showAtmosphere(false)
    .polygonsData(countries)
    .polygonCapColor(() => 'rgba(120, 200, 255, 0.55)')
    .polygonSideColor(() => 'rgba(120, 200, 255, 0.15)')
    .polygonStrokeColor(() => '#bfe6ff')
    .polygonAltitude(0.01);
  globe.controls().autoRotate = true;

  if (stage.bar) {
    checkbox(stage.bar, 'showGlobe', false, (v) => globe.showGlobe(v));
    checkbox(stage.bar, 'showAtmosphere', false, (v) => globe.showAtmosphere(v));
  } else {
    let on = false;
    stage.every(2500, () => globe.showGlobe((on = !on)));
  }

  return stage.dispose;
};

export default mount;
