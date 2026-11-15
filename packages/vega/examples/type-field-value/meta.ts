// vega example: Type: FieldValue datum, group, parent
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Type: FieldValue datum, group, parent',
  summary:
    'Nested groups whose leaf bars read the plain datum, the group item, the parent datum, an indirect parent field named by the datum, and a grandparent via level.',
  section: 'Types',
  tags: ['types.FieldValue', 'field.parent', 'field.group', 'field.level'],
  docs: ['repo/docs/docs/types.md', 'repo/docs/docs/marks.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
