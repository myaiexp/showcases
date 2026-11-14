// motion example: Magnetic button that pulls toward the pointer
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Magnetic button that pulls toward the pointer',
  summary: 'A call-to-action button that leans toward your pointer when you come near. distance2D measures the gap between the pointer and the button, and the pull grows as that gap shrinks and vanishes outside a set radius.',
  section: 'Utils',
  tags: ['distance2D', 'animate', 'spring', 'scopeMotion'],
  docs: ['pages/motion-dev/docs/distance.md', 'pages/motion-dev/docs/scope-motion.md', 'pages/motion-dev/docs/animate.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
