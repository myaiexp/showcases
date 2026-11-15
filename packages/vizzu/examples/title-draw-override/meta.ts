// Vizzu example: a title-draw handler cancels the default title and draws its own text
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Draw your own title',
  summary:
    'A title-draw handler is given the title text and its transformed rectangle. It paints the text with a gradient and calls preventDefault, so the chart skips its own title; chart.off restores the normal one.',
  section: 'Events',
  tags: ['on', 'off', 'title-draw', 'preventDefault', 'detail.outerRect', 'detail.text'],
  docs: [
    'repo/docs/tutorial/events.md',
    'repo/docs/tutorial/assets/setup/setup_c.js',
    'repo/docs/assets/data/music_data.js',
    'repo/src/apps/weblib/ts-api/events.ts',
    'repo/src/apps/weblib/ts-api/geom.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
