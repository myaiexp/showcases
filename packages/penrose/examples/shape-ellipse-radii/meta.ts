// penrose example: Ellipse rx and ry
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Ellipse rx and ry',
  summary:
    'An Ellipse has two radii, `rx` across and `ry` up. They are left free here with bounds, and `encourage t.icon.rx == 3 * t.icon.ry` stretches every ellipse to roughly three times as wide as tall.',
  section: 'Shape: Ellipse',
  tags: ['Ellipse', 'rx', 'ry', 'encourage'],
  docs: [
    'repo/packages/docs-site/docs/ref/style/shapes/ellipse.md',
    'repo/packages/core/src/shapes/Ellipse.ts',
    'repo/packages/core/src/lib/Functions.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
