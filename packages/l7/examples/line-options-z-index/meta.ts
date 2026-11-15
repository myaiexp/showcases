// l7 example: Layer option zIndex: draw order
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Layer option zIndex: draw order",
  summary:
    "zIndex sets which layer is drawn on top: the larger value wins where two layers overlap. Flip the toggle to swap which of the two crossing line layers is on top.",
  section: "Line Layer",
  tags: ["options","zIndex"],
  docs: ["repo/site/docs/api/line_layer/options.en.md","repo/site/docs/api/common/layer/options.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
