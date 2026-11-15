// penrose example: Path arrowheads on a curve
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Path arrowheads on a curve',
  summary:
    'A `Path` takes the same arrowhead properties as a Line, so a curve built with `interpolateQuadraticFromPoints` can end in an arrow. The tabs switch the end only, both ends, and an enlarged loop head.',
  section: 'Shape: Path',
  tags: ['Path', 'startArrowhead', 'endArrowhead', 'interpolateQuadraticFromPoints'],
  docs: ['repo/packages/docs-site/docs/ref/style/shapes/path.md', 'repo/packages/core/src/shapes/Path.ts', 'repo/packages/docs-site/docs/ref/style/shapes/line.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
