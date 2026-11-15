// embedding-atlas example: two EmbeddingViews kept on one shared viewport
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Linked viewports',
  summary:
    'The docs suggest viewportState for sharing one camera across views. A points view and a density view of the same data each report pans and zooms through onViewportState, and the shared state is pushed back into both.',
  section: 'EmbeddingView',
  tags: ['viewportState', 'onViewportState', 'mode'],
  docs: [
    'pages/apple-github-io/embedding-atlas/embedding-view.md',
    'repo/packages/component/src/lib/embedding_view/embedding_view_config.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
