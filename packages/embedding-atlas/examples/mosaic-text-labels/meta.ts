// embedding-atlas example: automatic labels and tooltips from a text column
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Labels from a text column',
  summary:
    'Naming a text column does two things: the default tooltip shows the hovered row\'s text, and, with no labels prop, the view labels its dense clusters automatically with words summarised from the texts inside them.',
  section: 'EmbeddingViewMosaic',
  tags: ['text', 'autoLabelEnabled', 'tooltip'],
  docs: [
    'pages/apple-github-io/embedding-atlas/embedding-view-mosaic.md',
    'repo/packages/component/src/lib/embedding_view/embedding_view_mosaic_api.ts',
    'repo/packages/component/src/lib/embedding_view/embedding_view_config.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
