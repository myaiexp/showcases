// motion example: Timeline driven by a scrolling panel
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Timeline driven by a scrolling panel",
  summary: "A three-step rocket story that plays as you scroll a panel, forwards or back, with no clock. In the card, an animate() call writes the panel's scrollTop, so you can see it working untouched.",
  section: 'Timeline sequences',
  tags: ['scroll', 'container', 'sequence', 'animate'],
  docs: ['pages/motion-dev/docs/timeline-sequences.md', 'pages/motion-dev/docs/animate.md', 'pages/motion-dev/docs/scroll.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
