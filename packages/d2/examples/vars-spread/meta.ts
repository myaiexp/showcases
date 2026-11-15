// d2 example: Variables: spread substitutions
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Variables: spread substitutions',
  summary:
    '`...${x}` spreads the contents of a map or array variable into the place it is written. One array variable adds constraints to a table column, and one map variable gives a note a label, a child and a position.',
  section: 'Variables',
  tags: ['vars', 'spread', 'array', 'map'],
  docs: ['repo/docs/tour/vars.md', 'repo/static/d2/vars-spread.d2'],
  provenance: 'pure',
  added: '2026-11-15',
});
