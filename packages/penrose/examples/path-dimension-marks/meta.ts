// penrose example: unitMark and unitMark2: a dimension line
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'unitMark and unitMark2: a dimension line',
  summary:
    '`unitMark` takes a measured line and a second line giving the offset direction, and returns two points shifted away from it. `unitMark2` caps each of those points with a short crossbar. Together they draw an engineering-style dimension line beside a sampled segment.',
  section: 'Computation: Paths & Curves',
  tags: ['unitMark', 'unitMark2', 'rot90', 'Line'],
  docs: ['repo/packages/docs-site/docs/ref/style/functions.md', 'repo/packages/core/src/lib/Functions.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
