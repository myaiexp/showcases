// vchart example: Sequence: bars above the events
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Sequence: bars above the events",
  summary:
    "Bar series join the dot and link series in one sequence chart: each bar row counts events per five-minute bucket (xField, x2Field and yField give the interval and the value) and shares the time axis with the event rows below. A dataZoom bound to all regions zooms every row at once.",
  section: "Flow and Relation",
  tags: ["sequence", "bar", "x2Field", "barTitle", "dataZoom", "regionIndex", "xAxisIndex"],
  docs: [
    "repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Sequence.md",
    "repo/docs/assets/option/en/chart/sequence.md",
    "repo/docs/assets/option/en/series/dot.md",
    "repo/docs/assets/option/en/series/link.md",
    "repo/docs/assets/option/en/series/bar.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
