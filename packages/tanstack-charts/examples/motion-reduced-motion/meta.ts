// tanstack-charts example: Motion respects reduced motion
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Motion respects reduced motion',
  summary:
    'motion() snaps entrance, update and focus changes when prefers-reduced-motion matches, unless respectReducedMotion is false. The readout shows the system preference. With the option off the springs always run, which only suits an application that has its own accessible motion policy.',
  section: 'Motion',
  tags: ['motion', 'respectReducedMotion', 'prefers-reduced-motion'],
  docs: ['repo/docs/reference/motion.md', 'repo/docs/guides/accessibility.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
