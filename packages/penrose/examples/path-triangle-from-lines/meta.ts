// penrose example: triangle: a filled path from three Lines
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'triangle: a filled path from three Lines',
  summary:
    'Three `Line` edges whose start points are three sampled corners are passed to `triangle`, which returns one closed path through them. The path takes a fill the lines alone could not hold, drawn under the three edges.',
  section: 'Computation: Paths & Curves',
  tags: ['triangle', 'Path', 'Line'],
  docs: ['repo/packages/docs-site/docs/ref/style/functions.md', 'repo/packages/core/src/lib/Functions.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
