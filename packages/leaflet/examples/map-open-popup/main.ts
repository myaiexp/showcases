// map.openPopup(content, latlng, options) and map.closePopup(): one popup at a time
import { LeafletMap, type LeafletPointerEvent } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import { ghost } from '../../shared/ghost.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click the map to open a popup there. openPopup closes the previous one; the button calls closePopup().' });
  const map = stage.own(new LeafletMap(stage.box, { center: [60.2, 24.9], zoom: stage.preview ? 7 : 8, zoomControl: !stage.preview, closePopupOnClick: false }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  // No layer and no Popup object: the map builds the popup from a string and a position.
  const open = (e: LeafletPointerEvent): void => {
    map.openPopup(`${e.latlng.lat.toFixed(3)}, ${e.latlng.lng.toFixed(3)}`, e.latlng, { closeButton: false, autoPan: false });
  };
  map.on('click', open);
  stage.button('map.closePopup()', () => map.closePopup());

  if (stage.preview) {
    const g = ghost(map);
    stage.onDispose(() => g.remove());
    stage.cycle(
      [
        { say: 'openPopup at one point', run: () => g.click([60.4, 24.2]) },
        { say: 'openPopup at another: the first closes', run: () => g.click([60.05, 25.5]) },
        { say: 'closePopup() closes the open one', run: () => map.closePopup(), hold: 1400 },
      ],
      2200,
    );
  }
  return () => stage.dispose();
};

export default mount;
