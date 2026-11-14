// g6 example: Events: canvas events with CanvasEvent
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Events: canvas events with CanvasEvent',
  summary: "graph.on(CanvasEvent.CLICK, handler) and friends: click, double click, drag start, drag, wheel and pointer move on empty canvas, logged with the event's position.",
  section: 'Further Reading',
  tags: ['on', 'CanvasEvent.CLICK', 'CanvasEvent.DBLCLICK', 'CanvasEvent.DRAG', 'CanvasEvent.WHEEL', 'emit'],
  docs: [
    'repo/packages/site/docs/manual/further-reading/event.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
