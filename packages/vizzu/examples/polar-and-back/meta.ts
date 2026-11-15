// Vizzu example: coordSystem: 'cartesian' undoes polar
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "From polar back to cartesian",
  summary:
    "Set coordSystem back to \"cartesian\" and the radial bars unroll into ordinary horizontal bars; the axes keep their series, only the geometry of the space changes.",
  section: "Orientation, split & polar",
  tags: ['coordSystem','cartesian','polar'],
  docs: [
    'repo/docs/tutorial/orientation_split_polar.md',
    'repo/docs/tutorial/orientation_split_polar/05_b.js',
    'repo/docs/assets/data/music_data.js',
    'repo/docs/tutorial/assets/setup/setup_c.js',
    'repo/src/apps/weblib/typeschema-api/config.yaml',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
