// Sortable.js example: the multi-drag event properties shown as a report
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'See where each moved stop came from',
  summary:
    'A bus route where you tick several stops and move them. A report next to the list shows how many stops moved and each one\'s old and new position, straight from the drop event.',
  section: 'MultiDrag',
  tags: ['multiDrag', 'items', 'oldIndicies', 'newIndicies', 'onEnd'],
  docs: ['repo/plugins/MultiDrag/README.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
