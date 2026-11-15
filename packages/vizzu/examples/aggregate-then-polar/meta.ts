// Vizzu example: detach a dimension, then coordSystem: 'polar' with a range on the dimension axis
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Aggregate, then go polar",
  summary:
    "Genres leaves the x-axis so each kind becomes one bar, then coordSystem \"polar\" bends the axes into a radial bar chart. The y range min of -30% opens a hole in the middle so the short bars stay readable.",
  section: "Orientation, split & polar",
  tags: ['coordSystem','polar','range','detach'],
  docs: [
    'repo/docs/tutorial/orientation_split_polar.md',
    'repo/docs/tutorial/orientation_split_polar/04_a.js',
    'repo/docs/tutorial/orientation_split_polar/04_b.js',
    'repo/docs/tutorial/orientation_split_polar/05_a.js',
    'repo/docs/tutorial/orientation_split_polar/05_b.js',
    'repo/docs/assets/data/music_data.js',
    'repo/docs/tutorial/assets/setup/setup_c.js',
    'repo/src/apps/weblib/typeschema-api/config.yaml',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
