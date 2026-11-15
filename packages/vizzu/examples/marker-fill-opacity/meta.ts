// Vizzu example: style.plot.marker.fillOpacity makes marker fills see-through
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Marker fill opacity',
  summary:
    'plot.marker.fillOpacity makes marker fills see-through, from 1 (solid) to 0 (invisible). The guide lines behind the columns show through as it drops.',
  section: 'Style',
  tags: ['style', 'plot.marker.fillOpacity'],
  docs: [
    'repo/docs/tutorial/style.md',
    'repo/src/apps/weblib/typeschema-api/styles.yaml',
    'repo/docs/tutorial/assets/setup/setup_c.js',
    'repo/docs/assets/data/music_data.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
