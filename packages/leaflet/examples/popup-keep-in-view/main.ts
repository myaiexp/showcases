// Popup keepInView: dragging the map never carries an open popup out of sight
import { LeafletMap, Marker } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import { ghost } from '../../shared/ghost.ts';
import { gestures } from '../../shared/gestures.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Open the popup and drag the map so it would leave the view. With keepInView the map pans back.' });
  const log = stage.preview ? (): void => undefined : stage.log('Events', 8);
  const map = stage.own(new LeafletMap(stage.box, { center: [60.2, 24.9], zoom: 8, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  const marker = new Marker([60.2, 24.9]).addTo(map).bindPopup('Drag the map: I stay in view', { keepInView: true });
  const popup = marker.getPopup();
  map.on('autopanstart', () => log('autopanstart'));
  stage.toggle('keepInView', true, (on) => {
    if (popup) popup.options.keepInView = on;
  });

  if (stage.preview) {
    // A click right after a drag is ignored by Leaflet, so the card opens the popup by method.
    const g = ghost(map);
    stage.onDispose(() => g.remove());
    const gest = gestures(stage, map, g);
    const center = (): void => {
      marker.closePopup();
      map.setView([60.2, 24.9], 8, { animate: false });
    };
    stage.cycle(
      [
        { say: 'keepInView: true. Open the popup', run: () => (center(), marker.openPopup()), hold: 1200 },
        { say: 'Drag the map away: it pans back', run: () => gest.drag([60.35, 24.3], [-30, 120], 600), hold: 1800 },
        {
          say: 'keepInView: false, same drag',
          run: () => {
            center();
            if (popup) popup.options.keepInView = false;
            marker.openPopup();
          },
          hold: 1200,
        },
        { say: 'The popup leaves the view', run: () => gest.drag([60.35, 24.3], [-30, 120], 600), hold: 1800 },
        {
          run: () => {
            center();
            if (popup) popup.options.keepInView = true;
          },
          hold: 300,
        },
      ],
      800,
    );
  }
  return () => stage.dispose();
};

export default mount;
