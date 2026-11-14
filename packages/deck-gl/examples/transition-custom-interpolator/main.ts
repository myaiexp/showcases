// A custom TransitionInterpolator against the stock LinearInterpolator across the antimeridian
import { Deck, LinearInterpolator } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { button, controlBar, select } from '../../shared/controls.ts';
import { city, CITIES, type City } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';
import { SphericalLinearInterpolator } from './interpolator.ts';

const view = (name: string): MapViewState => {
  const [longitude, latitude] = city(name).coordinates;
  return { longitude, latitude, zoom: 2.4 };
};
const STOPS = [view('Tokyo'), view('Honolulu'), view('Auckland'), view('Anchorage')];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  let kind: 'custom (short way)' | 'LinearInterpolator' = 'custom (short way)';
  let stop = 0;

  const deck = new Deck({
    device: stage.device,
    initialViewState: STOPS[0]!,
    controller: !ctx.preview,
    layers: [
      landLayer(),
      new ScatterplotLayer<City>({
        id: 'cities',
        data: CITIES,
        getPosition: (d) => d.coordinates,
        getRadius: 4,
        radiusUnits: 'pixels',
        getFillColor: [255, 170, 70],
      }),
    ],
  });

  const next = (): void => {
    stop = (stop + 1) % STOPS.length;
    deck.setProps({
      initialViewState: {
        ...STOPS[stop]!,
        // 'auto' asks the interpolator's getDuration; LinearInterpolator has none, so give it a number.
        transitionDuration: kind === 'LinearInterpolator' ? 3000 : 'auto',
        transitionInterpolator: kind === 'LinearInterpolator' ? new LinearInterpolator() : new SphericalLinearInterpolator({ speed: 40 }),
      },
    });
  };

  let timer = 0;
  if (ctx.preview) {
    timer = window.setInterval(next, 2500);
  } else {
    const bar = controlBar(el);
    select(bar, 'interpolator', ['custom (short way)', 'LinearInterpolator'] as const, (v) => (kind = v), kind);
    button(bar, 'Next: Tokyo > Honolulu > Auckland > Anchorage', next);
  }
  return () => {
    clearInterval(timer);
    stage.release(deck);
  };
};

export default mount;
