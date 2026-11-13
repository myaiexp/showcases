// Pretext example: balanced headline via binary search over walkLineRanges()
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Balanced headline',
  summary:
    'Binary-search the narrowest width whose walkLineRanges() line count equals the one at maxWidth, then call layoutWithLines() once at that width. The greedy wrap and the balanced wrap sit side by side.',
  section: 'Manual line layout',
  tags: ['walkLineRanges', 'layoutWithLines', 'balance', 'headline'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
