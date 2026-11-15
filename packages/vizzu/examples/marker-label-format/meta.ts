// Vizzu example: style.plot.marker.label.format orders a measure and a dimension on a label
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Marker label value order',
  summary:
    "When a marker label shows both a measure and a dimension, plot.marker.label.format sets which comes first: 'measureFirst' reads 114, Hard and 'dimensionsFirst' reads Hard, 114.",
  section: 'Style',
  tags: ['style', 'plot.marker.label.format', 'label'],
  docs: [
    'repo/docs/tutorial/style.md',
    'repo/src/apps/weblib/typeschema-api/styles.yaml',
    'repo/docs/tutorial/assets/setup/setup_c.js',
    'repo/docs/assets/data/music_data.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
