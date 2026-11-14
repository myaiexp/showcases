// transitionEasing on a camera move, with the easing curve plotted beside it
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { button, controlBar, select, slider } from '../../shared/controls.ts';
import { CITIES, type City } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';
import { EASINGS, makePlot } from './easing.ts';

const WEST: MapViewState = { longitude: -20, latitude: 35, zoom: 2.2 };
const EAST: MapViewState = { longitude: 110, latitude: 35, zoom: 2.2 };

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  let easing = ctx.preview ? 'ease-out-bounce' : 'ease-in-out-sine';
  let duration = 2500;
  let target = EAST;
  const plot = ctx.preview ? null : makePlot(el);
  plot?.draw(easing, null);

  const deck = new Deck({
    device: stage.device,
    initialViewState: WEST,
    controller: !ctx.preview,
    // While a transition runs, each frame's view state arrives here: use it to place the dot.
    onViewStateChange: ({ viewState }) => {
      const span = EAST.longitude - WEST.longitude;
      const t = (viewState.longitude - WEST.longitude) / span;
      const linear = target === EAST ? t : 1 - t;
      plot?.draw(easing, Math.max(0, Math.min(1, linear)));
    },
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

  const go = (): void => {
    target = target === EAST ? WEST : EAST;
    deck.setProps({
      initialViewState: {
        ...target,
        transitionDuration: duration,
        transitionEasing: EASINGS[easing]!,
      },
    });
  };

  let timer = 0;
  if (ctx.preview) {
    timer = window.setInterval(go, 3200);
  } else {
    const bar = controlBar(el);
    select(bar, 'easing', Object.keys(EASINGS), (v) => {
      easing = v;
      plot?.draw(easing, null);
    }, easing);
    slider(bar, 'duration ms', 500, 5000, 250, duration, (v) => (duration = v));
    button(bar, 'Pan across', go);
  }
  return () => {
    clearInterval(timer);
    stage.release(deck);
  };
};

export default mount;
