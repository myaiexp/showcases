// observable-plot example: Projection: line draws geodesics
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Projection: line draws geodesics',
  summary:
    'The line mark is projection-aware, so two cities joined by a line follow a great circle; switch projections to see the routes bend.',
  section: 'Projections',
  tags: ['projection', 'line', 'dot', 'text', 'geo'],
  docs: ['repo/docs/features/projections.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
