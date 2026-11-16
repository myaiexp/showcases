// leafer-ui example: Events: listen with on()
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Events: listen with on()",
  summary:
    "rect.on(PointerEvent.ENTER, fn) adds a listener; the handler gets the event and e.current is the element. Hovering lightens the rect, leaving restores it.",
  section: "Basics",
  tags: ['Rect', 'on', 'PointerEvent', 'ENTER', 'LEAVE', 'draggable'],
  docs: ['pages/www-leaferjs-com/ui/en/guide/basic/event.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
