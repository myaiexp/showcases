// observable-plot example: Legends: inherited legend option
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Legends: inherited legend option',
  summary:
    'The top-level legend plot option applies to every scale that sets no legend of its own; a scale\'s own legend: false overrides it.',
  section: 'Legends',
  tags: ['legend', 'color', 'symbol', 'dot'],
  docs: ['repo/docs/features/legends.md', 'repo/docs/data/penguins.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
