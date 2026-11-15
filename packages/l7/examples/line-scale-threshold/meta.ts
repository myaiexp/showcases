// l7 example: scale threshold: manual breaks
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "scale threshold: manual breaks",
  summary:
    "type 'threshold' splits the domain at your own breaks: with domain [30, 70] the range needs three colours.",
  section: "Line Layer",
  tags: ["scale","IScaleConfig","threshold"],
  docs: ["repo/site/docs/api/line_layer/scale.en.md","repo/site/docs/api/common/layer/scale.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
