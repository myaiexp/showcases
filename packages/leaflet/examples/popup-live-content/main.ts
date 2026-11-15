// Changing a popup's content while it is open: setContent, update and the contentupdate event
import { LeafletMap, Marker } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The popup\'s content changes every second. Leaflet re-measures it and keeps it on the marker; each change fires contentupdate.' });
  const log = stage.log('contentupdate', 6);
  const map = stage.own(new LeafletMap(stage.box, { center: [60.2, 24.9], zoom: 8, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  const marker = new Marker([60.17, 24.94]).addTo(map).bindPopup('Waiting…', { autoPan: false, closeOnClick: false });
  const popup = marker.getPopup();
  let n = 0;
  popup?.on('contentupdate', () => log(`contentupdate (update ${n})`));
  marker.openPopup();

  const tick = (): void => {
    n += 1;
    // The popup grows by one line each second; setContent re-renders and re-lays it out.
    const lines = Array.from({ length: 1 + (n % 5) }, (_, i) => `Line ${i + 1}`);
    marker.setPopupContent(`<b>Update ${n}</b><br>${lines.join('<br>')}`);
  };
  tick();
  stage.every(1200, tick);
  stage.button('Reopen', () => marker.openPopup());

  return () => stage.dispose();
};

export default mount;
