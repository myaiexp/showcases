// vchart example: Sunburst: startAngle and endAngle
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Sunburst: startAngle and endAngle",
  summary:
    "startAngle and endAngle (degrees, default -90 to 270) crop the sunburst to a fan, a half circle or any slice. Sliders move both ends; the card sweeps through a few ranges.",
  section: "Hierarchy",
  tags: ["startAngle", "endAngle"],
  docs: [
    "repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Sunburst.md",
    "repo/docs/assets/option/en/series/sunburst.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
