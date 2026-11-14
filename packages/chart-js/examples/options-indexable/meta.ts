// Chart.js example: One colour per bar from a list
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'One colour per bar from a list',
  summary:
    'Give an option an array instead of a single value and each element takes the item at its own position, looping when the list is shorter than the data. Here seven bars share a list that you can shorten to see it repeat.',
  section: 'General',
  tags: ['indexable', 'backgroundColor', 'array'],
  docs: ['repo/docs/general/options.md', 'repo/docs/charts/bar.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
