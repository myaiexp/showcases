// l7 example: animate: switch it on and off
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "animate: switch it on and off",
  summary:
    "animate(true) runs a trail along the line direction with default values; animate(false) stops it. The same call also takes an object.",
  section: "Line Layer",
  tags: ["animate","enable","IAnimateOption"],
  docs: ["repo/site/docs/api/line_layer/animate.en.md","repo/site/docs/api/common/features/animate.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
