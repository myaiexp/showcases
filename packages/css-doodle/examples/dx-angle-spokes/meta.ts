// css-doodle example: Pointing at the center with @da
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Pointing at the center with @da',
  summary:
    'Every cell is a 2px line rotated by @da(*1rad), its own angle from the center, so all of them point at the middle. The cells within one cell of the center are replaced by dots with @cell(dr < 1).',
  section: 'Cell functions',
  tags: ['@da', '@dr', '@cell', 'rotate'],
  docs: [
    'pages/css-doodle-com/reference/function-dx.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
