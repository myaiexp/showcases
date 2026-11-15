// Vizzu example: style.plot.marker.label.orientation and angle rotate marker labels
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Marker label rotation',
  summary:
    "plot.marker.label.orientation turns a label to 'vertical', 'horizontal', 'normal' or 'tangential'; angle adds a further rotation to whichever orientation is set.",
  section: 'Style',
  tags: ['style', 'plot.marker.label.orientation', 'plot.marker.label.angle'],
  docs: [
    'repo/docs/tutorial/style.md',
    'repo/src/apps/weblib/typeschema-api/styles.yaml',
    'repo/docs/tutorial/assets/setup/setup_c.js',
    'repo/docs/assets/data/music_data.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
