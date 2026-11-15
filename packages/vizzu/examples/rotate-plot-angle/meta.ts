// Vizzu example: config.angle rotates the plot area, an experimental option
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Rotate the plot area',
  summary:
    'config.angle turns the whole plot area, in radians. A polar chart is rotated by 1 radian (about 57 degrees) and back, and its axis labels turn with it. The docs call the option experimental; in this chart it worked without glitches.',
  section: 'Orientation, split & polar',
  tags: ['angle', 'polar', 'coordSystem'],
  docs: [
    'repo/docs/tutorial/orientation_split_polar.md',
    'repo/docs/assets/data/music_data.js',
    'repo/docs/tutorial/assets/setup/setup_c.js',
    'repo/src/apps/weblib/typeschema-api/config.yaml',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
