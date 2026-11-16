// leafer-ui example: Events: the event option
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Events: the event option",
  summary:
    "Passing event: { [PointerEvent.ENTER]: fn } in the constructor data binds listeners at creation. It cannot be exported as JSON.",
  section: "Basics",
  tags: ['Rect.one', 'event', 'PointerEvent', 'ENTER', 'LEAVE'],
  docs: ['pages/www-leaferjs-com/ui/en/guide/basic/event.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
