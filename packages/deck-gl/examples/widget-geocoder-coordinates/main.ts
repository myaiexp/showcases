// GeocoderWidget with the coordinates geocoder: type "lng, lat" to fly there
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import { _GeocoderWidget as GeocoderWidget } from '@deck.gl/widgets';
import '@deck.gl/widgets/stylesheet.css';
import type { Mount } from '@/types.ts';
import { CITIES, type City } from '../../shared/data.ts';
import { readout } from '../../shared/controls.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { drift } from '../../shared/widgets-scene.ts';
import { landLayer } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 10, latitude: 25, zoom: ctx.preview ? 0.5 : 1.3 };
  const log = ctx.preview ? null : readout(el, 'Type a position such as "139.69, 35.69" or "-74, 40.7" and press Enter.');

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
        getRadius: (d) => Math.sqrt(d.population) * 30_000,
        getFillColor: [255, 140, 60],
        radiusMinPixels: 3,
      }),
    ],
    widgets: [
      new GeocoderWidget({
        placement: 'top-left',
        // 'coordinates' needs no service and no key: it parses the text as a position.
        geocoder: 'coordinates',
        transitionDuration: 1500,
        onGeocode: ({ coordinates }) => {
          if (log) log.textContent = `onGeocode: ${coordinates.longitude.toFixed(2)}, ${coordinates.latitude.toFixed(2)}`;
        },
      }),
    ],
  });

  // A card cannot type: it shows the input box over a drifting map.
  const stop = ctx.preview ? animate((t) => deck.setProps({ viewState: drift(view, t) })) : () => {};
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
