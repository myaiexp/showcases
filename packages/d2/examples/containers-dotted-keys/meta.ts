// d2 example: Dotted keys declare containers
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Dotted keys declare containers',
  summary:
    'Writing `server.process` declares `process` inside `server`, creating the container if it is new. Connections can declare keys too, so `apartment.Bedroom.Bathroom -> office.Spare Room.Bathroom` builds both nested paths.',
  section: 'Containers',
  tags: ['container', 'key'],
  docs: ['repo/docs/tour/containers.md', 'repo/static/d2/containers-1.d2'],
  provenance: 'pure',
  added: '2026-11-15',
});
