// l7 example: Text style: textAnchor from data
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Text style: textAnchor from data",
  summary:
    "textAnchor can be data-mapped: each continent's cities take the next anchor in the list, so the labels fan out in different directions around their dots.",
  section: "Point Layer",
  tags: ['PointLayer', 'text', 'style', 'textAnchor', 'field mapping'],
  docs: ['repo/site/docs/api/point_layer/style.en.md', 'repo/site/docs/api/common/layer/style_encode.en.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
