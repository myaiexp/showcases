// Layer popup methods: togglePopup, isPopupOpen, setPopupContent, getPopup and unbindPopup
import { LeafletMap, Marker } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import { ghost } from '../../shared/ghost.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each button calls one method on the marker. The caption shows what isPopupOpen() and getPopup() answer.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [60.2, 24.9], zoom: 8, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  const marker = new Marker([60.17, 24.94]).addTo(map);
  let version = 1;
  const bind = (): void => void marker.bindPopup(`Popup content, version ${version}`);
  bind();

  const report = (what: string): void => {
    stage.say(`${what}: isPopupOpen() is ${marker.isPopupOpen()}, getPopup() is ${marker.getPopup() ? 'a Popup' : String(marker.getPopup())}`);
  };
  const actions: [string, () => void][] = [
    ['togglePopup()', () => marker.togglePopup()],
    ['setPopupContent()', () => marker.setPopupContent(`Popup content, version ${++version}`)],
    // unbindPopup() only detaches the listeners: an open popup stays open, so close it first.
    ['closePopup() + unbindPopup()', () => marker.closePopup().unbindPopup()],
    ['bindPopup()', bind],
  ];
  for (const [label, fn] of actions) {
    stage.button(label, () => {
      fn();
      report(label);
    });
  }
  report('Start');

  if (stage.preview) {
    const g = ghost(map);
    stage.onDispose(() => g.remove());
    const steps = actions.map(([label, fn], i) => ({
      run: () => {
        fn();
        report(label);
        if (i === 2) g.click(marker.getLatLng(), marker.getElement());
      },
    }));
    stage.cycle([steps[0]!, steps[1]!, steps[0]!, steps[0]!, steps[2]!, steps[3]!], 1700);
  }
  return () => stage.dispose();
};

export default mount;
