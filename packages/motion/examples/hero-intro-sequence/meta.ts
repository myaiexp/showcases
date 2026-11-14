// motion example: Landing page hero intro, one step after another
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Landing page hero intro, one step after another",
  summary: "A hero section builds itself in order: headline, subtitle, buttons, then the picture springs in. Nothing sets a start time, because each segment of an animate() sequence simply starts when the previous one ends.",
  section: 'Timeline sequences',
  tags: ['animate', 'sequence', 'segment', 'defaultTransition', 'spring', 'speed'],
  docs: ['pages/motion-dev/docs/timeline-sequences.md', 'pages/motion-dev/docs/animate.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
