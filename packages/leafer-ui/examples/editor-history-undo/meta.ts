// leafer-ui example: Editor history: drag.start and drag.end as undo points
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Editor history: drag.start and drag.end as undo points",
  summary: "The docs suggest recording history at the editor's drag.start and drag.end events: this keeps the selected elements' layout before and after every drag and undoes or redoes it on demand.",
  section: 'Graphic editor',
  tags: ["Editor", "DragEvent.START", "DragEvent.END", "history", "undo", "redo"],
  docs: ["pages/www-leaferjs-com/ui/en/plugin/in/editor/Editor/history.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
