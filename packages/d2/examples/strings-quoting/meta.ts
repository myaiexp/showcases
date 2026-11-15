// d2 example: Strings: unquoted and quoted
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Strings: unquoted and quoted',
  summary:
    'Most D2 text needs no quotes, and leading and trailing whitespace is trimmed. Characters the language itself uses (`$`, `#`, `&`) need single or double quotes; the second tab quotes them.',
  section: 'Strings',
  tags: ['strings', 'quotes'],
  docs: ['repo/docs/tour/strings.md', 'repo/static/d2/strings-2.d2'],
  provenance: 'pure',
  added: '2026-11-15',
});
