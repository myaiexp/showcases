// l7 example: Point style: opacity from data
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Point style: opacity from data",
  summary:
    "Some style options take { field, value } instead of a constant, the same mapping as color() and size(). Here the value field spreads opacity from 0.1 to 1.",
  section: "Point Layer",
  tags: ['PointLayer', 'style', 'opacity', 'field mapping'],
  docs: ['repo/site/docs/api/point_layer/style.en.md', 'repo/site/docs/api/common/layer/style_encode.en.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
