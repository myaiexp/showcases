// penrose example: stepTimes: a fixed number of steps
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'stepTimes: a fixed number of steps',
  summary:
    '`stepTimes(state, n)` runs the optimizer for n steps and returns the new state. Starting each time from the compiled state, 0, 1, 2, 4 … 256 steps show the circles growing and nesting until `isOptimized` turns true.',
  section: 'Language API',
  tags: ['stepTimes', 'isOptimized', 'compile'],
  docs: [
    'repo/packages/docs-site/docs/ref/api.md',
    'repo/packages/core/src/index.ts',
    'repo/packages/docs-site/docs/ref/bundle.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
