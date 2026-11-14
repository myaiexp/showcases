// Sortable.js example: a selection that survives clicks outside the list
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Keep the selection when you click away',
  summary:
    'Two guest lists, each with a "Send invites" button. In the default list the ticks vanish the moment you press the button; with avoidImplicitDeselect they stay, so the button knows who to invite.',
  section: 'MultiDrag',
  tags: ['multiDrag', 'avoidImplicitDeselect', 'selectedClass'],
  docs: ['repo/plugins/MultiDrag/README.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
