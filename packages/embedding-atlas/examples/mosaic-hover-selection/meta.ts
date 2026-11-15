// embedding-atlas example: hover and click as Mosaic Selection predicates
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Hover into a Selection',
  summary:
    'tooltip and selection also accept Mosaic Selections. Bound that way, hovering and clicking update them with predicates on the identifier column, so any other Mosaic client can react; the two readouts print each WHERE clause.',
  section: 'EmbeddingViewMosaic',
  tags: ['tooltip', 'selection', 'Selection', 'identifier'],
  docs: [
    'pages/apple-github-io/embedding-atlas/embedding-view-mosaic.md',
    'repo/packages/component/src/lib/embedding_view/embedding_view_mosaic_api.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
