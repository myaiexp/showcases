// Popup content from a function that receives the layer the popup is bound to
import { LeafletMap, Marker } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import { ghost } from '../../shared/ghost.ts';

const PLACES: [string, [number, number]][] = [
  ['Helsinki', [60.17, 24.94]],
  ['Tallinn', [59.44, 24.75]],
  ['Turku', [60.45, 22.27]],
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'One function builds the content for every marker. It runs each time the popup opens.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [60.0, 24.0], zoom: 7, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  let opened = 0;
  const markers = PLACES.map(([name, at]) => new Marker(at, { title: name }).addTo(map));

  // The function gets the layer, so one function serves all the markers and can read each one's state.
  const describe = (layer: unknown): HTMLElement => {
    const marker = layer as Marker;
    const box = document.createElement('div');
    const { lat, lng } = marker.getLatLng();
    opened += 1;
    const name = document.createElement('b');
    name.textContent = String(marker.options.title);
    box.append(name, document.createElement('br'), `${lat.toFixed(2)}, ${lng.toFixed(2)}`, document.createElement('br'), `built ${opened}x`);
    return box;
  };
  for (const m of markers) m.bindPopup(describe);

  if (stage.preview) {
    const g = ghost(map);
    stage.onDispose(() => g.remove());
    stage.cycle(
      markers.map((m) => ({ run: () => g.click(m.getLatLng(), m.getElement()) })),
      2200,
    );
  }
  return () => stage.dispose();
};

export default mount;
