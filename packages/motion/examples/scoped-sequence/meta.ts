// motion example: Two identical widgets, one scoped sequence
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Two identical widgets, one scoped sequence",
  summary: "Two widgets share the same class names but only the left one moves: scopeMotion() with a root element confines the sequence. The scope's transition fills in the duration, and the sequence keeps its own easing.",
  section: 'Timeline sequences',
  tags: ['scopeMotion', 'root', 'transition', 'defaultTransition', 'add'],
  docs: ['pages/motion-dev/docs/timeline-sequences.md', 'pages/motion-dev/docs/animate.md', 'pages/motion-dev/docs/scope-motion.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
