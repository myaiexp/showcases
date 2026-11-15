// Popup autoPan: the map pans to fit an opening popup, with padding; autopanstart fires
import { LeafletMap, Marker } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import { ghost } from '../../shared/ghost.ts';

const CENTER: [number, number] = [60.2, 24.9];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The marker is near the top right corner. Open its popup with autoPan on and off, then change the padding.' });
  const log = stage.preview ? (): void => undefined : stage.log('Events', 8);
  const map = stage.own(new LeafletMap(stage.box, { center: CENTER, zoom: 8, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  const marker = new Marker([60.4, 25.5]).addTo(map).bindPopup('Opening me pans the map so I fit.<br>Padding is the gap I keep from the edge.', { autoPanPadding: [10, 10] });
  const popup = marker.getPopup();
  map.on('autopanstart', () => log('autopanstart'));

  const reopen = (): void => {
    marker.closePopup();
    map.setView(CENTER, 8, { animate: false });
    marker.openPopup();
  };
  stage.toggle('autoPan', true, (on) => {
    if (popup) popup.options.autoPan = on;
    reopen();
  });
  stage.slider('autoPanPadding', 0, 80, 5, 10, (v) => {
    if (popup) popup.options.autoPanPadding = [v, v];
    reopen();
  });

  if (stage.preview) {
    const g = ghost(map);
    stage.onDispose(() => g.remove());
    const click = (): void => g.click(marker.getLatLng(), marker.getElement());
    const reset = (): void => {
      marker.closePopup();
      map.setView(CENTER, 8, { animate: false });
    };
    stage.cycle(
      [
        { say: 'autoPan on: the map pans to fit the popup', run: () => (reset(), click()), hold: 2600 },
        { say: 'Closed and reset', run: reset, hold: 700 },
        {
          say: 'autoPan false: the popup is cut off',
          run: () => {
            if (popup) popup.options.autoPan = false;
            click();
          },
          hold: 2400,
        },
        {
          run: () => {
            reset();
            if (popup) popup.options.autoPan = true;
          },
          hold: 400,
        },
      ],
      1000,
    );
  }
  return () => stage.dispose();
};

export default mount;
