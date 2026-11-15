// embedding-atlas example: label priority settles which overlapping label shows
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Label priority',
  summary:
    'Six labels share almost the same spot in every cluster, so only one can be placed. Raising one label\'s priority to 10 (the rest stay at 1) decides which word wins; switching the favourite re-places them all.',
  section: 'EmbeddingView',
  tags: ['labels', 'priority', 'update'],
  docs: ['pages/apple-github-io/embedding-atlas/embedding-view.md', 'repo/packages/component/src/lib/embedding_view/types.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
