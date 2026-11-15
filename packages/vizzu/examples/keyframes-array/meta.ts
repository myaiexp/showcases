// Vizzu example: animate([{ target, options }, ...]) bundles keyframes into one animation
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Several states as one animation',
  summary:
    'An array of keyframes, each a target with its own options, plays as a single animation: grouped in 1 second, then stacked again in 2. Because it is one animation, one control can seek, pause or cancel the lot.',
  section: 'Animation control & keyframes',
  tags: ['animate', 'keyframes', 'target', 'options'],
  docs: [
    'repo/docs/tutorial/animation_control_keyframes.md',
    'repo/docs/tutorial/animation_control_keyframes/03_a.js',
    'repo/docs/tutorial/animation_control_keyframes/03_b.js',
    'repo/docs/tutorial/assets/setup/setup_c.js',
    'repo/docs/assets/data/music_data.js',
    'repo/src/apps/weblib/typeschema-api/anim.yaml',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
