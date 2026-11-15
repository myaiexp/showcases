// The map's translate option and a popup's closeButtonLabel: the close button's accessible name
import { LeafletMap, Marker } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import { ghost } from '../../shared/ghost.ts';

// Leaflet's English text in, the translation out; undefined keeps the English.
const uk: Record<string, string> = { 'Close popup': 'Закрити' };

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Open a popup: the close button\'s aria-label is listed. The map translates the default label; the second popup sets its own.' });
  const log = stage.log('aria-label of the close button', 6);
  // translate is set before any popup opens: text is translated when it is rendered.
  const map = stage.own(
    new LeafletMap(stage.box, { center: [60.1, 24.9], zoom: 7, zoomControl: !stage.preview, translate: (text) => uk[text] }),
  );
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  const byDefault = new Marker([60.2, 24.2]).addTo(map).bindPopup('Default label', { autoPan: false });
  const custom = new Marker([60.2, 25.6]).addTo(map).bindPopup('closeButtonLabel: "Dismiss"', { closeButtonLabel: 'Dismiss', autoPan: false });

  for (const [name, marker] of [['default', byDefault], ['custom', custom]] as const) {
    marker.on('popupopen', (e) => {
      const label = e.popup.getElement()?.querySelector('.leaflet-popup-close-button')?.getAttribute('aria-label');
      log(`${name}: ${label}`);
    });
  }

  if (stage.preview) {
    const g = ghost(map);
    stage.onDispose(() => g.remove());
    stage.cycle(
      [byDefault, custom].map((m) => ({ run: () => g.click(m.getLatLng(), m.getElement()) })),
      2400,
    );
  }
  return () => stage.dispose();
};

export default mount;
