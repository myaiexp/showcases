// leafer-ui example: LayoutEvent: layout passes and again
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "LayoutEvent: layout passes and again",
  summary: "A layout cycle emits layout.request, start, before, layout, after and end. A listener on layout.after that changes something and emits layout.again forces another pass, shown by the times counter.",
  section: "Events",
  tags: ["LayoutEvent.REQUEST", "LayoutEvent.START", "LayoutEvent.LAYOUT", "LayoutEvent.AFTER", "LayoutEvent.AGAIN", "LayoutEvent.END", "times"],
  docs: ["pages/www-leaferjs-com/ui/en/reference/event/basic/Layout.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
