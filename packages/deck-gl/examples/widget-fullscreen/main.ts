// FullscreenWidget: enter and exit fullscreen for the map container or an element
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import { FullscreenWidget } from '@deck.gl/widgets';
import '@deck.gl/widgets/stylesheet.css';
import type { Mount } from '@/types.ts';
import { CITIES, type City } from '../../shared/data.ts';
import { readout } from '../../shared/controls.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { drift } from '../../shared/widgets-scene.ts';
import { landLayer } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 10, latitude: 25, zoom: ctx.preview ? 0.4 : 1.3 };
  const log = ctx.preview ? null : readout(el, 'Click the button at the top right to go fullscreen; Esc leaves.');

  const deck = new Deck({
    device: stage.device,
    initialViewState: view,
    controller: !ctx.preview,
    layers: [
      landLayer(),
      new ScatterplotLayer<City>({
        id: 'cities',
        data: CITIES,
        getPosition: (d) => d.coordinates,
        getRadius: (d) => Math.sqrt(d.population) * 50_000,
        getFillColor: [255, 140, 60],
        radiusMinPixels: 3,
      }),
    ],
    widgets: [
      new FullscreenWidget({
        placement: 'top-right',
        // The element that goes fullscreen; without it the map container does.
        container: stage.box,
        enterLabel: 'Go fullscreen',
        exitLabel: 'Leave fullscreen',
        onFullscreenChange: (fullscreen) => {
          if (log) log.textContent = `onFullscreenChange: ${fullscreen}`;
        },
      }),
    ],
  });

  // A card shows the button but never triggers it.
  const stop = ctx.preview ? animate((t) => deck.setProps({ viewState: drift(view, t) })) : () => {};
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
