// penrose example: Minimize (x - 5)² with problem()
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Minimize (x - 5)² with problem()',
  summary:
    'The Optimization API\'s own example: a `variable(10)`, a `problem` that wants `(x - 5)²` driven down, and `start().run()`. The ball walks along the curve toward 5 a couple of iterations at a time. The docs pass the expression as a constraint; the toggle (and the card, every other pass) hands it over as the objective instead.',
  section: 'Optimization API',
  tags: ['variable', 'problem', 'start', 'run', 'until', 'converged', 'vals'],
  docs: [
    'repo/packages/docs-site/docs/ref/optimization-api.md',
    'repo/packages/docs-site/docs/ref/constraints.md',
    'repo/packages/core/src/api.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
