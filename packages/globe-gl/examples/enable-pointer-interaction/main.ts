// enablePointerInteraction: switch hover, tooltips and clicks off for speed
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { checkbox, readout } from '../../shared/controls.ts';
import { cities, city } from '../../shared/places.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'With it off, hovering shows no tooltip and clicks reach nothing; dragging still works.' });
  const day = await texture('day');
  const status = readout(stage.preview ? stage.container : stage.box);
  if (stage.preview) status.style.cssText += ';position:absolute;left:6px;top:4px;z-index:2';

  const globe = stage.own(new Globe(stage.container))
    .globeImageUrl(day)
    .pointsData(cities)
    .pointRadius(1)
    .pointColor(() => '#e76f51');
  globe.pointOfView({ lat: 20, lng: 0, altitude: 2.4 });

  const set = (on: boolean): void => {
    globe.enablePointerInteraction(on);
    status.textContent = `enablePointerInteraction(${on})`;
  };

  if (stage.bar) {
    set(true);
    checkbox(stage.bar, 'enablePointerInteraction', true, set);
  } else {
    // The fake pointer rests on Lagos; the tooltip comes and goes with the setting.
    const ghost = stage.ghost(globe);
    const lagos = city('Lagos');
    let on = true;
    set(on);
    stage.every(800, () => ghost.at(lagos.lat, lagos.lng, 0.1));
    stage.every(2000, () => set((on = !on)));
  }

  return stage.dispose;
};

export default mount;
