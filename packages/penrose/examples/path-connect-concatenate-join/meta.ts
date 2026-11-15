// penrose example: connectPaths, concatenatePaths and joinPaths
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'connectPaths, concatenatePaths and joinPaths',
  summary:
    'Two paths (blue and red, dashed) become one black path. `connectPaths("open")` adds a line from the first path\'s end to the second\'s start, "closed" also closes back and fills, `concatenatePaths` keeps both as separate pieces, and `joinPaths` drops the second start and so draws on from the first end, which is only right when they already coincide.',
  section: 'Computation: Paths & Curves',
  tags: ['connectPaths', 'concatenatePaths', 'joinPaths', 'pathFromPoints'],
  docs: ['repo/packages/docs-site/docs/ref/style/functions.md', 'repo/packages/core/src/lib/Functions.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
