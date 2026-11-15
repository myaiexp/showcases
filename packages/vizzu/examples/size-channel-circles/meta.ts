// Vizzu example: the size channel only acts on circle and line geometry
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Size needs circles",
  summary:
    "Setting Popularity on the size channel changes nothing while the geometry is rectangle, because the docs say size is ignored there. Switching geometry to circle makes the marker radius follow the values.",
  section: "Channels & legend",
  tags: ['size','geometry','circle','channels'],
  docs: [
    'repo/docs/tutorial/channels_legend.md',
    'repo/docs/tutorial/channels_legend/04_a.js',
    'repo/docs/tutorial/channels_legend/04_b.js',
    'repo/docs/assets/data/music_data.js',
    'repo/docs/tutorial/assets/setup/setup_b.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
