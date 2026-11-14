// vchart example: Mosaic: quick start
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Mosaic: quick start",
  summary:
    "A mosaic chart widens each column by its share of the total and stacks the groups to 100%, so both the share between regions and the mix inside each region are visible. percent: true, seriesField and labels filtered by group (filterByGroup) draw the percent-stacked layout.",
  section: "Flow and Relation",
  tags: ["mosaic", "percent", "seriesField", "label", "filterByGroup", "updateData"],
  docs: [
    "repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Mosaic.md",
    "repo/docs/assets/option/en/series/mosaic.md",
    "repo/docs/assets/option/en/chart/mosaic.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
