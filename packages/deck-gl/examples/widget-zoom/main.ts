// ZoomWidget: plus and minus buttons that zoom the view, with an onZoom callback
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import { ZoomWidget } from '@deck.gl/widgets';
import '@deck.gl/widgets/stylesheet.css';
import type { Mount } from '@/types.ts';
import { CITIES, type City } from '../../shared/data.ts';
import { readout } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { clickEvery } from '../../shared/widgets-scene.ts';
import { landLayer } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 10, latitude: 45, zoom: ctx.preview ? 1.5 : 2 };
  const log = ctx.preview ? null : readout(el, 'Click + or - on the map (or scroll).');

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
        getRadius: (d) => Math.sqrt(d.population) * 40_000,
        getFillColor: [255, 140, 60],
        radiusMinPixels: 3,
      }),
    ],
    widgets: [
      new ZoomWidget({
        placement: 'top-left',
        // Called once per zoomed view with the direction and the zoom level it is going to.
        onZoom: ({ viewId, delta, zoom }) => {
          if (log) log.textContent = `onZoom: view "${viewId}", delta ${delta > 0 ? '+' : ''}${delta}, zoom -> ${zoom.toFixed(2)}`;
        },
      }),
    ],
  });

  // A card has no pointer: press the widget's own buttons from code.
  const stop = ctx.preview
    ? clickEvery(stage.box, ['.deck-widget-zoom-in', '.deck-widget-zoom-in', '.deck-widget-zoom-out', '.deck-widget-zoom-out'], 1400)
    : () => {};
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
