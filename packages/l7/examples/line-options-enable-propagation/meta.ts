// l7 example: Layer option enablePropagation
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Layer option enablePropagation",
  summary:
    "Mouse events normally reach only the top layer. With enablePropagation: true on it, events pass through to the layer beneath too: hover where the lines cross to see both report.",
  section: "Line Layer",
  tags: ["options","enablePropagation","mouseenter"],
  docs: ["repo/site/docs/api/line_layer/options.en.md","repo/site/docs/api/common/layer/options.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
