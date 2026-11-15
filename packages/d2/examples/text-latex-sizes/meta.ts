// d2 example: LaTeX size commands
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'LaTeX size commands',
  summary:
    'LaTeX blocks do not respect `font-size` styling. The size commands `\\tiny`, `\\small`, `\\normal`, `\\large` and `\\huge` are written in the formula itself.',
  section: 'Text & Code',
  tags: ['latex', 'size'],
  docs: ['repo/docs/tour/text.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
