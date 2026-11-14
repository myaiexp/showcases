// Spark example: reflectVec, cross, dot and normalize folding space in a modifier
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Folding space with reflectVec',
  summary:
    'Splats that fall behind a mirror plane are replaced by their reflection, using dyno.dot to test the side, dyno.reflectVec to mirror the position and dyno.select to choose. The second plane comes from dyno.cross of the first normal with the Y axis, so two folds make a four-way kaleidoscope of the knot as the mirror turns.',
  section: 'Dyno Standard Library',
  tags: ['reflectVec', 'cross', 'dot', 'normalize', 'select', 'lessThan', 'dynoVec3'],
  docs: ['repo/docs/docs/dyno-stdlib.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
