// Vizzu example: a dimension on the color channel, with the colour legend
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "A colour for each category",
  summary:
    "Attaching the dimension Genres to the color channel gives every genre its own colour, and legend: \"color\" shows the key. Using the same dimension as the x-axis colours each bar once.",
  section: "Channels & legend",
  tags: ['color','legend','channels','attach'],
  docs: [
    'repo/docs/tutorial/channels_legend.md',
    'repo/docs/tutorial/channels_legend/03_a.js',
    'repo/docs/tutorial/channels_legend/03_b.js',
    'repo/docs/assets/data/music_data.js',
    'repo/docs/tutorial/assets/setup/setup_b.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
