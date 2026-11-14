// ScaleWidget: a distance scale bar that follows the zoom and latitude of the view
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import { _ScaleWidget as ScaleWidget } from '@deck.gl/widgets';
import '@deck.gl/widgets/stylesheet.css';
import type { Mount } from '@/types.ts';
import { CITIES, type City } from '../../shared/data.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 8, latitude: 48, zoom: ctx.preview ? 3.5 : 4.5 };

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
        getRadius: (d) => Math.sqrt(d.population) * 12_000,
        getFillColor: [255, 140, 60],
        radiusMinPixels: 3,
      }),
    ],
    widgets: [
      new ScaleWidget({
        placement: 'bottom-left',
        label: 'Map scale',
        // The bar draws in black whatever the theme: give it a light plate to read on the dark map.
        style: { background: 'rgba(255, 255, 255, 0.85)', borderRadius: '8px' },
      }),
    ],
  });

  // A card breathes the zoom so the bar's length and label keep changing.
  const stop = ctx.preview
    ? animate((t) => deck.setProps({ viewState: { ...view, zoom: 3.5 + Math.sin(t * 0.6) * 2 } }))
    : () => {};
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
