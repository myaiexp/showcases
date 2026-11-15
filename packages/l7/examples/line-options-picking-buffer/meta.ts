// l7 example: Layer option pickingBuffer
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Layer option pickingBuffer",
  summary:
    "pickingBuffer widens the area that counts as a hit, so thin lines are easier to hover. Move over a 1px line: with the buffer at 0 it is hard to catch, with 10 it is easy.",
  section: "Line Layer",
  tags: ["options","pickingBuffer","active"],
  docs: ["repo/site/docs/api/line_layer/options.en.md","repo/site/docs/api/common/layer/options.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
