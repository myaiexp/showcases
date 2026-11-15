// Vizzu example: split: true on the measure axis
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Split stacked values',
  summary:
    'With Genres and Popularity both on x, each bar is a stack of genres. Turning split on pulls the segments apart into separate side-by-side axes, each starting at its own zero, so the genres of a kind can be compared directly.',
  section: 'Orientation, split & polar',
  tags: ['split', 'channels', 'orientation'],
  docs: [
    'repo/docs/tutorial/orientation_split_polar.md',
    'repo/docs/tutorial/orientation_split_polar/01.js',
    'repo/docs/tutorial/orientation_split_polar/02_a.js',
    'repo/docs/tutorial/orientation_split_polar/02_b.js',
    'repo/docs/assets/data/music_data.js',
    'repo/docs/tutorial/assets/setup/setup_c.js',
    'repo/src/apps/weblib/typeschema-api/config.yaml',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
