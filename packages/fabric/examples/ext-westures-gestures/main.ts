// addGestures with the pinch and rotate handlers, and by hand
import { Canvas, Rect, Triangle, type FabricObject } from 'fabric';
import { addGestures, pinchEventHandler, rotateEventHandler } from 'fabric/extensions';
import type { Mount } from '@/types.ts';
import { briefStatus } from '../../shared/code-panel.ts';
import { button } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [320, 220],
    hint: 'On a touch screen, pinch and twist on the selected shape: addGestures() (the westures library) turns two-finger input into canvas "pinch" and "rotate" events. pinchEventHandler scales the active shape (or zooms the canvas when it is not under the fingers) and rotateEventHandler turns it. Without a touch screen, the buttons fire the same events.',
  });
  const canvas = stage.own(new Canvas(stage.el));
  const say = briefStatus(stage);
  const tri = new Triangle({ left: 160, top: 110, width: 90, height: 80, fill: '#ffe9a8', stroke: '#d99a1c', strokeWidth: 2 });
  const rect = new Rect({ left: 70, top: 60, width: 50, height: 36, fill: '#cfe3ff', stroke: '#3b7dd8', strokeWidth: 2 });
  canvas.add(rect, tri);
  canvas.setActiveObject(tri);

  // the two handlers the extension exports: `this` is the canvas
  canvas.on('pinch', pinchEventHandler);
  canvas.on('rotate', rotateEventHandler);
  const log = (what: string): void => say(`${what}\nscale ${tri.scaleX.toFixed(2)}  angle ${Math.round(tri.angle)}°`);
  canvas.on('pinch', ({ scale }) => log(`pinch ${scale.toFixed(2)}`));
  canvas.on('rotate', ({ rotation }) => log(`rotate ${rotation.toFixed(2)} rad`));
  log('waiting for a gesture');

  // Fire an event the way a recogniser would: through fabric's own gesture path, at a point.
  const upper = canvas.upperCanvasEl;
  const fire = (name: 'pinch' | 'rotate', data: Record<string, number>, at: FabricObject = tri): void => {
    if (canvas.disposed) return;
    const c = at.getCenterPoint().transform(canvas.viewportTransform);
    const r = upper.getBoundingClientRect();
    const e = new MouseEvent('pointermove', { clientX: r.left + (c.x * r.width) / canvas.width, clientY: r.top + (c.y * r.height) / canvas.height, bubbles: true });
    Object.defineProperty(e, 'target', { value: upper });
    canvas.fireEventFromPointerEvent(e, name, name, data);
    canvas.requestRenderAll();
  };

  if (stage.bar) {
    // real gestures: addGestures() adds westures listeners on the window too; take them off at the end
    const added: [string, EventListenerOrEventListenerObject, boolean | AddEventListenerOptions | undefined][] = [];
    const add = window.addEventListener;
    window.addEventListener = ((type: string, fn: EventListenerOrEventListenerObject, opts?: boolean | AddEventListenerOptions) => {
      added.push([type, fn, opts]);
      return add.call(window, type, fn, opts);
    }) as typeof window.addEventListener;
    try {
      addGestures(canvas);
    } finally {
      window.addEventListener = add;
    }
    stage.onDispose(() => added.forEach(([t, f, o]) => window.removeEventListener(t, f, o)));
    button(stage.bar, 'pinch out', () => fire('pinch', { scale: 1.15 }));
    button(stage.bar, 'pinch in', () => fire('pinch', { scale: 0.87 }));
    button(stage.bar, 'rotate 20°', () => fire('rotate', { rotation: (20 * Math.PI) / 180 }));
    button(stage.bar, 'zoom the canvas (pinch off the shape)', () => {
      canvas.discardActiveObject();
      fire('pinch', { scale: 1.2 }, rect);
      canvas.setActiveObject(tri);
    });
    button(stage.bar, 'reset', () => {
      tri.set({ scaleX: 1, scaleY: 1, angle: 0 });
      canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
      tri.setCoords();
      canvas.requestRenderAll();
    });
  } else {
    // a card has no fingers: the same handlers, fed the events a pinch and a twist would send
    let t = 0;
    stage.loop((dt) => {
      t += dt;
      fire('pinch', { scale: 1 + 0.5 * Math.sin(t * 1.6) * dt });
      fire('rotate', { rotation: 1.1 * dt });
    });
  }
  return stage.dispose;
};

export default mount;
