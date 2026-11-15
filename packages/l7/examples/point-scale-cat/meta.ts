// l7 example: Scale: cat for categories
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Scale: cat for categories",
  summary:
    "The cat scale treats a field as an enumeration, so each crop (corn, rice, soybean) takes its own color from the list. The field here is text, which color() would otherwise have to guess at.",
  section: "Point Layer",
  tags: ['PointLayer', 'scale', 'cat', 'color'],
  docs: ['repo/site/docs/api/point_layer/scale.en.md', 'repo/site/docs/api/common/layer/scale.en.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
