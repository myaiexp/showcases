// Vizzu example: the size channel sets line width when the geometry is line
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Size as line width',
  summary:
    'On a line chart the size channel sets the width of the line. Revenue by year per region is drawn as thin lines, then Profit goes on the size channel and each line thickens and thins with its profit.',
  section: 'Channels & legend',
  tags: ['size', 'geometry', 'line', 'channels'],
  docs: [
    'repo/docs/tutorial/channels_legend.md',
    'repo/docs/tutorial/channels_legend/04_a.js',
    'repo/docs/tutorial/channels_legend/04_b.js',
    'repo/docs/tutorial/assets/setup/setup_b.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
