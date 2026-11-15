// d2 example: Variables: single quotes bypass substitution
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Variables: single quotes bypass substitution',
  summary:
    'A single-quoted string is taken literally, so `\'${names}\'` stays as text while a double-quoted or unquoted `${names}` is replaced. The two connection labels show the difference.',
  section: 'Variables',
  tags: ['vars', 'quotes', 'escape'],
  docs: ['repo/docs/tour/vars.md', 'repo/static/d2/vars-escaped.d2'],
  provenance: 'pure',
  added: '2026-11-15',
});
