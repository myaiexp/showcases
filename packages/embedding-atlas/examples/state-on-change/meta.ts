// embedding-atlas example: onStateChange and onPredicateChange callbacks
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "onStateChange and onPredicateChange",
  summary:
    "onStateChange hands over the whole EmbeddingAtlasState, and onPredicateChange the SQL predicate behind the current filter. Brush the histogram in the full view and the readouts below update; the cards cycle a saved brush and let the callbacks fire.",
  section: "State & Layouts",
  tags: ['onStateChange', 'onPredicateChange', 'EmbeddingAtlasState', 'chartStates'],
  docs: [
    'repo/packages/viewer/src/api.ts',
    'repo/packages/docs/embedding-atlas.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
