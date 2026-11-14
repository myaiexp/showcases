// Chart.js example: Bubbles that grow on hover
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Bubbles that grow on hover",
  summary:
    "hoverRadius makes a bubble bigger while it is hovered and hitRadius widens the area that counts as touching it, so small bubbles are easier to hit.",
  section: 'Chart types',
  tags: ['hoverRadius','hitRadius','bubble','hover'],
  docs: ['repo/docs/charts/bubble.md', 'repo/docs/configuration/tooltip.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
