// Papa Parse example: messy CSV parsed under switchable options
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Edge cases & config',
  summary:
    'Quoted commas, an embedded newline and a semicolon delimiter. Flip the options to see how Papa Parse responds, including delimiter auto-detection.',
  section: 'Basics',
  tags: ['delimiter', 'quotes', 'skipEmptyLines', 'JSON'],
  docs: [],
  provenance: 'legacy',
  added: '2026-06-14',
});
