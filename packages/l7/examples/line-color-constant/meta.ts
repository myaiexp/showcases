// l7 example: color: one colour for the layer
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "color: one colour for the layer",
  summary:
    "color('#f00') paints every line the same. Any CSS colour string works: hex, rgb(), rgba() or a name. Pick a form from the list.",
  section: "Line Layer",
  tags: ["color","IColor"],
  docs: ["repo/site/docs/api/line_layer/color.en.md","repo/site/docs/api/common/layer/color.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
