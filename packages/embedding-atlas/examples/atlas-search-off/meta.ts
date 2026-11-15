// embedding-atlas example: searcher null disables the search box
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Search switched off',
  summary:
    'With searcher left undefined, Atlas gives the text column a default full-text search box. Passing searcher: null removes search from the UI. The select swaps between the two over the same table.',
  section: 'EmbeddingAtlas',
  tags: ['searcher', 'null', 'data.text'],
  docs: ['repo/packages/viewer/src/api.ts', 'pages/apple-github-io/embedding-atlas/embedding-atlas.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
