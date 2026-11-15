// penrose example: asinh, acosh and atanh as the mirror images
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'asinh, acosh and atanh as the mirror images',
  summary:
    'Three inverse curves, `asinh`, `acosh` and `atanh`, drawn over their natural domains (`acosh` starts at 1, `atanh` only lives between -1 and 1 and climbs steeply at its edges). A sampled vertical scale makes each variation stretch them differently.',
  section: 'Computation: Math',
  tags: ['asinh', 'acosh', 'atanh'],
  docs: ['repo/packages/docs-site/docs/ref/style/functions.md', 'repo/packages/core/src/lib/Functions.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
