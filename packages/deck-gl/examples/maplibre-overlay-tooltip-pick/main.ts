// MapLibreOverlay getTooltip, onClick and pickObject through the map
import { MapLibreOverlay } from '@deck.gl/maplibre';
import type { PickingInfo } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { readout } from '../../shared/controls.ts';
import { createMap, mapBox, releaseMap, whenLoaded } from '../../shared/base-maps.ts';
import { CITIES, city, type City } from '../../shared/data.ts';

const IN_VIEW = ['Istanbul', 'Cairo', 'Paris', 'London'].map(city);

const mount: Mount = (el, { preview }) => {
  const box = mapBox(el, preview);
  const view = { center: [20, 35] as [number, number], zoom: preview ? 1.4 : 2.4 };
  const map = createMap(box, view, preview);
  const note = readout(preview ? box : el, 'Hover a city, click to fly there');
  if (preview) {
    Object.assign(note.style, { position: 'absolute', left: '6px', bottom: '6px', width: 'auto', margin: '0', padding: '2px 6px', background: '#000a', textAlign: 'left', zIndex: '2' });
  }
  let overlay: MapLibreOverlay | null = null;

  whenLoaded(map, () => {
    overlay = new MapLibreOverlay({
      interleaved: true,
      layers: [
        new ScatterplotLayer<City>({
          id: 'pick-cities',
          data: CITIES,
          getPosition: (d) => d.coordinates,
          getRadius: (d) => Math.sqrt(d.population) * 50_000,
          radiusMinPixels: 4,
          getFillColor: [255, 150, 70, 220],
          pickable: true,
          autoHighlight: true,
        }),
      ],
      // The map owns the pointer; the overlay forwards it to Deck, so tooltips work as usual.
      getTooltip: ({ object }: PickingInfo<City>) => (object ? `${object.name}: ${object.population} million` : null),
      onClick: ({ object }: PickingInfo<City>) => {
        if (object) map.flyTo({ center: object.coordinates, zoom: 4 });
      },
    });
    map.addControl(overlay);
  });

  // A card has no pointer: ask the overlay's pickObject about a city's pixel instead.
  let timer = 0;
  if (preview) {
    let i = 0;
    timer = window.setInterval(() => {
      const c = IN_VIEW[i++ % IN_VIEW.length]!;
      const { x, y } = map.project(c.coordinates);
      const hit = overlay?.pickObject({ x, y, radius: 8 });
      note.textContent = hit?.object ? `pickObject: ${(hit.object as City).name}` : 'pickObject: none';
    }, 1200);
  }

  return () => {
    window.clearInterval(timer);
    releaseMap(map, box, overlay);
  };
};

export default mount;
