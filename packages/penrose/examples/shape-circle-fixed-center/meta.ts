// penrose example: Circle with a fixed centre
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Circle with a fixed centre',
  summary:
    'Every circle is given `center : (0, 0)`, so only the radii move. `Inside` chains the three sets and each ring must be 18 smaller than the next, which draws concentric circles whose radii the optimizer picks.',
  section: 'Shape: Circle',
  tags: ['Circle', 'center', 'r', 'ensure'],
  docs: ['repo/packages/docs-site/docs/ref/style/shapes/circle.md', 'repo/packages/core/src/shapes/Circle.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
