// penrose example: Circle ensureOnCanvas
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Circle ensureOnCanvas',
  summary:
    'A circle of radius 60 is told to put its centre right of x = 170, 30 short of the canvas edge. With the default `ensureOnCanvas : true` the constraint pulls it back inside; with `ensureOnCanvas : false` it sits half outside and the canvas crops it.',
  section: 'Shape: Circle',
  tags: ['Circle', 'ensureOnCanvas', 'center'],
  docs: [
    'repo/packages/docs-site/docs/ref/style/shapes-overview.md',
    'repo/packages/docs-site/docs/ref/style/shapes/circle.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
