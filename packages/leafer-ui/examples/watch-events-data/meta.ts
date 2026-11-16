// leafer-ui example: WatchEvent: the list of changed elements
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "WatchEvent: the list of changed elements",
  summary: "WatchEvent.DATA carries the elements that changed since the last frame. Changing several rects in one tick produces one event with all of them; the log lists their names.",
  section: "Events",
  tags: ["WatchEvent.DATA", "WatchEvent.REQUEST", "data"],
  docs: ["pages/www-leaferjs-com/ui/en/reference/event/basic/Watch.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
