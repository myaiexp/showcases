// l7 example: Text style: stroke
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Text style: stroke",
  summary:
    "stroke colors the text's outline and strokeWidth sets how thick it is (0 means none), which keeps labels legible over busy ground.",
  section: "Point Layer",
  tags: ['PointLayer', 'text', 'style', 'stroke', 'strokeWidth', 'strokeOpacity'],
  docs: ['repo/site/docs/api/point_layer/style.en.md', 'repo/site/docs/api/point_layer/shape.en.md', 'repo/site/docs/api/common/layer/layer_update.en.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
