// vchart example: Correlation: quick start
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Correlation: quick start",
  summary:
    "A correlation chart places related terms around a centre point: valueField sets how far each node sits from the centre, sizeField the node size, and the centre carries a label. updateData re-ranks the terms every two seconds.",
  section: "Flow and Relation",
  tags: ["correlation", "categoryField", "valueField", "sizeField", "sizeRange", "centerLabel"],
  docs: [
    "repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Correlation.md",
    "repo/docs/assets/option/en/series/correlation.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
