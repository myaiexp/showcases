// penrose example: A constraint is an energy: f(x) - c <= 0
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A constraint is an energy: f(x) - c <= 0',
  summary:
    'To ask for f(x) <= c, write the energy f(x) - c: positive while the constraint is violated, zero or negative once it holds. Here f is a circle\'s radius and c = 60. The objective pulls the radius toward 100, the constraint holds it at the limit, and the readout shows the energy changing sign.',
  section: 'Writing Constraints & Objectives',
  tags: ['sub', 'constraints', 'problem', 'zero-based inequality', 'lessThan'],
  docs: [
    'repo/packages/docs-site/docs/ref/constraints.md',
    'repo/packages/docs-site/docs/ref/optimization-api.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
