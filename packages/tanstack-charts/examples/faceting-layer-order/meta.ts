// tanstack-charts example: Layer order and occlusion
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Layer order and occlusion",
  summary:
    "Marks paint in array order: a zero rule, a low-to-high band, a median line, highlighted dots and text labels. The select moves the band from the first position to the last, and the same band then covers the line and dots instead of sitting behind them.",
  section: "Faceting and Composition",
  tags: ["areaY", "lineY", "dot", "text", "ruleY", "layering"],
  docs: ["repo/docs/guides/faceting-and-composition.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
