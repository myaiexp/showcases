// Vizzu example: a background-draw handler paints an image and cancels the default background
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Background image',
  summary:
    'A background-draw handler can draw anything onto the canvas and then call preventDefault, so the library skips its own background. The docs use a tiny inline GIF stretched over the chart; here it is dimmed so the light text stays readable.',
  section: 'Events',
  tags: ['on', 'off', 'background-draw', 'preventDefault', 'detail.rect', 'renderingContext'],
  docs: [
    'repo/docs/tutorial/events.md',
    'repo/docs/tutorial/events/04_a.js',
    'repo/docs/tutorial/events/04_b.js',
    'repo/docs/tutorial/events/config.js',
    'repo/docs/tutorial/assets/setup/setup_c.js',
    'repo/docs/assets/data/music_data.js',
    'repo/src/apps/weblib/ts-api/events.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
