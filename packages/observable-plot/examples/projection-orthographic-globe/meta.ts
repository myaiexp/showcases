// observable-plot example: Projection: rotating globe
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Projection: rotating globe',
  summary:
    'An orthographic projection draws land, the sphere outline and store dots; the rotate option turns the globe. The docs plot a live earthquake feed here, so this one plots Walmart openings instead.',
  section: 'Projections',
  tags: ['projection', 'orthographic', 'rotate', 'geo', 'sphere', 'dot'],
  docs: ['repo/docs/features/projections.md', 'repo/docs/data/walmarts.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
