// observable-plot example: Stack: barY on an ordinal x scale
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Stack: barY on an ordinal x scale',
  summary:
    'Deaths stacked as bars where x is ordinal. The x scale interval option fills in missing months and the tick format shows narrow month names.',
  section: 'Transform: Stack',
  tags: ['barY', 'stackY', 'interval', 'tickFormat'],
  docs: ['repo/docs/transforms/stack.md', 'repo/docs/data/crimea.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
