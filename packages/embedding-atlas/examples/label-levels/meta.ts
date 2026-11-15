// embedding-atlas example: label levels that appear at deeper zoom
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Label levels',
  summary:
    'A label with level n shows up around a 2^n zoom factor. Topic names sit at level 0, and two rings of the topic\'s words at levels 1 and 2 appear only as you zoom into a cluster.',
  section: 'EmbeddingView',
  tags: ['labels', 'level', 'onViewportState', 'viewportState'],
  docs: [
    'pages/apple-github-io/embedding-atlas/embedding-view.md',
    'repo/packages/component/src/lib/embedding_view/types.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
