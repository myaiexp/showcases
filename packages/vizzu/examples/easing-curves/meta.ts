// Vizzu example: options.easing takes named curves or a cubic-bezier()
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Easing curves',
  summary:
    'Easing shapes speed across an animation. The same move runs for 1.5 seconds with "linear", "ease-in", "ease-out", "step-end" (nothing moves until the end) and a custom cubic-bezier curve.',
  section: 'Animation options',
  tags: ['animate', 'options', 'easing', 'cubic-bezier', 'linear', 'ease-in', 'ease-out', 'step-end'],
  docs: [
    'repo/docs/tutorial/animation_options.md',
    'repo/docs/tutorial/animation_options/04_b.js',
    'repo/docs/tutorial/assets/setup/setup_c.js',
    'repo/docs/assets/data/music_data.js',
    'repo/src/apps/weblib/typeschema-api/anim.yaml',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
