// Vizzu example: the lightness channel and legend: "lightness"
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Lightness and its legend",
  summary:
    "The lightness channel sets how light each marker is. Attaching Popularity, the measure that gives the height, makes the taller columns lighter. Setting legend to \"lightness\" turns on the legend for that channel.",
  section: "Channels & legend",
  tags: ['lightness','legend','channels','attach'],
  docs: [
    'repo/docs/tutorial/channels_legend.md',
    'repo/docs/tutorial/channels_legend/02_a.js',
    'repo/docs/tutorial/channels_legend/02_b.js',
    'repo/docs/assets/data/music_data.js',
    'repo/docs/tutorial/assets/setup/setup_b.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
