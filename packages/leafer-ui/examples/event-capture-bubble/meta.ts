// leafer-ui example: Event flow: capture and bubble phases
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Event flow: capture and bubble phases",
  summary: "A pointer event runs capture listeners from the root down, then the target, then bubble listeners back up. e.phase says which (1 capture, 2 target, 3 bubble). Three nested boxes log both directions.",
  section: "Events",
  tags: ["on capture", "phase", "Event.current", "flow"],
  docs: ["pages/www-leaferjs-com/ui/en/reference/event/flow.md", "pages/www-leaferjs-com/ui/en/reference/event/basic/Event.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
