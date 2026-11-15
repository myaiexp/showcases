// embedding-atlas example: the smallest EmbeddingView, new EmbeddingView()
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'First EmbeddingView',
  summary:
    'The docs\' vanilla setup: new EmbeddingView(target, props) with Float32Array x and y columns and a Uint8Array of category indices. Fifty thousand points in six topic clusters, coloured by category with the default palette.',
  section: 'EmbeddingView',
  tags: ['new EmbeddingView', 'data.x', 'data.y', 'data.category', 'width', 'height', 'colorScheme'],
  docs: [
    'repo/packages/docs/embedding-view.md',
    'pages/apple-github-io/embedding-atlas/embedding-view.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
