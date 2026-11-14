// g6 example: Snake layout: cols, colGap, rowGap and nodeSize
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Snake layout: cols, colGap, rowGap and nodeSize",
  summary: "cols sets how many nodes a row holds, colGap and rowGap the spacing, and nodeSize the box used for each node. Four sliders change them on a 16-node chain.",
  section: 'Layout',
  tags: ["snake", "cols", "colGap", "rowGap", "nodeSize"],
  docs: [
    "repo/packages/site/docs/manual/layout/Snake.en.md",
    "repo/packages/site/common/api/layouts/snake.md",
    "repo/packages/site/docs/manual/layout/BaseLayout.en.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
