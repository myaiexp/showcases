// Sortable.js example: sort: false on a menu next to a sortable order list
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Menu you can pick from but not rearrange',
  summary:
    'Pick dishes from a fixed menu into your order. The menu keeps its order whatever you do, while your order can be shuffled freely and keeps a running total.',
  section: 'Groups',
  tags: ['sort: false', 'group', 'pull: "clone"', 'option()'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
