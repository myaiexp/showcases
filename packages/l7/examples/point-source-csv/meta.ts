// l7 example: Source: CSV text
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Source: CSV text",
  summary:
    "A CSV string is parsed with { type: 'csv', x, y }, naming the longitude and latitude columns. The text here is made in code, standing in for the file the docs fetch.",
  section: "Point Layer",
  tags: ['PointLayer', 'source', 'parser', 'csv'],
  docs: ['repo/site/docs/api/point_layer/source.en.md', 'repo/site/docs/api/common/layer/source.en.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
