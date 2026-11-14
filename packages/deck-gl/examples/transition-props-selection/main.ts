// LinearInterpolator transitionProps: animate only the chosen view-state props
import { Deck, LinearInterpolator } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { button, controlBar, select } from '../../shared/controls.ts';
import { CITIES, type City } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const A: MapViewState = { longitude: -5, latitude: 40, zoom: 3, bearing: 0, pitch: 0 };
const B: MapViewState = { longitude: 40, latitude: 30, zoom: 5, bearing: 60, pitch: 50 };

const PROP_SETS: Record<string, string[]> = {
  'zoom only': ['zoom'],
  'longitude + latitude': ['longitude', 'latitude'],
  'bearing + pitch': ['bearing', 'pitch'],
  'all five (default)': ['longitude', 'latitude', 'zoom', 'bearing', 'pitch'],
};

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  let propSet = ctx.preview ? 'bearing + pitch' : 'zoom only';
  let atB = false;

  const deck = new Deck({
    device: stage.device,
    initialViewState: A,
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

  const toggle = (): void => {
    atB = !atB;
    deck.setProps({
      initialViewState: {
        ...(atB ? B : A),
        transitionDuration: 2000,
        // Props left out of this list are not interpolated.
        transitionInterpolator: new LinearInterpolator(PROP_SETS[propSet]!),
      },
    });
  };

  let timer = 0;
  if (ctx.preview) {
    timer = window.setInterval(toggle, 2600);
  } else {
    const bar = controlBar(el);
    select(bar, 'transitionProps', Object.keys(PROP_SETS), (v) => (propSet = v), propSet);
    button(bar, 'Move camera A <-> B', toggle);
  }
  return () => {
    clearInterval(timer);
    stage.release(deck);
  };
};

export default mount;
