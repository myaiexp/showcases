// GeocoderWidget with a custom geocoder: a local lookup of the sample cities by name
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import { _GeocoderWidget as GeocoderWidget } from '@deck.gl/widgets';
import type { Geocoder } from '@deck.gl/widgets';
import '@deck.gl/widgets/stylesheet.css';
import type { Mount } from '@/types.ts';
import { CITIES, type City } from '../../shared/data.ts';
import { readout } from '../../shared/controls.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { drift } from '../../shared/widgets-scene.ts';
import { landLayer } from '../../shared/world.ts';

/** Matches the typed text against the city names: no network, nothing to configure. */
const cityGeocoder: Geocoder = {
  name: 'cities',
  requiresApiKey: false,
  placeholderLocation: 'A city, e.g. Lagos',
  geocode: async (address) => {
    const hit = CITIES.find((c) => c.name.toLowerCase() === address.trim().toLowerCase());
    return hit ? { longitude: hit.coordinates[0], latitude: hit.coordinates[1] } : null;
  },
};

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 10, latitude: 25, zoom: ctx.preview ? 0.5 : 1.3 };
  const log = ctx.preview ? null : readout(el, `Try: ${CITIES.slice(0, 6).map((c) => c.name).join(', ')} ...`);

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
        geocoder: 'custom',
        customGeocoder: cityGeocoder,
        onGeocode: ({ coordinates }) => {
          const hit = CITIES.find((c) => c.coordinates[0] === coordinates.longitude);
          if (log) log.textContent = `onGeocode: ${hit?.name ?? '?'} at ${coordinates.longitude}, ${coordinates.latitude}`;
        },
      }),
    ],
  });

  const stop = ctx.preview ? animate((t) => deck.setProps({ viewState: drift(view, t) })) : () => {};
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
