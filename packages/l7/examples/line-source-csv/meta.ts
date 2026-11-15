// l7 example: source: CSV text with a parser
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "source: CSV text with a parser",
  summary:
    "Text data is parsed with type 'csv': x/y name the start columns and x1/y1 the end columns. The CSV here is built in code, with the docs' from,to,... header.",
  section: "Line Layer",
  tags: ["source","parser","csv"],
  docs: ["repo/site/docs/api/line_layer/source.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
