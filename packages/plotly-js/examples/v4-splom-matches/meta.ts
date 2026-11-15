// plotly-js example: v4: splom axes linked by default
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'v4: splom axes linked by default',
  summary:
    "A splom's cells share x ranges down each column and y ranges along each row (axis.matches is now true), so zooming one cell rescales its row and column.",
  section: "What's New in v4",
  tags: ['splom', 'axis.matches', 'relayout'],
  docs: ['repo/_posts/plotly_js/guides/whats-new-in-v4/2026-07-20-whats-new-in-v4.md', 'repo/iris-data.csv'],
  provenance: 'pure',
  added: '2026-11-15',
});
