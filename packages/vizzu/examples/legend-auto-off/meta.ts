// Vizzu example: config.legend as auto, null and an explicit channel
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Legend: auto, off, or chosen",
  summary:
    "Vizzu shows or hides the legend by itself when legend is \"auto\". null removes it and its space from the layout; naming a channel (here \"lightness\") forces that channel's legend on. The stacked chart starts on auto, which shows the colour legend for Kinds.",
  section: "Channels & legend",
  tags: ['legend','color','lightness'],
  docs: [
    'repo/docs/tutorial/channels_legend.md',
    'repo/docs/tutorial/channels_legend/02_b.js',
    'repo/docs/assets/data/music_data.js',
    'repo/docs/tutorial/assets/setup/setup_c.js',
    'repo/src/apps/weblib/typeschema-api/config.yaml',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
