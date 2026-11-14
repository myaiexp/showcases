// observable-plot example: Projection: inset, insetLeft and insetBottom
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Projection: inset, insetLeft and insetBottom',
  summary:
    'The projection inset options pad the domain inside the frame; insetLeft and insetBottom override inset on their own side.',
  section: 'Projections',
  tags: ['projection', 'inset', 'insetLeft', 'insetBottom', 'domain'],
  docs: ['repo/docs/features/projections.md', 'repo/docs/data/us-counties-10m.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
