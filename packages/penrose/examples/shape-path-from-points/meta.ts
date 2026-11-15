// penrose example: Path from pathFromPoints
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Path from pathFromPoints',
  summary:
    '`pathFromPoints("open", pts)` joins points with straight segments and leaves the end loose; `"closed"` draws the last segment back to the first, which a `fillColor` can then fill. The points are offsets from two unknowns, so the shape drifts into place.',
  section: 'Shape: Path',
  tags: ['Path', 'd', 'pathFromPoints', 'fillColor'],
  docs: ['repo/packages/docs-site/docs/ref/style/shapes/path.md', 'repo/packages/core/src/shapes/Path.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
