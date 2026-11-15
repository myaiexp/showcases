// l7 example: scale quantize: equal-size steps
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "scale quantize: equal-size steps",
  summary:
    "type 'quantize' cuts the value range into equal-sized steps, one colour per step.",
  section: "Line Layer",
  tags: ["scale","IScaleConfig","quantize"],
  docs: ["repo/site/docs/api/line_layer/scale.en.md","repo/site/docs/api/common/layer/scale.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
