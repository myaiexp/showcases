// One Popup reused on every map click to show the clicked coordinates
import { LeafletMap, Popup, type LeafletPointerEvent } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import { ghost } from '../../shared/ghost.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click anywhere on the map: the popup moves there and reports the coordinates.' });

  const map = stage.own(new LeafletMap(stage.box).setView([51.505, -0.09], 13));
  new LocalTileLayer('https://tiles.example/{z}/{x}/{y}.png', { maxZoom: 19, attribution: LAND_ATTRIBUTION }).addTo(map);

  // One Popup object for every click. openOn(map) closes whichever popup was open before it.
  const popup = new Popup();
  map.on('click', (e: LeafletPointerEvent) => {
    popup.setLatLng(e.latlng).setContent(`You clicked the map at ${e.latlng.toString()}`).openOn(map);
  });

  if (stage.preview) {
    const g = ghost(map);
    stage.onDispose(() => g.remove());
    stage.cycle(
      [
        { run: () => g.click([51.508, -0.11]) },
        { run: () => g.click([51.498, -0.07]) },
        { run: () => g.click([51.51, -0.06]) },
        { run: () => g.click([51.5, -0.12]) },
      ],
      2000,
    );
  }
  return () => stage.dispose();
};

export default mount;
