// DomEvent.getPointerPosition: page position versus position inside the container, border excluded
import { DomEvent, LeafletMap } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import './style.css';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Move to the inner top-left corner of the map, just inside the orange border: the container position is 0, 0.' });
  const pre = stage.side('Pointer');
  const map = stage.own(new LeafletMap(stage.box, { center: [30, 0], zoom: 3, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);
  const container = map.getContainer();

  map.on('pointermove', (e) => {
    const page = DomEvent.getPointerPosition(e.originalEvent);
    const inside = DomEvent.getPointerPosition(e.originalEvent, container);
    const text = `no container (page): ${page.x.toFixed(0)}, ${page.y.toFixed(0)} | with container: ${inside.x.toFixed(0)}, ${inside.y.toFixed(0)} | containerPoint: ${e.containerPoint.x.toFixed(0)}, ${e.containerPoint.y.toFixed(0)}`;
    if (pre) pre.textContent = text.split(' | ').join('\n');
    else stage.say(text);
  });

  if (stage.preview) {
    let t = 0;
    stage.every(150, () => {
      t += 0.12;
      const rect = container.getBoundingClientRect();
      // From the inner top-left corner out to the middle and back.
      const k = (1 - Math.cos(t)) / 2;
      container.dispatchEvent(
        new PointerEvent('pointermove', {
          clientX: rect.left + container.clientLeft + k * container.clientWidth * 0.8,
          clientY: rect.top + container.clientTop + k * container.clientHeight * 0.8,
          bubbles: true,
          pointerType: 'mouse',
          isPrimary: true,
        }),
      );
    });
  }
  return () => stage.dispose();
};

export default mount;
