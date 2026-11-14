// vchart example: Funnel label limit and transformLabel
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Funnel label limit and transformLabel",
  summary: "label.limit caps the width of a layer's text, truncating long stage names with an ellipsis, with the special value 'shapeSize' fitting the text to the layer; transformLabel has its own limit for the conversion ratios. A select and a slider change the limits.",
  section: "Option: Series",
  tags: ["funnel.label.limit","transformLabel.limit","shapeSize","isTransform"],
  docs: [
    'repo/docs/assets/option/en/series/funnel.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
