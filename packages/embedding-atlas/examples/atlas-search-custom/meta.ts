// embedding-atlas example: a custom searcher.fullTextSearch over tags
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Custom full-text search',
  summary:
    'searcher.fullTextSearch(query, { limit, predicate, onStatus }) replaces the default text-column search. This one matches tags that start with each typed word, runs SQL honouring the predicate the charts pass in, reports progress through onStatus, and logs every call under the view.',
  section: 'EmbeddingAtlas',
  tags: ['searcher', 'fullTextSearch', 'onStatus', 'predicate', 'limit'],
  docs: ['repo/packages/viewer/src/api.ts', 'pages/apple-github-io/embedding-atlas/embedding-atlas.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
