// The docs' first Deck: a ScatterplotLayer of cities over a world map, controller
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { CITIES, type City } from '../../shared/data.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);

  const INITIAL_VIEW_STATE: MapViewState = { longitude: 10, latitude: 25, zoom: ctx.preview ? 0 : 1 };

  const deck = new Deck({
    device: stage.device,
    initialViewState: INITIAL_VIEW_STATE,
    controller: !ctx.preview,
    layers: [
      landLayer(),
      new ScatterplotLayer<City>({
        id: 'cities',
        data: CITIES,
        getPosition: (d) => d.coordinates,
        getFillColor: [255, 140, 60],
        // Radius in metres: the area of each dot follows the city's population.
        getRadius: (d) => Math.sqrt(d.population) * 60_000,
        radiusMinPixels: 2,
        opacity: 0.85,
      }),
    ],
  });

  // A card has no pointer: drift the map east so it looks alive. A view state set from
  // code is not normalized: past ±180° longitude the map draws nothing, so wrap it.
  const stop = ctx.preview
    ? animate((t) => deck.setProps({ viewState: { ...INITIAL_VIEW_STATE, longitude: ((10 + t * 8 + 180) % 360) - 180 } }))
    : () => {};

  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
