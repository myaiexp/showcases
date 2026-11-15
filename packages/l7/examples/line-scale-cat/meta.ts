// l7 example: scale cat: names to colours
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "scale cat: names to colours",
  summary:
    "scale('type', { type: 'cat' }) treats the field as categories, so each distinct value gets the next colour of color('type', [...]).",
  section: "Line Layer",
  tags: ["scale","IScaleConfig","cat"],
  docs: ["repo/site/docs/api/line_layer/scale.en.md","repo/site/docs/api/common/layer/scale.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
