// l7 example: Source: JSON rows
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Source: JSON rows",
  summary:
    "A JSON array of rows needs a parser that names the longitude and latitude fields: { type: 'json', x, y }. Every other field stays available to color(), size() and shape().",
  section: "Point Layer",
  tags: ['PointLayer', 'source', 'parser', 'json'],
  docs: ['repo/site/docs/api/point_layer/source.en.md', 'repo/site/docs/api/common/layer/source.en.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
