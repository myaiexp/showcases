// embedding-atlas example: selecting rows by their identifier column
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Select by id',
  summary:
    'With an identifier column, selection accepts plain ids (DataPointID[]) and every selected DataPoint carries its identifier. The buttons select the ten highest-scoring rows of a topic, looked up in SQL; clicks report their ids through onSelection.',
  section: 'EmbeddingViewMosaic',
  tags: ['identifier', 'selection', 'DataPointID', 'onSelection'],
  docs: [
    'pages/apple-github-io/embedding-atlas/embedding-view-mosaic.md',
    'repo/packages/component/src/lib/embedding_view/embedding_view_mosaic_api.ts',
    'repo/packages/component/src/lib/embedding_view/types.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
