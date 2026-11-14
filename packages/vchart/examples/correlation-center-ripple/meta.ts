// vchart example: Correlation: centre point, ripples and node style
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Correlation: centre point, ripples and node style",
  summary:
    "centerPoint styles the middle node, ripplePoint the water-ripple rings around it, and nodePoint plus its hover state the outer nodes; label.position puts the text around each node. The card changes the ripple and node colours.",
  section: "Flow and Relation",
  tags: ["centerPoint", "ripplePoint", "nodePoint", "centerLabel", "label", "position", "state"],
  docs: [
    "repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Correlation.md",
    "repo/docs/assets/option/en/series/correlation.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
