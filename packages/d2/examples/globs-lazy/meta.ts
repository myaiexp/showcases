// d2 example: Globs: backwards and forwards
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Globs: backwards and forwards',
  summary:
    'A glob is evaluated against shapes that exist when it is written and again whenever a shape appears later. `* -> y` is written after `a`, then `b` and `c` appear, and all three connect to y.',
  section: 'Globs',
  tags: ['globs', 'connection'],
  docs: ['repo/docs/tour/globs.md', 'repo/static/d2/globs-lazy.d2'],
  provenance: 'pure',
  added: '2026-11-15',
});
