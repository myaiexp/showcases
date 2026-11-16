// fabric example: Events: mouse event log
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Events: mouse event log',
  summary:
    'canvas.on() listens to mouse:down, mouse:up, mouse:move, mouse:over, mouse:out, mouse:dblclick and mouse:wheel. Each log line shows the target and the scenePoint and viewportPoint the event carries.',
  section: 'Events',
  tags: ['on', 'mouse:down', 'mouse:up', 'mouse:move', 'mouse:over', 'mouse:out', 'mouse:dblclick', 'mouse:wheel', 'scenePoint', 'viewportPoint'],
  docs: [
    'repo/src/content/docs/docs/Old docs/fabric-intro-part-2.md',
    'repo/src/content/docs/api/classes/Canvas.md',
    'repo/src/content/docs/api/interfaces/CanvasEvents.md',
    'repo/src/content/docs/api/interfaces/TPointerEventInfo.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
