// Vizzu example: attaching a measure to the label channel writes it on the markers
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Values as labels",
  summary:
    "Data on the label channel is written on the markers. Attaching Popularity, the measure already on the y-axis, prints each column's value on top of it. Vizzu picks the label position itself.",
  section: "Channels & legend",
  tags: ['label','channels','attach'],
  docs: [
    'repo/docs/tutorial/channels_legend.md',
    'repo/docs/tutorial/channels_legend/01.js',
    'repo/docs/assets/data/music_data.js',
    'repo/docs/tutorial/assets/setup/setup_b.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
