// DomUtil.getScale: a CSS-scaled map still reports correct container points
import { DomEvent, DomUtil, LeafletMap } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Change the scale and move over the map. The orange value (getPointerPosition) matches the map; the naive one drifts as the scale moves from 1.' });
  const pre = stage.side('Pointer');
  const map = stage.own(new LeafletMap(stage.box, { center: [35, 20], zoom: 3, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);
  const container = map.getContainer();

  const scale = (s: number): void => {
    stage.box.style.transform = `scale(${s})`;
    stage.box.style.transformOrigin = '0 0';
    if (stage.preview) {
      stage.box.style.height = `${200 / s}px`;
      stage.box.style.width = `${100 / s}%`;
      stage.box.style.flex = 'none';
    }
  };
  scale(stage.preview ? 0.7 : 0.8);

  map.on('pointermove', (e) => {
    const rect = container.getBoundingClientRect();
    const naive = `${Math.round(e.originalEvent.clientX - rect.left)}, ${Math.round(e.originalEvent.clientY - rect.top)}`;
    const fixed = DomEvent.getPointerPosition(e.originalEvent, container);
    const sc = DomUtil.getScale(container);
    const text = `getScale x ${sc.x.toFixed(2)}, y ${sc.y.toFixed(2)} | getPointerPosition ${Math.round(fixed.x)}, ${Math.round(fixed.y)} | e.containerPoint ${Math.round(e.containerPoint.x)}, ${Math.round(e.containerPoint.y)} | naive ${naive}`;
    if (pre) pre.textContent = text.split(' | ').join('\n');
    else stage.say(text);
  });
  stage.slider('CSS scale', 0.4, 1, 0.05, 0.8, (v) => {
    scale(v);
    map.invalidateSize();
  });

  if (stage.preview) {
    let t = 0;
    stage.every(150, () => {
      t += 0.15;
      // Same events a pointer sends, at client coordinates inside the scaled box.
      const rect = container.getBoundingClientRect();
      const clientX = rect.left + rect.width * (0.5 + 0.35 * Math.sin(t));
      const clientY = rect.top + rect.height * (0.5 + 0.3 * Math.cos(t * 1.3));
      container.dispatchEvent(new PointerEvent('pointermove', { clientX, clientY, bubbles: true, pointerType: 'mouse', isPrimary: true }));
    });
  }
  return () => stage.dispose();
};

export default mount;
