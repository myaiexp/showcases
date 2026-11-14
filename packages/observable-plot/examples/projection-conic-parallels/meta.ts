// observable-plot example: Projection: conic standard parallels
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Projection: conic standard parallels',
  summary:
    'A conic equal-area projection with the parallels option: two sliders move the standard parallels and the shape of the United States changes.',
  section: 'Projections',
  tags: ['projection', 'parallels', 'conic-equal-area', 'rotate', 'domain'],
  docs: ['repo/docs/features/projections.md', 'repo/docs/data/us-counties-10m.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
