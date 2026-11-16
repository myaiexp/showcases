// fabric example: Controls: A control placed by positionHandler
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Controls: A control placed by positionHandler',
  summary:
    "A Control's positionHandler returns where its handle is drawn, so a handle can sit anywhere, here on the rim of a Circle at an angle you choose; its actionHandler turns the pointer into a new radius.",
  section: 'Controls',
  tags: ['Control','positionHandler','actionHandler','controls','Circle'],
  docs: ['repo/src/content/docs/docs/Old docs/control-api.md', 'repo/src/content/docs/api/classes/Control.md', 'repo/src/content/docs/api/classes/Circle.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
