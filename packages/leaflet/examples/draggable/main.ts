// Draggable on a plain panel: handle, events, clickTolerance, and one drag at a time
import { DomUtil, Draggable, LeafletMap, Point } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import { inDragLane } from '../../shared/drag-lane.ts';
import './style.css';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag the orange title bar: the panel follows. Drag the map: it pans. Only one Draggable moves at a time.' });
  const log = stage.log('Draggable events');
  const map = stage.own(new LeafletMap(stage.box, { center: [35, 15], zoom: 3, zoomControl: false }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  const panel = DomUtil.create('div', 'drag-panel', map.getContainer());
  const handle = DomUtil.create('div', 'drag-handle', panel);
  handle.textContent = 'Drag me';
  const body = DomUtil.create('div', 'drag-body', panel);
  body.textContent = 'The body is not a handle.';
  const home = new Point(14, 14);
  DomUtil.setPosition(panel, home);

  // element moved, element that starts the drag, options
  const draggable = new Draggable(panel, handle, { clickTolerance: 3 });
  draggable.enable();
  stage.onDispose(() => draggable.disable());

  let moves = 0;
  draggable.on('down', () => log('down'));
  draggable.on('dragstart', () => {
    moves = 0;
    log('dragstart');
  });
  draggable.on('drag', () => {
    moves++;
    const p = DomUtil.getPosition(panel);
    stage.say(`drag ${moves}: getPosition = ${p.x}, ${p.y}`);
  });
  draggable.on('dragend', (e) => {
    log(`dragend after ${moves} drag events, distance ${Math.round(e.distance)} px`);
    stage.say(`dragend: distance ${Math.round(e.distance)} px`);
  });

  stage.slider('clickTolerance', 0, 40, 1, 3, (v) => (draggable.options.clickTolerance = v));
  stage.toggle('enabled', true, (on) => (on ? draggable.enable() : draggable.disable()));
  stage.button('Reset position', () => DomUtil.setPosition(panel, home));

  if (stage.preview) {
    const slide = (by: [number, number]): Promise<void> =>
      inDragLane(async () => {
        if (stage.disposed) return;
        const r = handle.getBoundingClientRect();
        const start = { clientX: r.left + 20, clientY: r.top + 8 };
        const send = (type: string, x: number, y: number): void => {
          handle.dispatchEvent(new PointerEvent(type, { clientX: x, clientY: y, bubbles: true, cancelable: true, pointerType: 'mouse', isPrimary: true, button: 0, buttons: type === 'pointerup' ? 0 : 1 }));
        };
        send('pointerdown', start.clientX, start.clientY);
        try {
          for (let i = 1; i <= 16 && !stage.disposed; i++) {
            await stage.wait(40);
            send('pointermove', start.clientX + (by[0] * i) / 16, start.clientY + (by[1] * i) / 16);
          }
        } finally {
          send('pointerup', start.clientX + by[0], start.clientY + by[1]);
        }
      }).catch(() => undefined);
    stage.cycle(
      [
        { run: () => slide([120, 50]) },
        { run: () => slide([-40, 30]) },
        { run: () => slide([-80, -80]) },
      ],
      900,
    );
  }
  return () => stage.dispose();
};

export default mount;
