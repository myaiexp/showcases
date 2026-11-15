// embedding-atlas example: embeddingViewConfig passed through EmbeddingAtlas
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Embedding view config',
  summary:
    'embeddingViewConfig is handed to the embedding panel inside Atlas: mode switches points and density contours, pointSize overrides the automatic size, minimumDensity hides thin contours, autoLabelEnabled turns cluster labels off, and downsampleMaxPoints thins the drawn points. The select steps through six configs.',
  section: 'EmbeddingAtlas',
  tags: ['embeddingViewConfig', 'mode', 'pointSize', 'minimumDensity', 'autoLabelEnabled', 'downsampleMaxPoints'],
  docs: [
    'repo/packages/viewer/src/api.ts',
    'repo/packages/component/src/lib/embedding_view/embedding_view_config.ts',
    'repo/packages/viewer/src/charts/embedding/types.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
