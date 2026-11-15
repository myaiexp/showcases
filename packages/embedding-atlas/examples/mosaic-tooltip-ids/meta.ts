// embedding-atlas example: showing a row's tooltip by passing only its id
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Tooltip by id',
  summary:
    'The Mosaic view\'s tooltip prop also takes a bare DataPointID. Given an identifier column, the view looks the row up, places the tooltip at its point and shows its text; onTooltip hands back the full DataPoint.',
  section: 'EmbeddingViewMosaic',
  tags: ['tooltip', 'identifier', 'DataPointID', 'onTooltip'],
  docs: [
    'pages/apple-github-io/embedding-atlas/embedding-view-mosaic.md',
    'repo/packages/component/src/lib/embedding_view/embedding_view_mosaic_api.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
