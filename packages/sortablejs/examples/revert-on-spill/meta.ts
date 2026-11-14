// Sortable.js example: a drop outside the list sends the item home
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Dropped outside, it flies back',
  summary:
    'A drawing app\'s toolbar: you can reorder the tools, but a tool let go anywhere outside the toolbar glides back to where it started, so nothing gets lost by a slip of the hand.',
  section: 'OnSpill',
  tags: ['revertOnSpill', 'onSpill', 'animation'],
  docs: ['repo/plugins/OnSpill/README.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
