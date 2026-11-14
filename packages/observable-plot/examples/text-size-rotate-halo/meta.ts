// observable-plot example: Text: fontSize, rotate and halo
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Text: fontSize, rotate and halo',
  summary:
    'fontSize and rotate as data-driven channels on letters, and a halo made from fill, stroke and strokeWidth to keep labels readable over dots.',
  section: 'Mark: Text',
  tags: ['text', 'fontSize', 'rotate', 'paintOrder', 'stroke'],
  docs: ['repo/docs/marks/text.md', 'repo/docs/data/alphabet.ts', 'repo/docs/data/cars.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
