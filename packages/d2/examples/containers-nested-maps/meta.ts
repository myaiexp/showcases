// d2 example: Nested maps
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Nested maps',
  summary:
    'Instead of repeating `clouds.aws.` on every key, a map `clouds: { ... }` holds its children. Connections inside the braces resolve their keys relative to that container, and the last line connects two sibling containers.',
  section: 'Containers',
  tags: ['container', 'map'],
  docs: ['repo/docs/tour/containers.md', 'repo/static/d2/containers-2.d2'],
  provenance: 'pure',
  added: '2026-11-15',
});
