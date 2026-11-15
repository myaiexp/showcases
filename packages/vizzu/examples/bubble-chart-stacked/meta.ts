// Vizzu example: geometry: 'circle' turns the treemap into bubbles
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Treemap to a stacked bubble chart",
  summary:
    "Changing the geometry to circle turns the treemap's rectangles into bubbles. Genres and Popularity are on size and Kinds on colour, and the bubbles gather in a small cluster for each colour. (The docs' text says Kinds is on size, but the config puts Genres there.)",
  section: "Without coordinates & noop channel",
  tags: ['geometry','circle','size'],
  docs: [
    'repo/docs/tutorial/without_coordinates_noop_channel.md',
    'repo/docs/tutorial/without_coordinates_noop_channel/02_a.js',
    'repo/docs/tutorial/without_coordinates_noop_channel/02_b.js',
    'repo/docs/assets/data/music_data.js',
    'repo/docs/tutorial/assets/setup/setup_c.js',
    'repo/src/apps/weblib/typeschema-api/config.yaml',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
