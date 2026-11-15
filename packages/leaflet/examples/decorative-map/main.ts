// The inert attribute on a decorative map: no tab stops, no pointer, no accessible content
import { LeafletMap, Marker } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import './style.css';

const FOCUSABLE = 'a[href], button, [tabindex]:not([tabindex="-1"])';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Toggle inert, then try to drag the map or press Tab: with inert on, nothing responds.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [40, 20], zoom: 4, zoomControl: true }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);
  for (const at of [[41.9, 12.5], [37.98, 23.73], [48.2, 16.4]] as [number, number][]) new Marker(at).addTo(map);
  const box = map.getContainer();
  const before = document.activeElement;

  // Trying focus() is the honest test: elements inside an inert tree refuse it.
  const countFocusable = (): { total: number; reachable: number } => {
    const nodes = [box, ...box.querySelectorAll<HTMLElement>(FOCUSABLE)];
    let reachable = 0;
    for (const n of nodes) {
      n.focus({ preventScroll: true });
      if (document.activeElement === n) reachable++;
    }
    if (document.activeElement instanceof HTMLElement && box.contains(document.activeElement)) document.activeElement.blur();
    if (before instanceof HTMLElement && before !== document.body) before.focus({ preventScroll: true });
    return { total: nodes.length, reachable };
  };
  const set = (on: boolean): void => {
    box.inert = on;
    const { total, reachable } = countFocusable();
    stage.say(`inert ${on ? 'on' : 'off'}: ${total} elements want focus, ${reachable} can get it`, on ? 'ok' : 'info');
  };
  stage.toggle('inert on the map container', false, set);
  set(false);

  if (stage.preview) {
    let on = false;
    stage.cycle([{ run: () => set((on = !on)) }], 2400);
  }
  stage.onDispose(() => (box.inert = false));
  return () => stage.dispose();
};

export default mount;
