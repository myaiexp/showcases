// embedding-atlas example: converting text categories to integers in SQL
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Text categories to integers',
  summary:
    'The Mosaic view\'s category column must hold integers starting from 0, as the prop\'s docs warn. The topic names are mapped to ids in DuckDB with DENSE_RANK() − 1 in a new topic_id column, and the readout lists the mapping.',
  section: 'EmbeddingViewMosaic',
  tags: ['category', 'DENSE_RANK', 'coordinator.query'],
  docs: ['repo/packages/component/src/lib/embedding_view/embedding_view_mosaic_api.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
