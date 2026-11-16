// leafer-ui example: UIEvent: path, target and current
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "UIEvent: path, target and current",
  summary: "e.path lists the elements an event passes through, target is the deepest one hit and current the one whose listener runs. Nested boxes log the path of each tap.",
  section: "Events",
  tags: ["UIEvent", "path", "target", "current", "Event"],
  docs: ["pages/www-leaferjs-com/ui/en/reference/event/ui/UIEvent.md", "pages/www-leaferjs-com/ui/en/reference/event/basic/Event.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
