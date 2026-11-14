// motion example: File upload progress driven by a function segment
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "File upload progress driven by a function segment",
  summary: "A file-upload row fills its bar, counts up a percentage and turns green. No element is animated directly: a function in the sequence receives progress, and a second one receives a colour from keyframes.",
  section: 'Timeline sequences',
  tags: ['sequence', 'function segment', 'progress callback', 'keyframes', 'onRepeat'],
  docs: ['pages/motion-dev/docs/timeline-sequences.md', 'pages/motion-dev/docs/animate.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
