// Papa Parse example: FieldMismatch errors for rows with too few or too many fields
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Rows with too few or too many fields',
  summary:
    'When a row does not have as many values as the header has columns, Papa still returns it and adds a FieldMismatch error: TooFewFields or TooManyFields, with the row number, so you can point the reader at the exact line.',
  section: 'Results',
  tags: ['FieldMismatch', 'TooFewFields', 'TooManyFields', 'errors', 'header'],
  docs: ['repo/docs/docs.html', 'repo/papaparse.js'],
  provenance: 'pure',
  added: '2026-11-14',
});
