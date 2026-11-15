// Vizzu example: style.legend.marker.type and size shape the legend swatches
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Legend marker shape and size',
  summary:
    "The legend's swatches are circles by default. legend.marker.type switches them to 'square', and legend.marker.size sets their diameter or side.",
  section: 'Style',
  tags: ['style', 'legend.marker.type', 'legend.marker.size'],
  docs: [
    'repo/docs/tutorial/style.md',
    'repo/src/apps/weblib/typeschema-api/styles.yaml',
    'repo/docs/tutorial/chart_layout.md',
    'repo/docs/tutorial/assets/setup/setup_c.js',
    'repo/docs/assets/data/music_data.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
