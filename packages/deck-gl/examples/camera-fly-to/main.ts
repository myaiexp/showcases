// A new initialViewState with a FlyToInterpolator flies the camera there
import { Deck, FlyToInterpolator } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { button, controlBar } from '../../shared/controls.ts';
import { CITIES, type City } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const STOPS: Record<string, MapViewState> = {
  Paris: { longitude: 2.35, latitude: 48.86, zoom: 5 },
  'New York': { longitude: -74, latitude: 40.7, zoom: 5 },
  Tokyo: { longitude: 139.7, latitude: 35.7, zoom: 5 },
  Sydney: { longitude: 151.2, latitude: -33.9, zoom: 5 },
};

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const home: MapViewState = { longitude: 2.35, latitude: 48.86, zoom: ctx.preview ? 2.5 : 3 };

  const deck = new Deck({
    device: stage.device,
    initialViewState: home,
    controller: !ctx.preview,
    layers: [
      landLayer(),
      new ScatterplotLayer<City>({
        id: 'cities',
        data: CITIES,
        getPosition: (d) => d.coordinates,
        getRadius: 6,
        radiusUnits: 'pixels',
        getFillColor: [255, 170, 70],
      }),
    ],
  });

  // Supplying a new initialViewState resets the camera; the interpolator animates the change.
  const flyTo = (name: string): void => {
    deck.setProps({
      initialViewState: {
        ...STOPS[name]!,
        transitionInterpolator: new FlyToInterpolator({ speed: 2 }),
        transitionDuration: 'auto',
      },
    });
  };

  let timer = 0;
  if (ctx.preview) {
    const names = Object.keys(STOPS);
    let i = 0;
    timer = window.setInterval(() => flyTo(names[++i % names.length]!), 3500);
  } else {
    const bar = controlBar(el);
    for (const name of Object.keys(STOPS)) button(bar, name, () => flyTo(name));
  }
  return () => {
    clearInterval(timer);
    stage.release(deck);
  };
};

export default mount;
