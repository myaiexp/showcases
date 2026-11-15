// pattern, clipPath, mask and marker blocks in values
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "SVG: patterns, clip paths and masks as values",
  summary: "The block-value syntax is not only for gradients: patterns, filters, clip paths, masks, markers and symbols written as an attribute value go into <defs> with a generated id. Each variant uses another kind on the same shape.",
  section: "SVG",
  tags: ["@svg","pattern","clipPath","mask","marker"],
  docs: ["pages/css-doodle-com/reference/function-svg.md","repo/docs/languages.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
