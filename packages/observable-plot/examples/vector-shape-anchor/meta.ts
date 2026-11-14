// observable-plot example: Vector: shape and anchor
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Vector: shape and anchor',
  summary:
    'The same grid of points drawn with each vector shape (arrow, spike, or a custom object with a draw method) and each anchor: start grows from the point, end lands on it, middle straddles it. Rotation is clockwise from noon.',
  section: 'Mark: Vector',
  tags: ['vector', 'shape', 'anchor', 'rotate', 'length', 'r'],
  docs: ['repo/docs/marks/vector.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
