// motion example: Live log of timeline events
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Live log of timeline events",
  summary: "A ball runs twice across a lane while a log prints onRepeat, onComplete and onReverseComplete, and a clock follows onUpdate. Play it forwards and backwards to see which event fires.",
  section: 'Timeline sequences',
  tags: ['onUpdate', 'onRepeat', 'onComplete', 'onReverseComplete', 'reverse', 'repeat'],
  docs: ['pages/motion-dev/docs/timeline-sequences.md', 'pages/motion-dev/docs/animate.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
