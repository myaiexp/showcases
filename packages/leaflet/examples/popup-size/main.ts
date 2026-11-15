// Popup maxWidth, minWidth and maxHeight: wrapping, a minimum and a scrolling popup
import { LeafletMap, Marker } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import { ghost } from '../../shared/ghost.ts';

const TEXT = 'Leaflet wraps this text to the popup\'s maximum width and, if a height limit is set, scrolls what does not fit.';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Left to right: the default (maxWidth 300), maxWidth 110, minWidth 150 with short text, maxHeight 50. Sliders resize the last one.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [60.0, 24.9], zoom: stage.preview ? 7 : 8, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  const plain = new Marker([60.2, 23.9]).addTo(map).bindPopup(TEXT);
  const narrow = new Marker([60.2, 24.5]).addTo(map).bindPopup(TEXT, { maxWidth: 110 });
  const wide = new Marker([60.2, 25.2]).addTo(map).bindPopup('Short', { minWidth: 150 });
  const scroll = new Marker([60.2, 25.9]).addTo(map).bindPopup(`${TEXT} ${TEXT}`, { maxHeight: 50, maxWidth: 180 });

  // Layout is redone on update(), which reads the popup's options again.
  const resize = (key: 'maxWidth' | 'maxHeight', v: number): void => {
    const popup = scroll.getPopup();
    if (!popup) return;
    popup.options[key] = v;
    scroll.openPopup();
    popup.update();
  };
  stage.slider('maxWidth', 80, 300, 10, 180, (v) => resize('maxWidth', v));
  stage.slider('maxHeight', 30, 140, 5, 50, (v) => resize('maxHeight', v));

  if (stage.preview) {
    const g = ghost(map);
    stage.onDispose(() => g.remove());
    const says = ['Default: up to 300px wide', 'maxWidth 110: wraps sooner', 'minWidth 150: never narrower', 'maxHeight 50: scrolls'];
    stage.cycle(
      [plain, narrow, wide, scroll].map((m, i) => ({ say: says[i], run: () => g.click(m.getLatLng(), m.getElement()) })),
      2300,
    );
  }
  return () => stage.dispose();
};

export default mount;
