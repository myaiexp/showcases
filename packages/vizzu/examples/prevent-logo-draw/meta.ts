// Vizzu example: preventDefault in a logo-draw handler stops the Vizzu logo from being drawn
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Prevent the logo draw',
  summary:
    "Calling event.preventDefault() in a draw handler cancels the library's own drawing of that element. The logo-draw handler here makes the Vizzu logo in the bottom right corner disappear, and chart.off brings it back.",
  section: 'Events',
  tags: ['on', 'off', 'logo-draw', 'preventDefault', 'rendering.update'],
  docs: [
    'repo/docs/tutorial/events.md',
    'repo/docs/tutorial/events/03_a.js',
    'repo/docs/tutorial/events/03_b.js',
    'repo/docs/tutorial/events/config.js',
    'repo/docs/tutorial/assets/setup/setup_c.js',
    'repo/docs/assets/data/music_data.js',
    'repo/src/apps/weblib/ts-api/events.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
