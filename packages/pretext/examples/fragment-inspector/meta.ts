// Pretext example: inspecting rich-inline fragments
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Fragment inspector',
  summary:
    'A table of every materialized fragment: its item index, gapBefore and gapItemIndex, occupiedWidth, and sourceStart to sourceEnd, with that slice highlighted in its source item. Drag the width to watch fragments split and gaps move.',
  section: 'Rich inline',
  tags: ['RichInlineFragment', 'gapItemIndex', 'sourceStart', 'inspector'],
  docs: ['repo/README.md', 'repo/CHANGELOG.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
