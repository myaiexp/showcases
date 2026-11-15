// penrose example: Three ways to call a constructor
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Three ways to call a constructor',
  summary:
    'The same segment built three ways: `s := Segment(A, B)` after a declaration, `Segment s := Segment(A, B)` in one statement, and `Let s := Segment(A, B)`. The three tabs draw the identical picture.',
  section: 'Domain',
  tags: ['constructor', 'Let', ':=', 'declaration'],
  docs: [
    'repo/packages/docs-site/docs/ref/domain/functions.md',
    'repo/packages/docs-site/docs/ref/substance/statements.md',
    'repo/packages/core/src/lib/Functions.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
