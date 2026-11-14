// motion example: Toast that enters, waits, leaves
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Toast that slides in, waits and slides out',
  summary: 'A save confirmation drops in from the top, stays for a moment and leaves, with the status text following each stage. Each animation can be awaited, so the steps read top to bottom like a script.',
  section: 'animate',
  tags: ['animate', 'await', 'then', 'delay', 'spring', 'controls'],
  docs: ['pages/motion-dev/docs/animate.md', 'pages/motion-dev/docs/scope-motion.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
