// vchart example: Treemap: drill down
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Treemap: drill down",
  summary:
    "drill: true makes a click on a parent rectangle zoom into its children and a click on the focused rectangle (or empty space) drill back up; a 'drill' event reports the path. The card drills through the tree from code with the series' drillDown and drillUp.",
  section: "Hierarchy",
  tags: ["drill", "drillField", "drill event", "drillDown", "drillUp"],
  docs: [
    "repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Treemap.md",
    "repo/docs/assets/option/en/series/treemap.md",
    "repo/docs/assets/option/en/common/drill.md",
    "repo/docs/assets/api/en/API/event.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
