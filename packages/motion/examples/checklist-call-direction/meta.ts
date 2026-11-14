// motion example: Checklist that unticks when played backwards
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Checklist that unticks when played backwards",
  summary: "An onboarding checklist ticks each step as the animation passes it, and unticks it when you play backwards. timeline.call() tells the callback which direction the playhead is travelling.",
  section: 'Timeline sequences',
  tags: ['call', 'direction', 'playTo', 'autoplay'],
  docs: ['pages/motion-dev/docs/timeline-sequences.md', 'pages/motion-dev/docs/animate.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
