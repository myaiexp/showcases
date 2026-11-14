// motion example: A highlight helper that accepts any target
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A highlight helper that accepts any target',
  summary: 'A release-notes page and a highlight() function of your own that flashes whatever you hand it: a selector, one element, a NodeList, an array, or null. resolveElements() turns all of those into a plain array, the same way animate() and inView() read their targets.',
  section: 'Utils',
  tags: ['resolveElements', 'selector', 'NodeList', 'scope'],
  docs: ['pages/motion-dev/docs/resolve-elements.md', 'pages/motion-dev/docs/animate.md', 'pages/motion-dev/docs/scope-motion.md', 'pages/motion-dev/docs/delay.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
