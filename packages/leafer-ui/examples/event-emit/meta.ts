// leafer-ui example: Events: emit an event yourself
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Events: emit an event yourself",
  summary:
    "rect.emit(\"pointer.enter\", { current: rect }) fires the listeners directly, with no pointer involved. The example emits enter and leave in turn; the full view has buttons.",
  section: "Basics",
  tags: ['Rect', 'emit', 'on', 'pointer.enter', 'pointer.leave'],
  docs: ['pages/www-leaferjs-com/ui/en/guide/basic/event.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
