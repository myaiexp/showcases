// vega example: Expressions: luminance and contrast
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Expressions: luminance and contrast",
  summary:
    "Eight hcl swatches whose label colour is chosen by comparing contrast() against light and dark text, graded AA or AAA, with each swatch's luminance; a lightness slider shows where the choice flips.",
  section: 'Expressions',
  tags: ["expression.luminance","expression.contrast","expression.hcl"],
  docs: ["repo/docs/docs/expressions.md","repo/docs/docs/transforms/sequence.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
