// embedding-atlas example: a multi-point selection through the selection prop
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Selection from code',
  summary:
    'selection takes an array of DataPoints and highlights them, the same state a click (or shift/cmd+click) makes. Each option picks the 25 points nearest a topic\'s centre; null clears it.',
  section: 'EmbeddingView',
  tags: ['selection', 'DataPoint', 'update'],
  docs: ['pages/apple-github-io/embedding-atlas/embedding-view.md', 'repo/packages/component/src/lib/embedding_view/types.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
