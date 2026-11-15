// d2 example: The four connection arrows
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'The four connection arrows',
  summary:
    'Four spellings are valid: `--` joins two shapes with no arrowhead, `->` points at the second, `<-` at the first and `<->` at both. Shape keys can contain spaces, so `Write Replica Canada` is one shape.',
  section: 'Connections',
  tags: ['connection', 'arrow'],
  docs: ['repo/docs/tour/connections.md', 'repo/static/d2/connections-1.d2'],
  provenance: 'pure',
  added: '2026-11-15',
});
