// pauseAnimation and resumeAnimation: freeze the render loop, then resume it
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { button, readout } from '../../shared/controls.ts';
import { cities } from '../../shared/places.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'While paused, nothing redraws and dragging does nothing.' });
  const night = await texture('night');
  const status = readout(stage.preview ? stage.container : stage.box, 'running');
  if (stage.preview) status.style.cssText += ';position:absolute;left:6px;top:4px;z-index:2';

  const globe = stage.own(new Globe(stage.container))
    .globeImageUrl(night)
    .ringsData(cities.slice(0, 15))
    .ringColor(() => '#ffcf6e')
    .ringMaxRadius(5);
  globe.controls().autoRotate = true;
  globe.controls().autoRotateSpeed = 1.5;

  let paused = false;
  const toggle = (): void => {
    paused = !paused;
    if (paused) globe.pauseAnimation();
    else globe.resumeAnimation();
    status.textContent = paused ? 'pauseAnimation()' : 'resumeAnimation()';
  };

  if (stage.bar) button(stage.bar, 'Pause / resume', toggle);
  else stage.every(1500, toggle);

  return stage.dispose;
};

export default mount;
