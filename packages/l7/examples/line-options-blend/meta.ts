// l7 example: Layer option blend
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Layer option blend",
  summary:
    "blend decides what happens where lines overlap: normal shows only the top colour, additive adds the colours, subtractive subtracts them, max keeps the largest rgb. Arcs default to additive.",
  section: "Line Layer",
  tags: ["options","blend","additive","subtractive","max"],
  docs: ["repo/site/docs/api/line_layer/options.en.md","repo/site/docs/api/common/layer/options.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
