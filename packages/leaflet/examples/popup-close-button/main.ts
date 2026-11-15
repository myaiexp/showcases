// Popup closeButton and closeOnEscapeKey: three ways a popup can be dismissed
import { LeafletMap, Marker } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import { ghost } from '../../shared/ghost.ts';
import { gestures } from '../../shared/gestures.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Close each popup with its × or with Escape (click the map first so it has focus). Only some of them allow it.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [60.1, 24.9], zoom: 7, zoomControl: !stage.preview, closePopupOnClick: false }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  const both = new Marker([60.2, 23.9]).addTo(map).bindPopup('Default: × and Escape', { autoPan: false });
  const noButton = new Marker([60.2, 24.9]).addTo(map).bindPopup('closeButton: false', { closeButton: false, autoPan: false });
  const noEscape = new Marker([60.2, 25.9]).addTo(map).bindPopup('closeOnEscapeKey: false', { closeOnEscapeKey: false, autoPan: false });

  if (stage.preview) {
    const g = ghost(map);
    stage.onDispose(() => g.remove());
    const gest = gestures(stage, map, g);
    const open = (m: Marker): void => g.click(m.getLatLng(), m.getElement());
    const x = (m: Marker): Element | null | undefined => m.getPopup()?.getElement()?.querySelector('.leaflet-popup-close-button');
    stage.cycle(
      [
        { say: 'Default popup: click the ×', run: () => open(both), hold: 1200 },
        { run: () => g.click(both.getLatLng(), x(both)), hold: 700 },
        { say: 'Default popup: Escape closes it', run: () => open(both), hold: 1200 },
        { run: () => gest.key('Escape'), hold: 700 },
        { say: 'closeButton: false, no ×; Escape works', run: () => open(noButton), hold: 1200 },
        { run: () => gest.key('Escape'), hold: 700 },
        { say: 'closeOnEscapeKey: false, Escape does nothing', run: () => open(noEscape), hold: 1200 },
        { run: () => gest.key('Escape'), hold: 1400 },
        { run: () => noEscape.closePopup(), hold: 300 },
      ],
      800,
    );
  }
  return () => stage.dispose();
};

export default mount;
