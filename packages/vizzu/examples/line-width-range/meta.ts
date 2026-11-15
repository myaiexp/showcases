// Vizzu example: lineMinWidth and lineMaxWidth bound the size channel on lines
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Line width range',
  summary:
    'On a line chart with a measure on size, line width runs between lineMinWidth and lineMaxWidth, as fractions of the plot width. Changing the range thickens or evens out the lines.',
  section: 'Style',
  tags: ['style', 'plot.marker.lineMinWidth', 'plot.marker.lineMaxWidth', 'size'],
  docs: ['repo/docs/tutorial/style.md', 'repo/src/apps/weblib/typeschema-api/styles.yaml'],
  provenance: 'pure',
  added: '2026-11-15',
});
