// penrose example: disjointPadding: a gap between circles
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'disjointPadding: a gap between circles',
  summary:
    'The second exercise solution adds `padding` to the energy: `r1 + r2 + padding - d`, so the circles keep that much space between them. The padding is a frozen variable, so every pass of the loop (or the slider) holds the circles a different distance apart while the objective pulls them together.',
  section: 'Writing Constraints & Objectives',
  tags: ['disjointPadding', 'freeze', 'vals', 'sub', 'add', 'constraints'],
  docs: [
    'repo/packages/docs-site/docs/ref/constraints.md',
    'repo/packages/docs-site/docs/ref/optimization-api.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
