// leafer-ui example: Event: changeName for custom event names
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Event: changeName for custom event names",
  summary: "PointerEvent.changeName(PointerEvent.ENTER, 'pointerenter') gives an event constant another string name, handy for old code. This changes names page-wide, so the full view applies it and restores it on leaving; the card shows the string forms.",
  section: "Events",
  tags: ["PointerEvent.changeName", "UIEvent", "event names"],
  docs: ["pages/www-leaferjs-com/ui/en/reference/event/name.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
