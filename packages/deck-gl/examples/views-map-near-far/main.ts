// MapView nearZMultiplier and farZMultiplier: scale the near and far planes of a pitched camera
import { Deck, MapView } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { controlBar, readout, slider } from '../../shared/controls.ts';
import { CITIES, type City } from '../../shared/data.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const label = ctx.preview ? null : readout(el);
  let near = 0.1;
  let far = 1.01;

  const apply = (): void => {
    if (label) label.textContent = `nearZMultiplier: ${near}   farZMultiplier: ${far}`;
    deck.setProps({ views: makeView() });
  };
  // 1 unit of nearZMultiplier is the viewport height; 1 unit of farZMultiplier is the distance
  // from the camera to the top edge of the screen.
  const makeView = () => new MapView({ id: 'map', nearZMultiplier: near, farZMultiplier: far, controller: !ctx.preview });

  const deck = new Deck({
    device: stage.device,
    views: makeView(),
    initialViewState: { longitude: 10, latitude: 40, zoom: ctx.preview ? 2.6 : 3.4, pitch: 60, maxPitch: 85 },
    layers: [
      landLayer(),
      new ScatterplotLayer<City>({ id: 'cities', data: CITIES, getPosition: (d) => d.coordinates, radiusUnits: 'pixels', getRadius: 4, getFillColor: [255, 170, 70] }),
    ],
  });

  let stop = (): void => {};
  if (ctx.preview) {
    stop = animate((t) => {
      far = Number((0.45 + (Math.sin(t * 0.8) + 1) * 0.28).toFixed(2));
      apply();
    });
  } else {
    const bar = controlBar(el);
    slider(bar, 'farZMultiplier', 0.3, 1.01, 0.01, 1.01, (v) => { far = v; apply(); });
    slider(bar, 'nearZMultiplier', 0.1, 1.5, 0.05, 0.1, (v) => { near = v; apply(); });
    apply();
  }
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
