// embedding-atlas example: extra tooltip fields from columns and SQL
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Additional fields',
  summary:
    'additionalFields adds named values to every DataPoint the view hands out, under fields. Each is a column name or { sql } with any per-row expression; a custom tooltip lists them: topic and score columns, a CASE grade, the text\'s length and its first word.',
  section: 'EmbeddingViewMosaic',
  tags: ['additionalFields', 'DataField', 'fields', 'customTooltip'],
  docs: [
    'pages/apple-github-io/embedding-atlas/embedding-view-mosaic.md',
    'repo/packages/component/src/lib/embedding_view/embedding_view_mosaic_api.ts',
    'repo/packages/component/src/lib/embedding_view/types.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
