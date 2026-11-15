// d2 example: Overrides: null on a connection or attribute
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Overrides: null on a connection or attribute',
  summary:
    'A connection is deleted by nulling it by index, `(one -> two)[0]: null`, and a style attribute is reset by nulling it, here `one.style.stroke: null`, which leaves the pink fill and drops the green stroke.',
  section: 'Overrides',
  tags: ['overrides', 'null', 'connection', 'style'],
  docs: ['repo/docs/tour/overrides.md', 'repo/static/d2/null-connection.d2', 'repo/static/d2/null-attribute.d2'],
  provenance: 'pure',
  added: '2026-11-15',
});
