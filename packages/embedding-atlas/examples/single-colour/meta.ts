// embedding-atlas example: an EmbeddingView with x and y only, no categories
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'No categories',
  summary:
    'data.category is optional. With only the x and y Float32Arrays, every point is drawn in the same colour and the clusters show through density alone.',
  section: 'EmbeddingView',
  tags: ['data.x', 'data.y', 'viewportState'],
  docs: ['pages/apple-github-io/embedding-atlas/embedding-view.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
