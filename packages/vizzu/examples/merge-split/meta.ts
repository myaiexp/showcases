// Vizzu example: split: false puts split components back into one stack
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Merge split values",
  summary:
    "Starting from side-by-side bars, split false stacks the genres on top of each other again, so each bar's length is the total for its kind.",
  section: "Orientation, split & polar",
  tags: ['split','channels','orientation'],
  docs: [
    'repo/docs/tutorial/orientation_split_polar.md',
    'repo/docs/tutorial/orientation_split_polar/02_b.js',
    'repo/docs/tutorial/orientation_split_polar/03_a.js',
    'repo/docs/tutorial/orientation_split_polar/03_b.js',
    'repo/docs/assets/data/music_data.js',
    'repo/docs/tutorial/assets/setup/setup_c.js',
    'repo/src/apps/weblib/typeschema-api/config.yaml',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
