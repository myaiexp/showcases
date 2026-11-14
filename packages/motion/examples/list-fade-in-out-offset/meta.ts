// motion example: Inbox rows that fade as they scroll in and out
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Inbox rows that fade as they scroll in and out',
  summary: 'A message list whose rows grow into view at the bottom edge and shrink away at the top. Every row is tracked as its own target, and offset decides which stretch of the scroll counts: from "start end" (about to appear) to "end start" (just gone). Switch it to fade in only or out only.',
  section: 'scroll',
  tags: ['scroll', 'target', 'offset', 'container', 'times', 'animate'],
  docs: ['pages/motion-dev/docs/scroll.md', 'pages/motion-dev/docs/animate.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
