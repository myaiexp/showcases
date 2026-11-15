// penrose example: Matrix entries read by index
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Matrix entries read by index',
  summary:
    'Entries of a matrix are read with two brackets, `M[0][0]`, so the trace of a matrix of unknowns is `M[0][0] + M[1][1]`. Here `M` is a 2 by 2 matrix of `?` and the layout requires the trace to equal 240, so two bars drawn from the diagonal entries always add up to the same length, while resampling changes how they split.',
  section: 'Style: Vectors & Matrices',
  tags: ['matrix', 'element access', 'trace', 'unknown', 'mat2x2'],
  docs: ['repo/packages/docs-site/docs/ref/style/vectors-matrices.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
