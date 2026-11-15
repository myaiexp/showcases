// l7 example: Point size: column width, length and height
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Point size: column width, length and height",
  summary:
    "For columns size takes an array: [w, h] is a square footprint of width w and height h, [w, l, h] sets width and length apart. Pick a form; the constant array applies to every column.",
  section: "Point Layer",
  tags: ['PointLayer', 'size', 'IPointSize', 'squareColumn', 'column'],
  docs: ['repo/site/docs/api/point_layer/size.en.md', 'repo/site/docs/api/point_layer/shape.en.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
