// motion example: Menu that opens, then staggers its items in
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Menu that opens, then staggers its items in",
  summary: "A dropdown opens its panel, then each menu item slides in a moment after the one before. The open and close are a single timeline played forwards and back with playTo().",
  section: 'Timeline sequences',
  tags: ['sequence', 'stagger', 'delay', 'playTo', 'autoplay'],
  docs: ['pages/motion-dev/docs/timeline-sequences.md', 'pages/motion-dev/docs/animate.md', 'pages/motion-dev/docs/stagger.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
