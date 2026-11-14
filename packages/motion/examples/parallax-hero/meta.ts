// motion example: Parallax mountain hero
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Parallax mountain hero',
  summary: 'A landscape banner whose sun, ridges and title drift at different speeds as it scrolls away, so the picture seems to have depth. Each layer is one animation, all tied to the hero with scroll(): target picks the hero and offset says the range runs from its top reaching the panel top until its bottom does.',
  section: 'scroll',
  tags: ['scroll', 'target', 'offset', 'container', 'animate'],
  docs: ['pages/motion-dev/docs/scroll.md', 'pages/motion-dev/docs/animate.md', 'pages/motion-dev/docs/scope-motion.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
