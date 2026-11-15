// penrose example: Constructors build new objects
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Constructors build new objects',
  summary:
    '`constructor Segment(Point p, Point q)` omits its output type because the constructor has the output type\'s name. Substance uses `Let s := Segment(A, B)` for it, and Style draws every point and every segment.',
  section: 'Domain',
  tags: ['constructor', 'Let', ':=', 'Line'],
  docs: [
    'repo/packages/docs-site/docs/ref/domain/functions.md',
    'repo/packages/docs-site/docs/ref/substance/statements.md',
    'repo/packages/core/src/lib/Functions.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
