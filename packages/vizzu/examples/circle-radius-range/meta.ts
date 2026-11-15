// Vizzu example: circleMinRadius and circleMaxRadius bound the size channel on circles
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Circle radius range',
  summary:
    'With a measure on size, circles scale between circleMinRadius and circleMaxRadius, given as a fraction of the plot size. Raising the minimum squeezes the differences; lowering the maximum shrinks every circle.',
  section: 'Style',
  tags: ['style', 'plot.marker.circleMinRadius', 'plot.marker.circleMaxRadius', 'size'],
  docs: [
    'repo/docs/tutorial/style.md',
    'repo/src/apps/weblib/typeschema-api/styles.yaml',
    'repo/docs/tutorial/assets/setup/setup_c.js',
    'repo/docs/assets/data/music_data.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
