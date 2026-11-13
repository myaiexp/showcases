// Pretext example: rich-inline lines of varying width around a float
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Rich text around a float',
  summary:
    'layoutNextRichInlineLineRange() takes a width for each line, so lines beside a floated block can be narrower than the ones below it. Each range is materialized and painted at its own offset, and its end cursor starts the next line.',
  section: 'Rich inline',
  tags: ['layoutNextRichInlineLineRange', 'float', 'variable width', 'materializeRichInlineLineRange'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
