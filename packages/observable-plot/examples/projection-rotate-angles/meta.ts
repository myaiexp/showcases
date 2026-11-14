// observable-plot example: Projection: three-angle rotate
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Projection: three-angle rotate',
  summary:
    'The rotate option takes lambda, phi and an optional gamma; three sliders move an orthographic globe through all three Euler angles.',
  section: 'Projections',
  tags: ['projection', 'rotate', 'orthographic', 'graticule'],
  docs: ['repo/docs/features/projections.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
