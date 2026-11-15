// l7 example: scale quantile: equal-count classes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "scale quantile: equal-count classes",
  summary:
    "type 'quantile' puts the same number of lines into each class, however the values are spread.",
  section: "Line Layer",
  tags: ["scale","IScaleConfig","quantile"],
  docs: ["repo/site/docs/api/line_layer/scale.en.md","repo/site/docs/api/common/layer/scale.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
