// CompassWidget: shows bearing and pitch; click to level bearing, again for pitch
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import { CompassWidget } from '@deck.gl/widgets';
import '@deck.gl/widgets/stylesheet.css';
import type { Mount } from '@/types.ts';
import { CITIES, type City } from '../../shared/data.ts';
import { button, controlBar, readout } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { clickEvery } from '../../shared/widgets-scene.ts';
import { landLayer } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  // Controlled view state: the widget's reset lands in onViewStateChange like a drag would.
  let viewState: MapViewState = { longitude: 15, latitude: 45, zoom: ctx.preview ? 2.2 : 3.2, pitch: 50, bearing: 40 };
  const log = ctx.preview ? null : readout(el, 'Rotate and tilt the map (right-drag), then click the compass.');

  const deck: Deck = new Deck({
    device: stage.device,
    viewState,
    controller: !ctx.preview,
    onViewStateChange: ({ viewState: next }) => {
      viewState = next as MapViewState;
      deck.setProps({ viewState });
    },
    layers: [
      landLayer(),
      new ScatterplotLayer<City>({
        id: 'cities',
        data: CITIES,
        getPosition: (d) => d.coordinates,
        getRadius: (d) => Math.sqrt(d.population) * 40_000,
        getFillColor: [255, 140, 60],
        radiusMinPixels: 3,
      }),
    ],
    widgets: [
      new CompassWidget({
        placement: 'top-right',
        transitionDuration: 600,
        onReset: ({ bearing, pitch }) => {
          if (log) log.textContent = `onReset: bearing ${bearing}, pitch ${Math.round(pitch)}`;
        },
      }),
    ],
  });

  const spin = (bearing: number, pitch: number): void => {
    viewState = { ...viewState, bearing, pitch, transitionDuration: 0 };
    deck.setProps({ viewState });
  };
  let stop = (): void => {};
  if (ctx.preview) {
    // Twist the map now and then, and press the compass twice (bearing, then pitch).
    let n = 0;
    const twist = window.setInterval(() => spin(40 + 60 * Math.sin(n++), 50), 4800);
    const press = clickEvery(stage.box, '.deck-widget-compass button', 2400);
    stop = () => {
      window.clearInterval(twist);
      press();
    };
  } else {
    const bar = controlBar(el);
    button(bar, 'Rotate to 120 degrees', () => spin(120, viewState.pitch ?? 0));
    button(bar, 'Tilt to 60 degrees', () => spin(viewState.bearing ?? 0, 60));
  }
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
