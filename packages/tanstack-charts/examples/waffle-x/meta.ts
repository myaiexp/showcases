// tanstack-charts example: Waffle chart with waffleX
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Waffle chart with waffleX',
  summary:
    'waffleX transposes the contract: x holds the contribution and cells advance bottom to top, then left to right. rows fixes the number of cells in each column. Four row heights are compared as the select changes rows.',
  section: 'Waffle Marks',
  tags: ['waffleX', 'rows', 'unit'],
  docs: ['repo/docs/reference/marks/waffle.md', 'repo/docs/guides/legends-and-color.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
