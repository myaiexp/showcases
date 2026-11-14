// vchart example: Sunburst: drill down
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Sunburst: drill down",
  summary:
    "drill: true zooms into a clicked ring segment and shows only its subtree; clicking the centre drills back up. A drill event reports the path, and the card drills through the tree from code with drillDown and drillUp.",
  section: "Hierarchy",
  tags: ["drill", "drillField", "drill event", "drillDown", "drillUp"],
  docs: [
    "repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Sunburst.md",
    "repo/docs/assets/option/en/series/sunburst.md",
    "repo/docs/assets/option/en/common/drill.md",
    "repo/docs/assets/api/en/API/event.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
