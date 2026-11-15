// penrose example: interpolatingSpline and its tension
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'interpolatingSpline and its tension',
  summary:
    'A Catmull-Rom spline through six sampled points. Tension 0 is piecewise linear, 0.25 is the default, and larger values pull the curve into rounder, looser arcs that can overshoot; the last tab closes the curve back to the first point.',
  section: 'Computation: Paths & Curves',
  tags: ['interpolatingSpline', 'Path'],
  docs: ['repo/packages/docs-site/docs/ref/style/functions.md', 'repo/packages/core/src/lib/Functions.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
