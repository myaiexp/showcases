// MapLibreOverlay interleaved: deck.gl columns in the map's WebGL context
import { MapLibreOverlay } from '@deck.gl/maplibre';
import { ColumnLayer } from '@deck.gl/layers';
import { NavigationControl } from 'maplibre-gl';
import type { Mount } from '@/types.ts';
import { createMap, mapBox, releaseMap, whenLoaded } from '../../shared/base-maps.ts';
import { CITIES, type City } from '../../shared/data.ts';
import { animate } from '../../shared/stage.ts';

const mount: Mount = (el, { preview }) => {
  const box = mapBox(el, preview);
  const view = { center: [15, 40] as [number, number], zoom: preview ? 1.2 : 2.6, pitch: 50, bearing: 0 };
  const map = createMap(box, view, preview);

  let overlay: MapLibreOverlay | null = null;
  whenLoaded(map, () => {
    // Interleaved: the overlay's layers share the map's WebGL2 context and depth buffer.
    overlay = new MapLibreOverlay({
      interleaved: true,
      layers: [
        new ColumnLayer<City>({
          id: 'city-columns',
          data: CITIES,
          getPosition: (d) => d.coordinates,
          getElevation: (d) => d.population * 25_000,
          getFillColor: [255, 150, 70, 235],
          radius: 90_000,
          diskResolution: 12,
          extruded: true,
        }),
      ],
    });
    // The overlay is a MapLibre IControl: addControl mounts it, removeControl unmounts it.
    map.addControl(overlay);
    if (!preview) map.addControl(new NavigationControl(), 'top-right');
  });

  const stop = preview ? animate((t) => map.jumpTo({ bearing: t * 10, center: [15 + Math.sin(t / 4) * 20, 40] })) : () => {};
  return () => {
    stop();
    releaseMap(map, box, overlay);
  };
};

export default mount;
