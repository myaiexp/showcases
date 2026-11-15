// Vizzu example: with no options, Vizzu times the animation itself
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Default animation options",
  summary:
    "When animate() gets no options, Vizzu sets durations and delays from what changes. Here the columns are grouped and then stacked again with the defaults: the movement and the labels are each timed automatically.",
  section: "Animation options",
  tags: ['animate','options','default'],
  docs: [
    'repo/docs/tutorial/animation_options.md',
    'repo/docs/tutorial/animation_options/01.js',
    'repo/docs/tutorial/animation_options/02_a.js',
    'repo/docs/tutorial/animation_options/02_b.js',
    'repo/docs/tutorial/assets/setup/setup_c.js',
    'repo/docs/assets/data/music_data.js',
    'repo/src/apps/weblib/typeschema-api/anim.yaml',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
