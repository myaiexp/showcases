// onGlobeRightClick: a right-click on the globe sends out rings from that spot
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { readout } from '../../shared/controls.ts';
import { rng } from '../../shared/places.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Right-click the globe. With a right-click handler set, the browser menu stays closed.' });
  const night = await texture('night');
  const log = stage.bar && readout(stage.box, 'Right-click anywhere on the globe');

  const rings: { lat: number; lng: number }[] = [];
  const globe = stage.own(new Globe(stage.container))
    .globeImageUrl(night)
    .ringColor(() => (t: number) => `rgba(255, 120, 200, ${1 - t})`)
    .ringMaxRadius(8)
    .ringPropagationSpeed(4)
    .onGlobeRightClick(({ lat, lng }) => {
      rings.push({ lat, lng });
      if (rings.length > 6) rings.shift();
      globe.ringsData([...rings]);
      if (log) log.textContent = `onGlobeRightClick → lat ${lat.toFixed(2)}, lng ${lng.toFixed(2)}`;
    });

  if (stage.preview) {
    const ghost = stage.ghost(globe);
    const rand = rng(8);
    stage.every(1300, () => {
      ghost.px(stage.width / 2 + (rand() - 0.5) * 110, stage.height / 2 + (rand() - 0.5) * 110);
      stage.after(150, () => ghost.click(2));
    });
  }

  return stage.dispose;
};

export default mount;
