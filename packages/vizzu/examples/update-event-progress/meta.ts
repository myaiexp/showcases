// Vizzu example: the update event carries progress and position, drawn here as a progress bar
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Update event progress bar',
  summary:
    'The update event fires on every animation frame with detail.progress and detail.position. A three-second regrouping drives a progress bar under the chart from it; the full view also prints the numbers.',
  section: 'Events',
  tags: ['on', 'update', 'detail.progress', 'detail.position'],
  docs: [
    'repo/docs/tutorial/events.md',
    'repo/docs/tutorial/assets/setup/setup_c.js',
    'repo/docs/assets/data/music_data.js',
    'repo/src/apps/weblib/ts-api/events.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
