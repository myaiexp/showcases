// Popup className: your own CSS class on the popup, here styling two popups differently
import { LeafletMap, Marker } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import { ghost } from '../../shared/ghost.ts';
import './style.css';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'className adds a class next to leaflet-popup, so plain CSS can restyle the popup and its tip.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [60.1, 24.9], zoom: 7, zoomControl: !stage.preview, closePopupOnClick: false }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  const warn = new Marker([60.2, 24.1]).addTo(map).bindPopup('<b>Warning</b><br>className: "alert"', { className: 'alert', autoClose: false, autoPan: false });
  const note = new Marker([60.2, 25.7]).addTo(map).bindPopup('<b>Note</b><br>className: "note"', { className: 'note', autoClose: false, autoPan: false });

  if (stage.preview) {
    const g = ghost(map);
    stage.onDispose(() => g.remove());
    stage.cycle(
      [
        { run: () => g.click(warn.getLatLng(), warn.getElement()), hold: 1200 },
        { run: () => g.click(note.getLatLng(), note.getElement()), hold: 2000 },
        { run: () => (warn.closePopup(), note.closePopup()), hold: 400 },
      ],
      800,
    );
  }
  return () => stage.dispose();
};

export default mount;
