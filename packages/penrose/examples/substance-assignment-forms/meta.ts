// penrose example: Applying functions three ways
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Applying functions three ways',
  summary:
    'A function result can be assigned after declaring the object (`u := addV(v, w)`), declared and assigned in one line (`Vector u := addV(v, w)`), or both through a constructor with `Let`. The tabs show the first two; the diagram is the same sum vector each time.',
  section: 'Substance',
  tags: ['function', ':=', 'declaration', 'override'],
  docs: [
    'repo/packages/docs-site/docs/ref/substance/statements.md',
    'repo/packages/docs-site/docs/tutorial/functions.md',
    'repo/packages/core/src/lib/Functions.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
