// onGlobeReady: start the data once the globe is on screen
import Globe, { type GlobeInstance } from 'globe.gl';
import type { Mount } from '@/types.ts';
import { button, readout } from '../../shared/controls.ts';
import { cities } from '../../shared/places.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The rings start only after onGlobeReady has fired.' });
  const day = await texture('day');
  const log = stage.bar && readout(stage.box);

  let globe: GlobeInstance | null = null;
  const build = (): void => {
    if (globe) stage.release(globe);
    const started = performance.now();
    if (log) log.textContent = 'Building…';
    const g = stage.own(new Globe(stage.container))
      .globeImageUrl(day)
      .ringColor(() => '#ffd166')
      .ringMaxRadius(6)
      .onGlobeReady(() => {
        if (log) log.textContent = `onGlobeReady after ${Math.round(performance.now() - started)} ms: rings start now`;
        // Wait for the animate-in spin to settle, then send out rings from every city.
        stage.after(900, () => g.ringsData(cities.slice(0, 12)));
      });
    globe = g;
  };
  build();

  if (stage.bar) button(stage.bar, 'Build again', build);
  else stage.every(5000, build);

  return stage.dispose;
};

export default mount;
