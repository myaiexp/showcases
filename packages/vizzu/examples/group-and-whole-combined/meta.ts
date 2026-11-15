// Vizzu example: a total duration rescales the group timings proportionally
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Group and whole options together',
  summary:
    "The same group timings play twice: once as set (6 seconds in all), and once with duration: 1 on top. Vizzu then squeezes the groups into one second and keeps their proportions, so the style group still starts last. That pass also sets easing: 'linear' for the whole animation.",
  section: 'Animation options',
  tags: ['animate', 'options', 'duration', 'easing', 'y', 'style'],
  docs: [
    'repo/docs/tutorial/animation_options.md',
    'repo/docs/tutorial/animation_options/03_b.js',
    'repo/docs/tutorial/animation_options/05_a.js',
    'repo/docs/tutorial/animation_options/05_b.js',
    'repo/docs/tutorial/assets/setup/setup_c.js',
    'repo/docs/assets/data/music_data.js',
    'repo/src/apps/weblib/typeschema-api/anim.yaml',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
