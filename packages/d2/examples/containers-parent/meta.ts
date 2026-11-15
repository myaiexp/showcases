// d2 example: Referencing the parent with underscore
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Referencing the parent with underscore',
  summary:
    'Inside `birthdays`, the key `_.christmas.presents` climbs one level up to reach a sibling container, so a connection and a style can reach outside the braces. A plain `presents` there still means the one in `birthdays`.',
  section: 'Containers',
  tags: ['container', 'underscore', 'parent'],
  docs: ['repo/docs/tour/containers.md', 'repo/static/d2/containers-underscore.d2'],
  provenance: 'pure',
  added: '2026-11-15',
});
