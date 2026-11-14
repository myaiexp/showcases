// vchart example: Correlation: startAngle and endAngle
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Correlation: startAngle and endAngle",
  summary:
    "startAngle and endAngle (default -90 to 270) limit the nodes to an arc of the ring, such as a half circle opening to one side. Sliders change both; the card steps through arcs.",
  section: "Flow and Relation",
  tags: ["startAngle", "endAngle"],
  docs: [
    "repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Correlation.md",
    "repo/docs/assets/option/en/series/correlation.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
