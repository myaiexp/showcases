// Controller inertia: after a fling the view glides for the given milliseconds
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { controlBar, readout, slider } from '../../shared/controls.ts';
import { overlay, wrapLng } from '../../shared/guide-overlay.ts';
import { CITIES, type City } from '../../shared/data.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const home: MapViewState = { longitude: 0, latitude: 30, zoom: ctx.preview ? 1.4 : 2.2 };
  const info = ctx.preview ? overlay(stage.box, 'inertia: 1500 (a fling, replayed)', 'bottom') : readout(el, 'Fling the map with a quick drag and let go.');

  const deck = new Deck({
    device: stage.device,
    initialViewState: home,
    // `false` stops dead on release; a number is the duration of the glide in milliseconds.
    controller: ctx.preview ? false : { inertia: 1000 },
    layers: [
      landLayer(),
      new ScatterplotLayer<City>({ id: 'cities', data: CITIES, getPosition: (d) => d.coordinates, radiusUnits: 'pixels', getRadius: 4, getFillColor: [255, 170, 70] }),
    ],
  });

  let stop = (): void => {};
  if (ctx.preview) {
    // A fling every 4 s: a burst of speed that decays exponentially to rest.
    stop = animate((t) => {
      const u = t % 4;
      const travelled = 80 * (1 - Math.exp(-u / 0.9));
      deck.setProps({ viewState: { ...home, longitude: wrapLng(-60 + travelled + Math.floor(t / 4) * 80) } });
    });
  } else {
    slider(controlBar(el), 'inertia (ms, 0 = off)', 0, 3000, 100, 1000, (v) => {
      deck.setProps({ controller: { inertia: v === 0 ? false : v } });
      info.textContent = `inertia: ${v === 0 ? 'false' : v}`;
    });
  }
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
