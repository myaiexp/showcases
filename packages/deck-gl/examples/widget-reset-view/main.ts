// ResetViewWidget: one button that flies back to a chosen home view
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import { ResetViewWidget } from '@deck.gl/widgets';
import '@deck.gl/widgets/stylesheet.css';
import type { Mount } from '@/types.ts';
import { CITIES, type City } from '../../shared/data.ts';
import { readout } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { clickEvery } from '../../shared/widgets-scene.ts';
import { landLayer } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const start: MapViewState = { longitude: 139.7, latitude: 35.7, zoom: ctx.preview ? 3 : 4.5 };
  // The home view differs from the start view, so the button visibly goes somewhere else.
  const home: MapViewState = { longitude: 10, latitude: 25, zoom: ctx.preview ? 0.4 : 1.2 };
  const log = ctx.preview ? null : readout(el, `Started over Tokyo. The reset button flies to the home view (${home.longitude}, ${home.latitude}).`);

  let viewState: MapViewState = start;
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
      new ResetViewWidget({
        placement: 'top-left',
        label: 'Back to the world',
        initialViewState: { ...home, transitionDuration: 1000 },
        onReset: ({ viewId, viewState: to }) => {
          if (log) log.textContent = `onReset: view "${viewId}" -> ${JSON.stringify(to)}`;
        },
      }),
    ],
  });

  // A card goes back to Tokyo every few seconds, then presses reset.
  const back = window.setInterval(() => {
    if (!ctx.preview) return;
    viewState = start;
    deck.setProps({ viewState });
  }, 6000);
  const press = ctx.preview ? clickEvery(stage.box, '.deck-widget-reset-view button', 3000) : () => {};
  return () => {
    window.clearInterval(back);
    press();
    stage.release(deck);
  };
};

export default mount;
