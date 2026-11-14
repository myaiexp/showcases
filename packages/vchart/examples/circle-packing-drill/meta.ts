// vchart example: Circle packing: drill down
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Circle packing: drill down",
  summary:
    "With drill: true a click on a circle zooms into it so its children fill the chart; the drill event reports the path and drillDown and drillUp do the same from code. The card steps through countries and regions on its own.",
  section: "Hierarchy",
  tags: ["drill", "drillField", "drill event", "drillDown", "drillUp"],
  docs: [
    "repo/docs/assets/guide/en/tutorial_docs/Chart_Types/CirclePacking.md",
    "repo/docs/assets/option/en/series/circle-packing.md",
    "repo/docs/assets/option/en/common/drill.md",
    "repo/docs/assets/api/en/API/event.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
