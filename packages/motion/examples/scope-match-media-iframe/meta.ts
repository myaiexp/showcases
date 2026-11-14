// motion example: Layout animation that switches by screen width
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Layout animation that switches by screen width',
  summary: 'A mini website in a frame you can resize. Below a breakpoint it shows a menu button that pops in, above it a full navigation that cascades in. scopeMotion matchMedia re-runs setup whenever the width crosses the line, with named conditions or a shorthand like ">=560 !touch", and toMediaQuery shows the real query.',
  section: 'Utils',
  tags: ['scopeMotion', 'matchMedia', 'media', 'toMediaQuery', 'shorthands', 'stagger'],
  docs: ['pages/motion-dev/docs/scope-motion.md', 'pages/motion-dev/docs/stagger.md', 'pages/motion-dev/docs/animate.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
