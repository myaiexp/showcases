// aframe example: Best practices: reuse one object for setAttribute and emit
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Best practices: reuse one object for setAttribute and emit',
  summary:
    'A box spins by passing the same rotationTmp object to setAttribute every tick and emits an event with one reused detail object. The board confirms every event carried the identical object.',
  section: 'Introduction',
  tags: ['setAttribute', 'emit', 'tick', 'garbage collection', 'rotation'],
  docs: ['repo/docs/introduction/best-practices.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
