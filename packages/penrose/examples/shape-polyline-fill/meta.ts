// penrose example: Polyline fill
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Polyline fill',
  summary:
    'A Polyline has no fill by default, but `fillColor` paints the area as if the last point were joined to the first, while the stroke stays open. The tabs compare no fill, a fill, and a fill with a dashed stroke.',
  section: 'Shape: Polyline',
  tags: ['Polyline', 'fillColor', 'strokeDasharray', 'points'],
  docs: [
    'repo/packages/docs-site/docs/ref/style/shapes/polyline.md',
    'repo/packages/core/src/shapes/Polyline.ts',
    'repo/packages/core/src/lib/Functions.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
