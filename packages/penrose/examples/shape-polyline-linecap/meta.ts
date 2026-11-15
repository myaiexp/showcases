// penrose example: Polyline strokeLinecap
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Polyline strokeLinecap',
  summary:
    'A zigzag Polyline made of five points around an unknown offset, drawn with a wide stroke. `strokeLinecap` is `butt` (the default), `round` or `square`; only the two ends differ.',
  section: 'Shape: Polyline',
  tags: ['Polyline', 'strokeLinecap', 'points', 'strokeWidth'],
  docs: ['repo/packages/docs-site/docs/ref/style/shapes/polyline.md', 'repo/packages/core/src/shapes/Polyline.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
