// l7 example: Simple lines for big data
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Simple lines for big data",
  summary:
    "shape('simple') keeps size() out of it: lines are always 1px, which keeps hundreds of thousands of vertices cheap. This one draws about 1,500 vertices.",
  section: "Tutorial: Line",
  tags: ["shape","simple","size"],
  docs: ["repo/site/docs/tutorial/line/simple.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
