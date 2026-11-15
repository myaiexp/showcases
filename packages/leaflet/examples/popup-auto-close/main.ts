// Popup autoClose: opening a popup closes the previous one unless that popup says otherwise
import { LeafletMap, Marker } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import { ghost } from '../../shared/ghost.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Open the two left popups one after the other (the first closes), then the two right ones (both stay).' });
  const map = stage.own(new LeafletMap(stage.box, { center: [60.2, 24.9], zoom: 8, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  // closeOnClick: false keeps a click on another marker from closing popups through the map.
  const keep = { closeOnClick: false, autoPan: false };
  const left = [new Marker([60.3, 24.2]), new Marker([60.1, 24.4])];
  const right = [new Marker([60.3, 25.4]), new Marker([60.1, 25.6])];
  left.forEach((m, i) => m.bindPopup(`Default ${i + 1}`, { ...keep, autoClose: true }));
  // autoClose is read from the popup that is already open when the next one opens, so
  // these stay open only while the one opened before them has it false as well.
  right.forEach((m, i) => m.bindPopup(`autoClose false ${i + 1}`, { ...keep, autoClose: false }));
  for (const m of [...left, ...right]) m.addTo(map);

  stage.button('Close all', () => {
    for (const m of [...left, ...right]) m.closePopup();
  });

  if (stage.preview) {
    const g = ghost(map);
    stage.onDispose(() => g.remove());
    const click = (m: Marker): void => g.click(m.getLatLng(), m.getElement());
    const [l1, l2] = left as [Marker, Marker];
    const [r1, r2] = right as [Marker, Marker];
    stage.cycle(
      [
        { say: 'autoClose true: one open at a time', run: () => click(l1) },
        { run: () => click(l2) },
        { say: 'autoClose false: both stay open', run: () => (map.closePopup(), click(r1)) },
        { run: () => click(r2), hold: 2200 },
        { run: () => [...left, ...right].forEach((m) => m.closePopup()), hold: 400 },
      ],
      1700,
    );
  }
  return () => stage.dispose();
};

export default mount;
