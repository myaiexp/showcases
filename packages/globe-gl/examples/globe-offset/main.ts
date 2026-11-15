// globeOffset: move the globe off the canvas centre, e.g. for a side panel
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { cities } from '../../shared/places.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Offsets are in pixels from the canvas centre: [x, y].' });
  const day = await texture('day');

  const globe = stage.own(new Globe(stage.container))
    .globeImageUrl(day)
    .pointsData(cities)
    .globeOffset([stage.width / 5, 0]);
  globe.controls().autoRotate = true;

  if (stage.bar) {
    let [x, y] = globe.globeOffset();
    slider(stage.bar, 'x', -stage.width / 2, stage.width / 2, 5, x, (v) => globe.globeOffset([(x = v), y]));
    slider(stage.bar, 'y', -stage.height / 2, stage.height / 2, 5, y, (v) => globe.globeOffset([x, (y = v)]));
  } else {
    stage.loop((_dt, t) => globe.globeOffset([Math.sin(t * 0.8) * stage.width * 0.25, Math.cos(t * 0.8) * 20]));
  }

  return stage.dispose;
};

export default mount;
