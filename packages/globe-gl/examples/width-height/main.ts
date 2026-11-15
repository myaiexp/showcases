// width and height: the canvas size, set and read back through the getters
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { readout, slider } from '../../shared/controls.ts';
import { cities } from '../../shared/places.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The globe stays centred in whatever canvas size it gets.' });
  const day = await texture('day');

  const globe = stage.own(new Globe(stage.container))
    .globeImageUrl(day)
    .pointsData(cities)
    .backgroundColor('#1b2333');
  globe.controls().autoRotate = true;

  // The getters return the current size.
  const show = stage.bar && readout(stage.box);
  const report = (): void => {
    if (show) show.textContent = `globe.width() = ${globe.width()}, globe.height() = ${globe.height()}`;
  };

  if (stage.bar) {
    slider(stage.bar, 'width', 120, stage.width, 10, stage.width, (w) => (globe.width(w), report()));
    slider(stage.bar, 'height', 120, stage.height, 10, stage.height, (h) => (globe.height(h), report()));
    report();
  } else {
    // Cards breathe between a narrow and a wide canvas.
    stage.loop((_dt, t) => {
      const k = 0.5 + 0.5 * Math.sin(t * 1.2);
      globe.width(Math.round(110 + k * (stage.width - 110)));
    });
  }

  return stage.dispose;
};

export default mount;
