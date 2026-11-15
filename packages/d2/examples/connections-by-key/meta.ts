// d2 example: Connections use keys, not labels
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Connections use keys, not labels',
  summary:
    'With `be: Backend`, the key is `be` and `Backend` is only the label. Writing `Backend -> Frontend` creates two new shapes named after those labels, whereas `be -> fe` connects the declared ones.',
  section: 'Connections',
  tags: ['connection', 'key', 'label'],
  docs: ['repo/docs/tour/connections.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
