// l7 example: Text style: textAllowOverlap
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Text style: textAllowOverlap",
  summary:
    "By default colliding labels are hidden so the map stays readable. textAllowOverlap: true draws every label even where they pile up.",
  section: "Point Layer",
  tags: ['PointLayer', 'text', 'style', 'textAllowOverlap', 'collision'],
  docs: ['repo/site/docs/api/point_layer/style.en.md', 'repo/site/docs/api/point_layer/shape.en.md', 'repo/site/docs/api/common/layer/layer_update.en.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
