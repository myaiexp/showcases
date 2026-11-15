// css-doodle example: Interpolating a size across the cells
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Interpolating a size across the cells',
  summary:
    '@Ii(*100%) maps the ratio onto a size in percent, with larger cells first, while @iI fades them in. Multiplying the ratio interpolates from 0 to the given value.',
  section: 'Cell functions',
  tags: ['@iI', '@Ii', '@size', '@place'],
  docs: [
    'pages/css-doodle-com/reference/function-ii.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
