// motion example: Page timeline with a nested intro timeline
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Page timeline with a nested intro timeline",
  summary: "A site intro is its own timeline added into the page timeline. Add a badge to the intro and the page timeline grows to fit, because changes to the child update the parent.",
  section: 'Timeline sequences',
  tags: ['add', 'remove', 'nested timeline', 'autoplay', 'duration'],
  docs: ['pages/motion-dev/docs/timeline-sequences.md', 'pages/motion-dev/docs/animate.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
