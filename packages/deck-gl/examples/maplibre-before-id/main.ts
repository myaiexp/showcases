// MapLibreOverlay beforeId: slot a deck.gl layer under any layer of the map style
import { MapLibreOverlay } from '@deck.gl/maplibre';
import { ScatterplotLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { controlBar, readout, select } from '../../shared/controls.ts';
import { createMap, mapBox, releaseMap, whenLoaded, type WithBeforeId } from '../../shared/base-maps.ts';
import { CITIES, type City } from '../../shared/data.ts';
import { animate } from '../../shared/stage.ts';

// Style layer ids, bottom to top: land, borders, cities. 'top' means no beforeId.
const SLOTS = ['land', 'borders', 'cities', 'top'] as const;
type Slot = (typeof SLOTS)[number];

const mount: Mount = (el, { preview }) => {
  const box = mapBox(el, preview);
  const view = { center: [20, 35] as [number, number], zoom: preview ? 1.4 : 3, pitch: 0, bearing: 0 };
  const map = createMap(box, view, preview);
  const note = preview ? null : readout(el);
  let overlay: MapLibreOverlay | null = null;
  let slot: Slot = 'borders';

  const layers = (): ScatterplotLayer<City, WithBeforeId>[] => [
    new ScatterplotLayer<City, WithBeforeId>({
      id: 'discs',
      data: CITIES,
      getPosition: (d) => d.coordinates,
      getRadius: (d) => Math.sqrt(d.population) * 130_000,
      getFillColor: [255, 90, 120, 200],
      // Interleaved only: draw this layer just before the style layer with this id. Layers
      // sharing a beforeId are drawn together, in array order.
      beforeId: slot === 'top' ? undefined : slot,
    }),
  ];

  whenLoaded(map, () => {
    overlay = new MapLibreOverlay({ interleaved: true, layers: layers() });
    map.addControl(overlay);
    if (note) note.textContent = `beforeId: ${slot}`;
  });

  const move = (next: Slot): void => {
    slot = next;
    overlay?.setProps({ layers: layers() });
    if (note) note.textContent = slot === 'top' ? 'no beforeId: above every style layer' : `beforeId: '${slot}'`;
  };

  let timer = 0;
  if (preview) {
    let i = 0;
    timer = window.setInterval(() => move(SLOTS[++i % SLOTS.length]!), 1500);
  } else {
    select(controlBar(el), 'beforeId', SLOTS, move, slot);
  }

  const stop = preview ? animate((t) => map.jumpTo({ center: [20 + Math.sin(t / 5) * 10, 35] })) : () => {};
  return () => {
    window.clearInterval(timer);
    stop();
    releaseMap(map, box, overlay);
  };
};

export default mount;
