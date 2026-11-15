// css-doodle example: Every needle points at the pointer
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Every needle points at the pointer',
  summary:
    'Each cell is a thin line rotated by atan2(@udy, @udx), the angle of its offset from the pointer, so the whole field of needles turns to follow it.',
  section: 'Cell functions',
  tags: ['@udx', '@udy', 'atan2', 'rotate', 'pointer'],
  docs: [
    'pages/css-doodle-com/reference/function-udx.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
