// penrose example: cubicCurveFromPoints: first segment, then smooth joins
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'cubicCurveFromPoints: first segment, then smooth joins',
  summary:
    'The first four points of `cubicCurveFromPoints` are a start, two control points (red) and an end; after that each pair is one control point and an end, joined smoothly by reflecting the previous control. Two sampled heights bend the controls, and "closed" closes the shape and fills it.',
  section: 'Computation: Paths & Curves',
  tags: ['cubicCurveFromPoints', 'Path'],
  docs: ['repo/packages/docs-site/docs/ref/style/functions.md', 'repo/packages/core/src/lib/Functions.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
