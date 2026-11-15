// l7 example: source: JSON rows with a parser
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "source: JSON rows with a parser",
  summary:
    "JSON rows carry start and end in separate fields, so parser names them: x/y is the start and x1/y1 the end. The slider swaps in more rows with setData.",
  section: "Line Layer",
  tags: ["source","parser","json","x1","y1","setData"],
  docs: ["repo/site/docs/api/line_layer/source.en.md","repo/site/docs/api/common/layer/source.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
