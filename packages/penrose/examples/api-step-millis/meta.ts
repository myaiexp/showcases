// penrose example: step until a timer fires
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'step until a timer fires',
  summary:
    'The docs\' `stepMillis` wraps `step(state, { until })`, which keeps optimizing until `until` returns true. Each animation frame gets a few milliseconds of optimizing, so the circles visibly settle into place; the slider sets the budget. The docs time it with a setTimeout flag, which cannot fire while the synchronous step runs, so this version reads a deadline instead.',
  section: 'Language API',
  tags: ['step', 'until', 'PenroseState', 'nextStage', 'isOptimized'],
  docs: [
    'repo/packages/docs-site/docs/ref/api.md',
    'repo/packages/core/src/index.ts',
    'repo/packages/docs-site/docs/ref/bundle.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
