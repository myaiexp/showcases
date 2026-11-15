// popupopen and popupclose on the map and on the layer the popup is bound to
import { LeafletMap, Marker } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import { ghost } from '../../shared/ghost.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Open and close the popups. Each open and close fires an event on the layer, then on the map.' });
  const log = stage.log('Events', 14);
  const map = stage.own(new LeafletMap(stage.box, { center: [60.1, 24.9], zoom: 7, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  const names = new Map<unknown, string>();
  const make = (name: string, at: [number, number]): Marker => {
    const m = new Marker(at, { title: name }).addTo(map).bindPopup(`I am ${name}`, { autoPan: false });
    names.set(m.getPopup(), name);
    // The popup fires on the layer it is bound to as well as on the map; the event carries the popup.
    m.on('popupopen', () => log(`${name}.popupopen`));
    m.on('popupclose', () => log(`${name}.popupclose`));
    return m;
  };
  const a = make('A', [60.2, 24.1]);
  const b = make('B', [60.2, 25.7]);

  map.on('popupopen', (e) => log(`map popupopen (${names.get(e.popup)})`));
  map.on('popupclose', (e) => log(`map popupclose (${names.get(e.popup)})`));

  if (stage.preview) {
    const g = ghost(map);
    stage.onDispose(() => g.remove());
    stage.cycle(
      [
        { run: () => g.click(a.getLatLng(), a.getElement()) },
        { run: () => g.click(b.getLatLng(), b.getElement()) },
        { run: () => b.closePopup() },
      ],
      1900,
    );
  }
  return () => stage.dispose();
};

export default mount;
