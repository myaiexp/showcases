// Vizzu example: series descriptor objects instead of aggregator names in strings
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Aggregator as an object",
  summary:
    "The second way to pick an aggregator is a series descriptor: { name: \"Popularity\", aggregator: \"max\" } in place of the string \"max(Popularity)\". The chart is identical; the object form is the one the data typings document (sum, count, min, max, mean, distinct).",
  section: "Aggregating data",
  tags: ['aggregator','SeriesDescriptor','AggregatorType','set'],
  docs: [
    'repo/docs/tutorial/aggregating_data.md',
    'repo/docs/tutorial/aggregating_data/02_b.js',
    'repo/docs/tutorial/aggregating_data/03_b.js',
    'repo/docs/tutorial/aggregating_data/06_b.js',
    'repo/docs/assets/data/music_data.js',
    'repo/docs/tutorial/assets/setup/setup_b.js',
    'repo/src/apps/weblib/typeschema-api/data.yaml',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
