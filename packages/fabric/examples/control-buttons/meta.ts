// fabric example: Controls: Controls as click buttons
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Controls: Controls as click buttons',
  summary:
    "A Control with only mouseDownHandler and mouseUpHandler is a button: one flips the object, the other cycles its fill, each drawn by its own render(). The log shows which handler fired.",
  section: 'Controls',
  tags: ['Control','mouseDownHandler','mouseUpHandler','render','cursorStyle','flipX'],
  docs: ['repo/src/content/docs/docs/Old docs/control-api.md', 'repo/src/content/docs/api/classes/Control.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
