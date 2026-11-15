// embedding-atlas example: two million points in one EmbeddingView
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Two million points',
  summary:
    'The docs pitch the component at "up to a few million points". Two million x, y and category values (about 18 MB of typed arrays) go straight into data; zoom in and every point is still there.',
  section: 'EmbeddingView',
  tags: ['data', 'Float32Array', 'Uint8Array', 'scale'],
  docs: ['repo/packages/docs/embedding-view.md', 'pages/apple-github-io/embedding-atlas/embedding-view.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
