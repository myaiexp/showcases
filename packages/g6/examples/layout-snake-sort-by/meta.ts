// g6 example: Snake layout: sortBy
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Snake layout: sortBy",
  summary: "Without sortBy the snake follows the path through the edges; sortBy takes a comparison function and orders the nodes directly. A toggle sorts the chain by descending id.",
  section: 'Layout',
  tags: ["snake", "sortBy"],
  docs: [
    "repo/packages/site/docs/manual/layout/Snake.en.md",
    "repo/packages/site/common/api/layouts/snake.md",
    "repo/packages/site/docs/manual/layout/BaseLayout.en.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
