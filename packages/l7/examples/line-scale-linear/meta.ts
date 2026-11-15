// l7 example: scale linear: values to a gradient
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "scale linear: values to a gradient",
  summary:
    "scale('count', { type: 'linear', domain: [10, 60] }) maps the field linearly onto the colour range; values outside the domain are held at its ends.",
  section: "Line Layer",
  tags: ["scale","IScaleConfig","linear"],
  docs: ["repo/site/docs/api/line_layer/scale.en.md","repo/site/docs/api/common/layer/scale.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
