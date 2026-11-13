// mermaid example: Gantt dependencies, critical path and milestones
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Gantt dependencies, critical path and milestones',
  summary:
    'Tasks chain with `after` and `until`, carry `done`, `active` and `crit` tags, and mark instants with milestones and vertical markers.',
  section: 'Gantt',
  tags: ['gantt', 'after', 'until', 'crit', 'milestone', 'vert'],
  docs: ['repo/packages/mermaid/src/docs/syntax/gantt.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
