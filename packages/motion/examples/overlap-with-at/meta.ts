// motion example: Notification card with overlapping steps
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Notification card with overlapping steps",
  summary: "A payment notification slides in while its icon pops and its text fades in, overlapping by different amounts. Pick the text segment's `at` to see how a number, \"+0.5\", \"-0.2\", \"<\" and \"<+0.3\" change when it starts.",
  section: 'Timeline sequences',
  tags: ['sequence', 'at', 'duration'],
  docs: ['pages/motion-dev/docs/timeline-sequences.md', 'pages/motion-dev/docs/animate.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
