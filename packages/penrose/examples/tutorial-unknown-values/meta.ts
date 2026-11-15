// penrose example: Fixed numbers or ? for the optimizer
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Fixed numbers or ? for the optimizer',
  summary:
    'A vector end point is either a concrete pair, such as `(120, 60)`, or `(?, ?)`, which the optimizer picks. The first tab fixes both vectors, so the picture never changes; the second leaves them open, so each resample draws other arrows.',
  section: 'Tutorial: Functions',
  tags: ['?', 'Line', 'vector', 'canvas'],
  docs: ['repo/packages/docs-site/docs/tutorial/functions.md', 'repo/packages/core/src/lib/Functions.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
