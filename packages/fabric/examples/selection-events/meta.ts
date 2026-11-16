// fabric example: Selection: created, updated and cleared
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Selection: created, updated and cleared',
  summary:
    'selection:created, selection:updated and selection:cleared fire as the selection changes, carrying the selected and deselected objects. Each object fires its own selected and deselected too.',
  section: 'Selection',
  tags: ['selection:created', 'selection:updated', 'selection:cleared', 'before:selection:cleared', 'selected', 'deselected'],
  docs: [
    'repo/src/content/docs/docs/Old docs/v2-breaking-changes.md',
    'repo/src/content/docs/docs/Old docs/v4-breaking-changes.md',
    'repo/src/content/docs/docs/Old docs/v5-breaking-changes.md',
    'repo/src/content/docs/api/interfaces/CanvasEvents.md',
    'repo/src/content/docs/api/interfaces/ObjectEvents.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
