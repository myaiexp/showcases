// Vizzu example: style.plot.marker.rectangleSpacing sets the gap between columns
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Rectangle spacing',
  summary:
    'plot.marker.rectangleSpacing sets the gap between neighbouring columns or bars as a fraction of the marker width. At 0 they touch; the default gap is already about three quarters of a column, and a spacing of 2 leaves thin columns.',
  section: 'Style',
  tags: ['style', 'plot.marker.rectangleSpacing'],
  docs: [
    'repo/docs/tutorial/style.md',
    'repo/src/apps/weblib/typeschema-api/styles.yaml',
    'repo/docs/tutorial/assets/setup/setup_c.js',
    'repo/docs/assets/data/music_data.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
