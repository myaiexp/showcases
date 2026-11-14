// g6 example: Snake layout: a chain folded into rows
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Snake layout: a chain folded into rows",
  summary: "The snake layout folds a chain of nodes into rows that alternate direction, like an S. A toggle flips clockwise and a slider changes the padding around the layout area.",
  section: 'Layout',
  tags: ["snake", "clockwise", "padding"],
  docs: [
    "repo/packages/site/docs/manual/layout/Snake.en.md",
    "repo/packages/site/common/api/layouts/snake.md",
    "repo/packages/site/docs/manual/layout/BaseLayout.en.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
