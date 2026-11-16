// leafer-ui example: DragEvent: enter, leave, over and out
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "DragEvent: enter, leave, over and out",
  summary: "While a drag is in progress, the elements it passes get drag.enter, drag.over, drag.out and drag.leave. A drop zone lights up on enter and dims on leave; the log lists the events as the dragged square crosses it.",
  section: "Events",
  tags: ["DragEvent.ENTER", "DragEvent.LEAVE", "DragEvent.OVER", "DragEvent.OUT"],
  docs: ["pages/www-leaferjs-com/ui/en/reference/event/ui/Drag.md", "pages/www-leaferjs-com/ui/en/reference/event/ui/Drop.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
