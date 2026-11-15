// DomEvent.getWheelDelta: pixel, line and page wheel events reduced to one scale
import { DomEvent, LeafletMap } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import { ghost } from '../../shared/ghost.ts';

const MODES = ['pixels', 'lines', 'pages'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Scroll the wheel over the map. A trackpad usually sends pixels, a mouse wheel often lines.' });
  const log = stage.log('wheel');
  const map = stage.own(new LeafletMap(stage.box, { center: [30, 10], zoom: 3, zoomControl: !stage.preview, wheelPxPerZoomLevel: 120 }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);
  const container = map.getContainer();

  DomEvent.on(container, 'wheel', (e) => {
    log(`deltaY ${e.deltaY} (${MODES[e.deltaMode] ?? '?'}) → getWheelDelta ${DomEvent.getWheelDelta(e)}`);
  });
  stage.onDispose(() => DomEvent.off(container, 'wheel'));

  if (stage.preview) {
    const g = ghost(map);
    stage.onDispose(() => g.remove());
    const send = (deltaY: number, deltaMode: number): void => {
      const r = container.getBoundingClientRect();
      g.move([30, 10]);
      container.dispatchEvent(new WheelEvent('wheel', { deltaY, deltaMode, clientX: r.left + r.width / 2, clientY: r.top + r.height / 2, bubbles: true, cancelable: true }));
    };
    stage.cycle(
      [
        { run: () => send(-100, 0) },
        { run: () => send(3, 1) },
        { run: () => send(1, 2) },
        { run: () => send(100, 0) },
        { run: () => send(-3, 1) },
      ],
      1500,
    );
  }
  return () => stage.dispose();
};

export default mount;
