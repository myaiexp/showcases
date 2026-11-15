// penrose example: TeXify: whole-word subscripts
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'TeXify: whole-word subscripts',
  summary:
    'In TeX, `p_start` makes only the first letter a subscript and sets the rest at full size. `TeXify("p_start")` rewrites the name as `{p}_{start}`, so the whole word becomes the subscript. The top row is the raw string, the bottom row the TeXified one, for three names.',
  section: 'Computation: Colors & Sampling',
  tags: ['TeXify', 'Equation'],
  docs: ['repo/packages/docs-site/docs/ref/style/functions.md', 'repo/packages/core/src/lib/Functions.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
