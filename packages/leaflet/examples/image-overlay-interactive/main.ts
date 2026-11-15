// interactive: true makes an image overlay fire pointer events and open popups
import { ImageOverlay, LatLngBounds, LeafletMap } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import { images } from '../../shared/data.ts';
import { ghost } from '../../shared/ghost.ts';

const mount: Mount = async (el, ctx) => {
  const imageUrl = await images.newark1922();
  const stage = createStage(el, ctx, { hint: 'Hover and click the old map. A non-interactive overlay lets the pointer through to the map.' });
  const log = stage.log('Overlay events', 10);
  const map = stage.own(new LeafletMap(stage.box, { zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { maxZoom: 18, attribution: LAND_ATTRIBUTION }).addTo(map);

  const bounds = new LatLngBounds([
    [40.799311, -74.118464],
    [40.68202047785919, -74.33],
  ]);
  const overlay = new ImageOverlay(imageUrl, bounds, { opacity: 0.7, interactive: true, alt: 'Newark, N.J. in 1922' }).addTo(map);
  map.fitBounds(bounds);
  overlay.bindPopup('Newark, 1922');
  overlay.on('pointerover', () => {
    overlay.setOpacity(1);
    log('pointerover: opacity 1');
  });
  overlay.on('pointerout', () => {
    overlay.setOpacity(0.7);
    log('pointerout: opacity 0.7');
  });
  overlay.on('click', (e) => log(`click at ${e.latlng.lat.toFixed(3)}, ${e.latlng.lng.toFixed(3)}`));

  if (stage.preview) {
    const g = ghost(map);
    stage.onDispose(() => g.remove());
    const el1 = (): Element | undefined => overlay.getElement();
    stage.cycle(
      [
        { run: () => g.over([40.76, -74.25], el1()), hold: 1200 },
        { run: () => g.click([40.72, -74.2], el1()), hold: 2000 },
        { run: () => g.out(el1()), hold: 300 },
        { run: () => map.closePopup(), hold: 800 },
      ],
      500,
    );
  }
  return () => stage.dispose();
};

export default mount;
