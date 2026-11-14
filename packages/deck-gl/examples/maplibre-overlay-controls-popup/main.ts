// Overlaid MapLibreOverlay with MapLibre controls and a Popup on click
import { MapLibreOverlay } from '@deck.gl/maplibre';
import type { PickingInfo } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import { NavigationControl, Popup, ScaleControl } from 'maplibre-gl';
import type { Mount } from '@/types.ts';
import { createMap, mapBox, releaseMap, whenLoaded } from '../../shared/base-maps.ts';
import { CITIES, type City } from '../../shared/data.ts';

const mount: Mount = (el, { preview }) => {
  const box = mapBox(el, preview);
  const view = { center: [20, 35] as [number, number], zoom: preview ? 1.4 : 2.6 };
  const map = createMap(box, view, preview);
  let overlay: MapLibreOverlay | null = null;
  const popup = new Popup({ closeButton: false, closeOnClick: false, offset: 8 });
  const open = (c: City): void => {
    popup.setLngLat(c.coordinates).setText(`${c.name}, ${c.country}`).addTo(map);
  };

  whenLoaded(map, () => {
    // interleaved defaults to false: Deck draws on its own canvas inside the map container,
    // and MapLibre's controls and popups keep working above it.
    overlay = new MapLibreOverlay({
      layers: [
        new ScatterplotLayer<City>({
          id: 'popup-cities',
          data: CITIES,
          getPosition: (d) => d.coordinates,
          getRadius: (d) => Math.sqrt(d.population) * 50_000,
          radiusMinPixels: 4,
          getFillColor: [90, 200, 255, 220],
          pickable: true,
          autoHighlight: true,
        }),
      ],
      onClick: ({ object }: PickingInfo<City>) => {
        if (object) open(object);
        else popup.remove();
      },
    });
    map.addControl(overlay);
    if (!preview) {
      map.addControl(new NavigationControl({ visualizePitch: true }), 'top-right');
      map.addControl(new ScaleControl({ unit: 'metric' }), 'bottom-left');
    }
  });

  let timer = 0;
  if (preview) {
    let i = 0;
    timer = window.setInterval(() => open(CITIES[(i += 4) % CITIES.length]!), 1500);
  }

  return () => {
    window.clearInterval(timer);
    popup.remove();
    releaseMap(map, box, overlay);
  };
};

export default mount;
