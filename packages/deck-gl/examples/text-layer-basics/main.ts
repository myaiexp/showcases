// A TextLayer of city names: getText, getPosition, getSize and getColor on a map
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { TextLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { CITIES, type City } from '../../shared/data.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const INITIAL_VIEW_STATE: MapViewState = { longitude: 20, latitude: 30, zoom: ctx.preview ? 1.2 : 2 };

  const deck = new Deck({
    device: stage.device,
    initialViewState: INITIAL_VIEW_STATE,
    controller: !ctx.preview,
    layers: [
      landLayer(),
      new TextLayer<City>({
        id: 'names',
        data: CITIES.filter((c) => c.population >= (ctx.preview ? 12 : 5)),
        getText: (d) => d.name,
        getPosition: (d) => d.coordinates,
        // Pixels by default; bigger cities get bigger names.
        getSize: (d) => 11 + Math.sqrt(d.population) * 1.4,
        getColor: [235, 240, 250],
        // Names like "São Paulo" go beyond the default ASCII set: detect characters from the data.
        characterSet: 'auto',
      }),
    ],
  });

  const stop = ctx.preview
    ? animate((t) => deck.setProps({ viewState: { ...INITIAL_VIEW_STATE, longitude: ((20 + t * 6 + 180) % 360) - 180 } }))
    : () => {};

  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
