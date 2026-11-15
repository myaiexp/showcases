// embedding-atlas example: image cluster labels chosen by an importance column
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Image labels from columns',
  summary:
    'Name an image column, an importance column and an identifier, and cluster labels show the image of the most important row in each region instead of words. Thumbnails are drawn in code as data URLs on one row in 25, and those rows outrank the rest, since a region whose top row has no image gets no label.',
  section: 'EmbeddingViewMosaic',
  tags: ['image', 'importance', 'identifier', 'labels'],
  docs: [
    'pages/apple-github-io/embedding-atlas/embedding-view-mosaic.md',
    'repo/packages/component/src/lib/embedding_view/embedding_view_mosaic_api.ts',
    'repo/packages/docs/data-formats.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
