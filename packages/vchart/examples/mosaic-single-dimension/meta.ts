// vchart example: Mosaic: without a group field
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Mosaic: without a group field",
  summary:
    "Without seriesField a mosaic chart is a bar chart whose widths are proportional: each column's width is its share of the total, labelled with the category on the bottom and the value on top. The data is five days of sales.",
  section: "Flow and Relation",
  tags: ["mosaic", "xField", "yField", "label", "position", "formatMethod", "axes"],
  docs: [
    "repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Mosaic.md",
    "repo/docs/assets/option/en/series/mosaic.md",
    "repo/docs/assets/option/en/chart/mosaic.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
