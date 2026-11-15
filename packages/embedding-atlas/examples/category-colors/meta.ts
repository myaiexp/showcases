// embedding-atlas example: custom category palettes through categoryColors
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Category colours',
  summary:
    'categoryColors replaces the default palette: category i is drawn in the i-th colour of the list. Switching palettes goes through view.update({ categoryColors }), including one that greys out every topic but one.',
  section: 'EmbeddingView',
  tags: ['categoryColors', 'data.category', 'update'],
  docs: ['pages/apple-github-io/embedding-atlas/embedding-view.md', 'repo/packages/component/src/lib/embedding_view/embedding_view_api.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
