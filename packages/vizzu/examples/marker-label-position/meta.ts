// Vizzu example: style.plot.marker.label.position places labels around their markers
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Marker label position',
  summary:
    'plot.marker.label.position puts each label relative to its marker: center, top, bottom, left or right. Labels sit on top of the columns by default; they move around the columns while the columns stay put.',
  section: 'Style',
  tags: ['style', 'plot.marker.label.position'],
  docs: [
    'repo/docs/tutorial/style.md',
    'repo/src/apps/weblib/typeschema-api/styles.yaml',
    'repo/docs/tutorial/assets/setup/setup_c.js',
    'repo/docs/assets/data/music_data.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
