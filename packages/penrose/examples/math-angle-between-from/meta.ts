// penrose example: angleBetween and angleFrom
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'angleBetween and angleFrom',
  summary:
    'Two sampled vectors `u` and `v` leave the origin. `angleBetween` is always between 0 and pi, so its blue arc always sweeps counterclockwise from `u`; `angleFrom` is signed, so the red arc turns from `u` towards `v` the short way, clockwise or counterclockwise as needed.',
  section: 'Computation: Math',
  tags: ['angleBetween', 'angleFrom', 'circularArc', 'angleOf'],
  docs: ['repo/packages/docs-site/docs/ref/style/functions.md', 'repo/packages/core/src/lib/Functions.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
