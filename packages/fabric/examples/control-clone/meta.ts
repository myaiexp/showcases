// fabric example: Controls: A clone control
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Controls: A clone control',
  summary:
    "A Control with a mouseUpHandler that calls object.clone(), offsets the copy, gives it the same button and selects it. Clicking the button on each copy builds a diagonal stack.",
  section: 'Controls',
  tags: ['Control','mouseUpHandler','clone','render','cursorStyle','setActiveObject'],
  docs: ['repo/src/content/docs/docs/Old docs/control-api.md', 'repo/src/content/docs/api/classes/Control.md', 'repo/src/content/docs/api/classes/FabricObject.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
