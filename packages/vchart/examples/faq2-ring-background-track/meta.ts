// vchart example: FAQ: background track under a ring with gaps
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "FAQ: background track under a ring with gaps",
  summary:
    "A common chart with two pie series: the first holds one full-circle datum as a faint track, the second is the ring with padAngle and rounded corners. Same radii, later series on top, no animation on the track.",
  section: 'FAQ',
  tags: ['common','pie','padAngle','innerRadius','cornerRadius'],
  docs: [
    'repo/docs/assets/faq/en/116-How to add background color to the bottom of ring chart when it is set with gaps.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
