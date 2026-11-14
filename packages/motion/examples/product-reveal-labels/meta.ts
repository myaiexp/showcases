// motion example: Product launch reveal timed with labels
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Product launch reveal timed with labels",
  summary: "A product card reveals its name, price and badge together, all timed from one named point. Slide the label and all three move at once, because they start from the label (plus or minus an offset) instead of a clock time.",
  section: 'Timeline sequences',
  tags: ['sequence', 'label', 'at', 'label offset'],
  docs: ['pages/motion-dev/docs/timeline-sequences.md', 'pages/motion-dev/docs/animate.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
