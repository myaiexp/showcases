// motion example: Story that pauses at each chapter
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Story that pauses at each chapter",
  summary: "A rocket story stops itself at the end of every chapter, shows what happened, and waits for you to press Continue. addPause() sets the stops, with a callback that runs when it pauses.",
  section: 'Timeline sequences',
  tags: ['addPause', 'label', 'play', 'onComplete'],
  docs: ['pages/motion-dev/docs/timeline-sequences.md', 'pages/motion-dev/docs/animate.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
