// Vizzu example: options.y and options.style give one group its own duration and delay
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Timing a single animation group',
  summary:
    'The animation has groups: marker movement along y, style changes, and others. Here y gets duration 2 and delay 2, and style gets duration 2 and delay 4 (seconds). The columns move first, and the labels drift to their new place four seconds in.',
  section: 'Animation options',
  tags: ['animate', 'options', 'y', 'style', 'duration', 'delay'],
  docs: [
    'repo/docs/tutorial/animation_options.md',
    'repo/docs/tutorial/animation_options/03_a.js',
    'repo/docs/tutorial/animation_options/03_b.js',
    'repo/docs/tutorial/assets/setup/setup_c.js',
    'repo/docs/assets/data/music_data.js',
    'repo/src/apps/weblib/typeschema-api/anim.yaml',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
