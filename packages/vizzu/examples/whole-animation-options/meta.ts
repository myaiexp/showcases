// Vizzu example: options.duration and options.easing apply to the animation as a whole
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Duration and easing for the whole animation',
  summary:
    'Options given at the top level govern the whole animation. A 4 second duration with linear easing moves the columns at constant speed, and the way back is a 0.5 second jump.',
  section: 'Animation options',
  tags: ['animate', 'options', 'duration', 'easing', 'linear'],
  docs: [
    'repo/docs/tutorial/animation_options.md',
    'repo/docs/tutorial/animation_options/04_a.js',
    'repo/docs/tutorial/animation_options/04_b.js',
    'repo/docs/tutorial/assets/setup/setup_c.js',
    'repo/docs/assets/data/music_data.js',
    'repo/src/apps/weblib/typeschema-api/anim.yaml',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
