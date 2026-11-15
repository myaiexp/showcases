// embedding-atlas example: onPredicateChange reports a SQL predicate
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'The selection as a SQL predicate',
  summary:
    'onPredicateChange fires with a SQL expression (or null) whenever a brush, click or search changes the filter. Brush the words chart or click a topic and the predicate prints under the view, together with the row count you get by running it against the table.',
  section: 'EmbeddingAtlas',
  tags: ['onPredicateChange', 'predicate', 'chartStates', 'initialState'],
  docs: ['repo/packages/viewer/src/api.ts', 'pages/apple-github-io/embedding-atlas/embedding-atlas.md', 'repo/packages/docs/streamlit.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
