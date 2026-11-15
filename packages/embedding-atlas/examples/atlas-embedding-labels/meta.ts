// embedding-atlas example: embeddingViewLabels, hand-placed labels in Atlas
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Your own embedding labels',
  summary:
    'embeddingViewLabels takes a list of { x, y, content, level, priority } labels in data coordinates and draws them on the embedding panel instead of the automatic ones. A level-0 label per topic shows from the start; a level-1 label per topic appears after zooming in.',
  section: 'EmbeddingAtlas',
  tags: ['embeddingViewLabels', 'Label', 'level', 'priority', 'autoLabelEnabled'],
  docs: [
    'repo/packages/viewer/src/api.ts',
    'repo/packages/component/src/lib/embedding_view/types.ts',
    'repo/packages/component/src/lib/embedding_view/embedding_view_config.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
