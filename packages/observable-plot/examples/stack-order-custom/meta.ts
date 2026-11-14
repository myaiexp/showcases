// observable-plot example: Stack: order by array, field or function
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Stack: order by array, field or function',
  summary:
    'The stack order given three other ways: an explicit array of z values from d3.groupSort, a named data field, or a function of the data.',
  section: 'Transform: Stack',
  tags: ['areaY', 'stackY', 'order'],
  docs: ['repo/docs/transforms/stack.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
