// Vizzu example: marker borderWidth and borderOpacity outline a see-through fill
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Marker border',
  summary:
    'A marker border is drawn in the marker colour. borderWidth sets its thickness and borderOpacity how opaque it is, so with a see-through fill the outline shows up as the opacity rises.',
  section: 'Style',
  tags: ['style', 'plot.marker.borderWidth', 'plot.marker.borderOpacity', 'plot.marker.fillOpacity'],
  docs: [
    'repo/docs/tutorial/style.md',
    'repo/src/apps/weblib/typeschema-api/styles.yaml',
    'repo/docs/tutorial/assets/setup/setup_c.js',
    'repo/docs/assets/data/music_data.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
