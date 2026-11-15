// penrose example: Maths functions place a sunflower
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Maths functions place a sunflower',
  summary:
    'Computation functions such as `sqrt`, `sin` and `cos` take numbers and return a number. Each of forty seeds sits at distance `sqrt(match_id)` from the origin and at angle `match_id * a`, which draws a sunflower head when `a` is the golden angle 2.39996 and visible spokes for the other two angles.',
  section: 'Style: Expressions',
  tags: ['computation functions', 'sqrt', 'sin', 'cos', 'match_id', 'hsva'],
  docs: ['repo/packages/docs-site/docs/ref/style/expressions.md', 'repo/packages/core/src/lib/Functions.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
