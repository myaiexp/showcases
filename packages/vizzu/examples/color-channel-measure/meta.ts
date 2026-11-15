// Vizzu example: a measure on the color channel makes a colour range
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A colour range from a measure',
  summary:
    'When the color channel carries a measure instead of a dimension, Vizzu colours the markers along a range, so the legend is a gradient bar rather than a list of names. Here Popularity, which also gives the column heights, sets the colours.',
  section: 'Channels & legend',
  tags: ['color', 'legend', 'channels', 'attach'],
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
