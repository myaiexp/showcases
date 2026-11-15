// css-doodle example: Shuffled picks with @pd
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Shuffled picks with @pd',
  summary:
    '@pd picks the arguments in a shuffled order, one per cell, and every value is used once before the order repeats. A new seed gives another shuffle.',
  section: 'Random',
  tags: ['@pd', 'seed'],
  docs: [
    'pages/css-doodle-com/reference/function-pd.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
