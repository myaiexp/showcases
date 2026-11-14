// vchart example: Mosaic: bandWidthField
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Mosaic: bandWidthField",
  summary:
    "bandWidthField maps column width to a field of its own instead of the share of the total, so width and height can encode two different measures. A select picks which field drives the width; sales is the stacked height throughout.",
  section: "Flow and Relation",
  tags: ["bandWidthField", "mosaic"],
  docs: [
    "repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Mosaic.md",
    "repo/docs/assets/option/en/series/mosaic.md",
    "repo/docs/assets/option/en/chart/mosaic.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
