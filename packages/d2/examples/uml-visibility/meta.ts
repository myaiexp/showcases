// d2 example: UML visibility prefixes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'UML visibility prefixes',
  summary:
    'A prefix on a key marks visibility, shown as a symbol next to the member. The `#` must be written `\\#` so the line is not read as a comment. A connection from a quoted string key ties it to the class.',
  section: 'UML Classes',
  tags: ['class', 'visibility'],
  docs: ['repo/docs/tour/uml-classes.md', 'repo/static/d2/classes-2.d2'],
  provenance: 'pure',
  added: '2026-11-15',
});
