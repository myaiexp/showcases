// Vizzu example: the noop channel keeps a dimension in the chart without it changing the markers
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "One bubble group with the noop channel",
  summary:
    "Moving Genres from size to noop leaves one bubble per genre and kind but stops it from grouping them, so all the bubbles sit in a single cluster. noop only changes how many markers there are.",
  section: "Without coordinates & noop channel",
  tags: ['noop','size','detach','channels'],
  docs: [
    'repo/docs/tutorial/without_coordinates_noop_channel.md',
    'repo/docs/tutorial/without_coordinates_noop_channel/03_a.js',
    'repo/docs/tutorial/without_coordinates_noop_channel/03_b.js',
    'repo/docs/assets/data/music_data.js',
    'repo/docs/tutorial/assets/setup/setup_c.js',
    'repo/src/apps/weblib/typeschema-api/config.yaml',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
