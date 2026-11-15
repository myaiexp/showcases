// Vizzu example: chart.config shows what each channel holds after attach and detach
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Read the chart config',
  summary:
    'attach and detach change a channel without restating it, so chart.config is how you read what is on each channel now. The full view prints the x, y and color channels from chart.config after every step; the card prints them in the caption.',
  section: 'Axes, title, tooltip',
  tags: ['chart.config', 'attach', 'detach'],
  docs: [
    'repo/docs/tutorial/axes_title_tooltip.md',
    'repo/docs/tutorial/axes_title_tooltip/04_a.js',
    'repo/docs/assets/data/music_data.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
