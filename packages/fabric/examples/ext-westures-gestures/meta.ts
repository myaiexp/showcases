// fabric example: Extensions: pinch and rotate gestures with westures
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Extensions: pinch and rotate gestures with westures',
  summary:
    'addGestures(canvas) recognises two-finger pinch and twist and fires canvas pinch and rotate events; pinchEventHandler scales the active shape or zooms the canvas, rotateEventHandler turns it. Buttons fire the same events without a touch screen; the card feeds the handlers synthetic data.',
  section: 'Extensions',
  tags: ['addGestures', 'pinchEventHandler', 'rotateEventHandler', 'westures', 'fireEventFromPointerEvent', 'zoomToPoint'],
  docs: [
    'repo/extensions/README.MD',
    'repo/CHANGELOG.md',
    'repo/src/content/docs/api/classes/Canvas.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
