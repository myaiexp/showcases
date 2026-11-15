// onGlobeClick: the clicked lat and lng, used to drop a marker where you click
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { readout } from '../../shared/controls.ts';
import { rng } from '../../shared/places.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';

interface Pin {
  lat: number;
  lng: number;
}

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click the globe to drop a column there. Drags do not count as clicks.' });
  const day = await texture('day');
  const log = stage.bar && readout(stage.box, 'Click anywhere on the globe');

  const pins: Pin[] = [];
  const globe = stage.own(new Globe(stage.container))
    .globeImageUrl(day)
    .pointColor(() => '#ff4d6d')
    .pointAltitude(0.15)
    .pointRadius(0.8)
    .onGlobeClick(({ lat, lng }, event) => {
      pins.push({ lat, lng });
      if (pins.length > 20) pins.shift();
      globe.pointsData([...pins]);
      if (log) log.textContent = `onGlobeClick → lat ${lat.toFixed(2)}, lng ${lng.toFixed(2)} (button ${event.button})`;
    });

  if (stage.preview) {
    // The fake pointer clicks a random spot on the visible face every 1.2 s.
    const ghost = stage.ghost(globe);
    const rand = rng(4);
    stage.every(1200, () => {
      ghost.px(stage.width / 2 + (rand() - 0.5) * 110, stage.height / 2 + (rand() - 0.5) * 110);
      stage.after(150, () => ghost.click());
    });
  }

  return stage.dispose;
};

export default mount;
