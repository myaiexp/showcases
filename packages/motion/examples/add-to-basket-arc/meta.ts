// motion example: Add to basket flies the product into the cart
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Add to basket flies the product into the cart',
  summary: 'Press "Add to basket" and a copy of the product thumbnail swings along a curve into the cart icon, which bumps and counts up. arc() bends the x and y travel so the flight reads as a throw rather than a slide.',
  section: 'Utils',
  tags: ['arc', 'transition.path', 'strength', 'rotate', 'scopeMotion'],
  docs: ['pages/motion-dev/docs/arc.md', 'pages/motion-dev/docs/scope-motion.md', 'pages/motion-dev/docs/delay.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
